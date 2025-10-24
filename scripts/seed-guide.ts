import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { client } from '../app/lib/database'
import { entry, hyperlink } from '../app/lib/entry-schema'
import { curatedEntries } from '../app/lib/guide-entries'
import { randomUUID } from 'crypto'

const db = drizzle({ client })

async function seedGuide() {
  console.log('🌌 Seeding The Hitchhiker\'s Guide to the Galaxy...')

  try {
    // First, clear existing data
    console.log('🧹 Clearing existing entries...')
    await db.delete(entry)

    // Insert curated entries and track their IDs
    const entryMap = new Map<string, string>()

    for (const curatedEntry of curatedEntries) {
      const entryId = randomUUID()
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
        references: curatedEntry.references
          ? JSON.stringify(curatedEntry.references)
          : null,
      }

      await db.insert(entry).values(entryRecord)
      entryMap.set(curatedEntry.slug, entryId)
      console.log(`✓ Created entry: ${curatedEntry.title}`)
    }

    // Now create hyperlinks between entries based on relatedTopics
    console.log('\n🔗 Creating hyperlinks...')
    for (const curatedEntry of curatedEntries) {
      const sourceEntryId = entryMap.get(curatedEntry.slug)
      if (!sourceEntryId || !curatedEntry.relatedTopics) continue

      for (const relatedSlug of curatedEntry.relatedTopics) {
        const targetEntryId = entryMap.get(relatedSlug)
        if (!targetEntryId) {
          console.log(`  ⚠️  Related entry not found: ${relatedSlug}`)
          continue
        }

        await db.insert(hyperlink).values({
          id: randomUUID(),
          entryId: sourceEntryId,
          linkedEntryId: targetEntryId,
          linkedEntrySlug: relatedSlug,
          anchorText: curatedEntries
            .find(e => e.slug === relatedSlug)
            ?.title || relatedSlug,
        })
        console.log(`  ✓ Linked: ${curatedEntry.title} → ${relatedSlug}`)
      }
    }

    console.log('\n🎉 Guide seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding guide:', error)
    process.exit(1)
  }
}

seedGuide()
