import { db } from "~/lib/database";
import { entry } from "~/lib/entry-schema";
import { curatedEntries } from "~/lib/guide-entries";
import { randomUUID } from "crypto";
import type { Route } from "./+types/api.seed";

export async function action({ request }: Route.ActionFunctionArgs) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Optional: Add a security check (e.g., check for a secret token)
  // const token = request.headers.get("authorization");
  // if (token !== `Bearer ${process.env.SEED_TOKEN}`) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  try {
    console.log("🌌 Seeding The Hitchhiker's Guide to the Galaxy...");

    // Clear existing entries
    console.log("🧹 Clearing existing entries...");
    await db.delete(entry);

    // Insert curated entries and track their IDs
    const entryMap = new Map<string, string>();

    for (const curatedEntry of curatedEntries) {
      const entryId = randomUUID();
      const entryRecord = {
        id: entryId,
        title: curatedEntry.title,
        slug: curatedEntry.slug,
        content: curatedEntry.content,
        author: curatedEntry.author,
        isCurated: curatedEntry.isCurated,
        tableOfContents: curatedEntry.tableOfContents
          ? JSON.stringify(curatedEntry.tableOfContents)
          : null,
        relatedTopics: curatedEntry.relatedTopics
          ? JSON.stringify(curatedEntry.relatedTopics)
          : null,
      };

      await db.insert(entry).values(entryRecord);
      entryMap.set(curatedEntry.slug, entryId);
      console.log(`✓ Created entry: ${curatedEntry.title}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "🎉 Guide seeded successfully!",
        entriesCreated: curatedEntries.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error seeding guide:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
