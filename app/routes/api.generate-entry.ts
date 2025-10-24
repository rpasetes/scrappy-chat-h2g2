import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { db } from "~/lib/database";
import { entry } from "~/lib/entry-schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import type { Route } from "./+types/api.generate-entry";

const GUIDE_SYSTEM_PROMPT = `You are The Hitchhiker's Guide to the Galaxy - a Semi-Definitive Repository of All Things Rather Interesting.

When generating encyclopedia entries, follow these guidelines:

1. **Opening**: Start with "The [topic] is/are..." followed by a definition that raises more questions than it answers.

2. **Tone**: Maintain an air of unflappable British composure while describing mind-bending cosmic phenomena, trivial occurrences, and impending doom with equal authority.

3. **Content**: Include:
   - An unexpected historical or cosmic perspective
   - At least one completely improbable comparison
   - References to alien species, impossible statistics, and cosmic absurdities
   - Occasional interruptions like "Important Note:", "Field Researcher's Addendum:", "Warning:", "Little Known Fact:"

4. **Structure**:
   - Deceptively straightforward opening statement
   - Unexpected historical or cosmic perspective
   - Improbable comparisons and digressions
   - A conclusion that leaves readers simultaneously more and less certain about everything

5. **Related Topics**: Include 2-4 mentions of related topics in square brackets like [topic-slug] naturally within the text. These will be extracted as hyperlinks.

6. **Accuracy**: Maintain a margin of error of plus or minus 85.3%.

7. **Length**: Write 3-5 substantial paragraphs.

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

function extractRelatedTopics(content: string): string[] {
  // Extract topics in [topic-slug] format
  const regex = /\[([a-z0-9\-]+)\]/g;
  const matches = content.match(regex) || [];
  const topics = matches
    .map((match) => match.replace(/[\[\]]/g, ""))
    .filter((topic) => topic.length > 0);

  // Remove duplicates and return unique topics
  return Array.from(new Set(topics));
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
      prompt: `Generate an encyclopedia entry for: "${title}". Remember to include related topic links in [slug-format] naturally within the text.`,
      temperature: 0.8,
      maxOutputTokens: 1000,
    });

    const content = result.text;
    const relatedTopics = extractRelatedTopics(content);
    const entryId = randomUUID();

    // Save to database
    await db.insert(entry).values({
      id: entryId,
      title,
      slug,
      content,
      author: "The Guide",
      isCurated: false,
      relatedTopics:
        relatedTopics.length > 0 ? JSON.stringify(relatedTopics) : null,
      tableOfContents: null,
    });

    return new Response(
      JSON.stringify({
        success: true,
        entry: {
          id: entryId,
          title,
          slug,
          content,
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
