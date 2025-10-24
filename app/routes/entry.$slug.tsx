import { db } from "~/lib/database";
import { entry as entryTable, readingHistory } from "~/lib/entry-schema";
import { eq, inArray } from "drizzle-orm";
import type { Route } from "./+types/entry.$slug";
import { useLoaderData, Link } from "react-router";
import { auth } from "~/lib/auth.server";
import { randomUUID } from "crypto";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.entry?.title || "Entry"} - The Guide` },
    {
      name: "description",
      content: data?.entry?.content?.substring(0, 160) || "Don't Panic.",
    },
  ];
}

export async function loader({ request, params }: Route.LoaderFunctionArgs) {
  const { slug } = params;

  // Fetch the entry
  let entries = await db
    .select()
    .from(entryTable)
    .where(eq(entryTable.slug, slug))
    .limit(1);

  // If entry doesn't exist, generate it
  if (!entries.length) {
    try {
      const generateResponse = await fetch(
        `${new URL(request.url).origin}/api/generate-entry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: slug.replace(/-/g, " ") }),
        }
      );

      if (!generateResponse.ok) {
        throw new Response(`Failed to generate entry: ${generateResponse.statusText}`, {
          status: 500,
        });
      }

      const { entry: generatedEntry } = (await generateResponse.json()) as {
        entry: typeof entries[0];
      };

      // Fetch the newly created entry
      entries = await db
        .select()
        .from(entryTable)
        .where(eq(entryTable.slug, slug))
        .limit(1);

      if (!entries.length) {
        throw new Response("Entry not found after generation", { status: 500 });
      }
    } catch (error) {
      console.error("Error generating entry:", error);
      throw new Response("Entry not found and could not be generated", {
        status: 404,
      });
    }
  }

  const entryData = entries[0];

  // Parse related topics and fetch their titles
  const relatedSlugs = entryData.relatedTopics
    ? JSON.parse(entryData.relatedTopics)
    : [];
  const relatedEntries =
    relatedSlugs.length > 0
      ? await db
          .select({ slug: entryTable.slug, title: entryTable.title })
          .from(entryTable)
          .where(inArray(entryTable.slug, relatedSlugs))
      : [];

  // Track reading history if user is logged in
  const session = await auth.api.getSession({ headers: request.headers });
  if (session?.user) {
    await db.insert(readingHistory).values({
      id: randomUUID(),
      userId: session.user.id,
      entryId: entryData.id,
    });
  }

  return {
    entry: entryData,
    relatedEntries,
    user: session?.user || null,
  };
}

function parseJsonField(field: string | null): string[] {
  if (!field) return [];
  try {
    return JSON.parse(field);
  } catch {
    return [];
  }
}

export default function EntryView() {
  const { entry, relatedEntries } = useLoaderData<typeof loader>();

  const toc = parseJsonField(entry.tableOfContents);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-900/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            to="/guide"
            className="text-stone-400 hover:text-stone-200 text-sm mb-4 block"
          >
            ← Back to Guide
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-100 mb-2">
            {entry.title}
          </h1>
          <div className="text-stone-400 text-sm">
            <span>By {entry.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
            {entry.isCurated && (
              <>
                <span className="mx-2">•</span>
                <span className="inline-block px-2 py-1 bg-stone-800 rounded text-stone-300">
                  Curated
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Table of Contents Sidebar */}
        {toc.length > 0 && (
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-4">
                Contents
              </h3>
              <nav className="space-y-2">
                {toc.map((section, idx) => (
                  <a
                    key={idx}
                    href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-sm text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    {section}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Entry Content */}
        <article className={toc.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="prose prose-invert max-w-none">
            {entry.content.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="text-stone-200 leading-relaxed mb-6 text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>

      {/* See Also / Related Links */}
      {relatedEntries.length > 0 && (
        <section className="border-t border-stone-800 bg-stone-900/50 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-6">
              See Also
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedEntries.map((relatedEntry) => (
                <Link
                  key={relatedEntry.slug}
                  to={`/entry/${relatedEntry.slug}`}
                  className="p-4 rounded border border-stone-700 hover:border-stone-600 hover:bg-stone-800/50 transition-colors group"
                >
                  <div className="font-medium text-stone-100 group-hover:text-stone-50">
                    {relatedEntry.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/50 backdrop-blur mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-stone-400 text-sm">
            The Hitchhiker's Guide to the Galaxy - Always here to help.
          </p>
        </div>
      </footer>
    </div>
  );
}
