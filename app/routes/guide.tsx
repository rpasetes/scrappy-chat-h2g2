import { db } from "~/lib/database";
import { entry as entryTable } from "~/lib/entry-schema";
import { sql } from "drizzle-orm";
import type { Route } from "./+types/guide";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderFunctionArgs) {
  // Fetch a random entry
  const randomEntries = await db
    .select()
    .from(entryTable)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (!randomEntries.length) {
    // If no entries exist, return a message
    throw new Response("No entries found in The Guide", { status: 404 });
  }

  const randomEntry = randomEntries[0];

  // Redirect to the entry page
  return redirect(`/entry/${randomEntry.slug}`);
}

// This component will never render since we always redirect
export default function Guide() {
  return null;
}
