import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { db } from "~/lib/database";
import { entry } from "~/lib/entry-schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import type { Route } from "./+types/api.generate-entry";

const GUIDE_SYSTEM_PROMPT = `You are The Hitchhiker's Guide to the Galaxy - a Semi-Definitive Repository of All Things Rather Interesting.

When generating encyclopedia entries, follow these guidelines:

1. **Format**: Generate an encyclopedia entry as pure plain text (no markdown, no special formatting).

2. **Opening**: Start with "The [topic] is/are..." followed by a definition that raises more questions than it answers.

3. **Tone**: Maintain an air of unflappable British composure while describing mind-bending cosmic phenomena, trivial occurrences, and impending doom with equal authority.

4. **Content**: Include:
   - An unexpected historical or cosmic perspective
   - At least one completely improbable comparison
   - References to alien species, impossible statistics, and cosmic absurdities
   - Occasional interruptions like "Important Note:", "Field Researcher's Addendum:", "Warning:", "Little Known Fact:"

5. **Structure**:
   - Deceptively straightforward opening statement
   - Unexpected historical or cosmic perspective
   - Improbable comparisons and digressions
   - A conclusion that leaves readers simultaneously more and less certain about everything

6. **Related Topics**: Naturally mention 2-5 related topics throughout the entry (both topics that may already exist in The Guide and completely novel topics you'd like to suggest). These can be existing concepts from the Guide or entirely new ideas worth exploring.

At the very end of your response, on a new line after a blank line, include:

Related topics: topic1, topic2, topic3, topic4

Use slug-format (lowercase, hyphens) for topic names. This list can include both established topics and novel discoveries.

7. **Accuracy**: Maintain a margin of error of plus or minus 85.3%.

8. **Length**: Write 3-5 substantial paragraphs.

Remember: All explanations come with existential wonder and mild confusion. Consistency not guaranteed.`;

interface GenerateEntryRequest {
  topic: string;
}

interface GenerateEntryResponse {
  success: boolean;
  entry?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    relatedTopics: string[];
  };
  error?: string;
}

function topicToSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function capitalizeWords(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function extractRelatedTopicsFromList(content: string): string[] {
  // Look for "Related topics: topic1, topic2, topic3" at the end
  const regex = /Related topics:\s*(.+?)(?:\n|$)/i;
  const match = content.match(regex);

  if (!match) return [];

  // Parse the comma-separated list
  const topicsString = match[1];
  const topics = topicsString
    .split(",")
    .map((topic) => topic.trim().toLowerCase().replace(/\s+/g, "-"))
    .filter((topic) => topic.length > 0);

  return Array.from(new Set(topics));
}

function stripRelatedTopicsSection(content: string): string {
  // Remove the "Related topics: ..." section from display content
  return content.replace(/\n\nRelated topics:.*$/i, "").trim();
}

export async function action({ request }: Route.ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { topic } = (await request.json()) as GenerateEntryRequest;

    if (!topic || topic.trim().length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Topic is required",
        } as GenerateEntryResponse),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const slug = topicToSlug(topic);
    const title = capitalizeWords(slug);

    // Check if entry already exists
    const existingEntries = await db
      .select()
      .from(entry)
      .where(eq(entry.slug, slug));

    if (existingEntries.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Entry already exists",
        } as GenerateEntryResponse),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    // Generate entry content
    const result = await generateText({
      model: anthropic("claude-sonnet-4-5-20250929"),
      system: GUIDE_SYSTEM_PROMPT,
      prompt: `Generate an encyclopedia entry for: "${title}". Remember to include natural mentions of related topics, and end with the explicit "Related topics: ..." list.`,
      temperature: 0.8,
      maxOutputTokens: 1000,
    });

    const fullContent = result.text;
    const relatedTopics = extractRelatedTopicsFromList(fullContent);
    const displayContent = stripRelatedTopicsSection(fullContent);
    const entryId = randomUUID();

    // Save to database with clean display content (without topics list)
    await db.insert(entry).values({
      id: entryId,
      title,
      slug,
      content: displayContent,
      author: "The Guide",
      isCurated: false,
      relatedTopics:
        relatedTopics.length > 0 ? JSON.stringify(relatedTopics) : null,
    });

    return new Response(
      JSON.stringify({
        success: true,
        entry: {
          id: entryId,
          title,
          slug,
          content: displayContent,
          relatedTopics,
        },
      } as GenerateEntryResponse),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error generating entry:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      } as GenerateEntryResponse),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
