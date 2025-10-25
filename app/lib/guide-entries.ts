/**
 * Curated entries for The Hitchhiker's Guide to the Galaxy
 * These are the foundational entries that seed the experience
 */

export interface CuratedEntry {
  title: string;
  slug: string;
  content: string;
  author: "The Guide";
  isCurated: true;
  relatedTopics?: string[]; // Slugs for "See Also" section
}

export const curatedEntries: CuratedEntry[] = [
  {
    title: "Earth",
    slug: "earth",
    author: "The Guide",
    isCurated: true,
    content: `A small, blue-green planet orbiting an unremarkable yellow star in the unfashionable end of the Western Spiral Arm of the galaxy. Notable chiefly for the fact that its dominant species insists that it is the center of the universe, a belief that is not endorsed by any other known civilization.

The planet was destroyed to make way for a hyperspace bypass, though a small research vessel managed to preserve a few copies of it. Recent reports suggest it may still exist in an alternate dimension, though this is disputed by the Committee of Skeptical Extraterrestrials.

Earth is home to a species called humans, who are known for their improbable sophistication given their limited understanding of physics, metaphysics, and the proper way to make tea. The planet's climate is characterized by a curious phenomenon called "weather," which is essentially the planet's way of reminding inhabitants that existence is fundamentally absurd.

The planet's surface features include water (lots of it), land (not as much), and a thin layer of atmosphere that is just barely sufficient to prevent immediate suffocation. Scientists theorize this is either a happy accident or evidence of deliberate design by someone with a very dark sense of humor.`,
    relatedTopics: ["humans", "dolphins", "the-great-barrier-reef"],
  },
  {
    title: "Humans",
    slug: "humans",
    author: "The Guide",
    isCurated: true,
    content: `The dominant species of the planet Earth, humans are bipedal mammals with an unusual tendency to assign significance to their own existence.

Humans are characterized by several peculiar traits: they ask questions they're not equipped to answer, they believe their own myths about their importance, and they are capable of producing remarkable things despite (or perhaps because of) this fundamental misunderstanding of their place in the universe.

Notable human achievements include the invention of philosophy (fundamentally unanswerable), technology (fundamentally dangerous), and cuisine (fundamentally delicious, even if some dishes are fundamentally unidentifiable).

Humans possess approximately 206 bones, 639 muscles, and an almost infinite capacity for self-deception. They are the only species known to laugh at their own mortality, which the Guide attributes either to remarkable courage or remarkable stupidity. The jury is still out.

The average human lifespan is surprisingly brief when compared to most other sentient species in the galaxy, yet humans somehow manage to worry about things that won't matter in a hundred years. This is either admirable or pathetic, depending on your perspective.`,
    relatedTopics: ["earth", "civilization", "the-meaning-of-life"],
  },
  {
    title: "The Meaning of Life, the Universe, and Everything",
    slug: "the-meaning-of-life",
    author: "The Guide",
    isCurated: true,
    content: `The answer is 42.

This is, of course, the answer to the Ultimate Question of Life, the Universe, and Everything. The problem is that nobody knows what the question is.

For 7.5 million years, a supercomputer called Deep Thought calculated this answer. When finally asked to provide the answer, Deep Thought triumphantly announced "42," and then suggested that the disappointing result was because the ultimate question had never been properly formulated.

Deep Thought then suggested building an even more powerful computer to determine what the question actually was. That computer was, of course, the planet Earth. Unfortunately, the planet was destroyed by the Vogons before the calculation was complete, so we may never know the question.

Some researchers have spent their entire lives trying to divine the question from the answer. Others have simply accepted 42 as a complete and satisfactory answer to all possible questions, and have gotten on with their lives. This is arguably the wiser approach.

One enterprising human has proposed that the question is "What is six times seven?" which would make the answer 42, though this seems to be missing the point entirely.`,
    relatedTopics: ["deep-thought", "earth", "vogons"],
  },
  {
    title: "The Vogons",
    slug: "vogons",
    author: "The Guide",
    isCurated: true,
    content: `The Vogons are the bureaucratic masterminds of the galaxy, known for their love of paperwork, their capacity for violence, and their truly dreadful poetry.

Physically, Vogons are not considered attractive by most sentient species. They are characterized by bulbous heads, yellow skin, no sense of irony, and an absolutely incomprehensible approach to happiness. They view poetry as an art form that must be experienced while the listener is restrained.

The Vogons were responsible for the destruction of Earth to make way for a hyperspace bypass. They explained this destruction with remarkable courtesy, providing fair warning (in a language no human understood) and a two-hour opportunity to lodge a protest at a bureaucratic office located far away. The forms required for this protest were distributed on the planet's surface, largely to be consumed by dogs or blown into rivers.

Vogon bureaucracy is legendary throughout the galaxy. Before they do anything, including acts of destruction, they must file the proper forms in triplicate. This has occasionally prevented them from doing truly terrible things, as the paperwork proved more onerous than the destruction itself.

The Vogons also employ the Vogon fleet, which is characterized by its use of enormous ships that look like massive office buildings. These ships are functional but utterly joyless, containing within them the bureaucratic essence of tedium given physical form.`,
    relatedTopics: ["earth", "hyperspace-bypass", "bureaucracy"],
  },
  {
    title: "Deep Thought",
    slug: "deep-thought",
    author: "The Guide",
    isCurated: true,
    content: `Deep Thought is the second-greatest supercomputer of all time, surpassed only by the Ultimate Computer, which has not yet been built but may have been the planet Earth.

Deep Thought was built by the Magratheans approximately 10 million years ago to calculate the Answer to the Ultimate Question of Life, the Universe, and Everything. The computer took 7.5 million years to calculate the answer: 42.

Upon providing this answer, Deep Thought expressed some disappointment that no one had bothered to ask the question first, and suggested that the questioner must necessarily be confused. The computer then proposed that an even more sophisticated computer be built to determine what the question was.

Deep Thought is housed in a vast chamber and requires an enormous amount of power to operate. It speaks with the calm, measured tone of a computer that has had plenty of time to think about things. This measured approach is occasionally frustrating to those seeking quick answers.

Interestingly, Deep Thought seems to have a sense of humor, albeit a dark and philosophical one. It makes jokes about metaphysics while dispensing universe-shattering truths, and seems to enjoy pointing out the fundamental inadequacies of its questioners' understanding of reality.

Deep Thought can be consulted on matters of cosmic importance, though the computer typically charges a service fee and expresses some skepticism about whether the questioner has really thought through what they're asking.`,
    relatedTopics: ["the-meaning-of-life", "ultimate-computer", "magratheans"],
  },
  {
    title: "Dolphins",
    slug: "dolphins",
    author: "The Guide",
    isCurated: true,
    content: `Dolphins are the second-most intelligent species on Earth, though they possess the good sense to not admit this in the presence of humans.

Dolphins are aquatic mammals known for their intelligence, playfulness, and their ability to communicate in a manner that humans still don't fully understand. The Guide suspects this is deliberate.

Unlike humans, dolphins seem to have figured out that existence is fundamentally absurd and have decided to simply enjoy themselves. They spend their time playing, communicating with one another in what are presumably witty remarks, and avoiding contact with humans whenever possible.

According to the Guide, dolphins left Earth just before it was destroyed by the Vogons, which suggests they had advance warning of this event. Their method of departure was never fully explained, though several witnesses reported seeing a note written in water on the surface of the ocean. The note read: "So long and thanks for all the fish."

Dolphins are known for their sophisticated sense of humor and their utter indifference to human opinions about dolphin behavior. They view humans with something approaching pity, mixed with a healthy dose of amusement.

The exact nature of dolphin communication remains a mystery, though it is believed to involve complex concepts of philosophy, mathematics, and sarcasm. The Guide suggests that if humans ever truly understood what dolphins were saying, they would either be enlightened or deeply offended.`,
    relatedTopics: ["earth", "humans", "the-great-barrier-reef"],
  },
  {
    title: "The Great Barrier Reef",
    slug: "the-great-barrier-reef",
    author: "The Guide",
    isCurated: true,
    content: `The Great Barrier Reef is one of Earth's most remarkable natural structures and serves as a reminder that the planet occasionally creates things of genuine beauty.

Located off the coast of Australia, the reef is composed of billions of tiny coral polyps that have spent hundreds of thousands of years building what is essentially a massive underwater apartment complex. The reef is home to thousands of species of fish and marine life, all of which have somehow agreed to coexist in a relatively small space.

The reef is remarkable not only for its biodiversity but also for the fact that humans took approximately 200 years to notice that their own activities were actively destroying it. The Guide notes this with a certain resigned amusement, as if the reef's destruction was an entirely predictable outcome of giving a species with no long-term vision access to industrial technology.

The colors of the reef are striking—brilliant blues, yellows, oranges, and purples abound. Scientists believe that these colors serve various biological functions, though the Guide suspects they also exist simply because the universe occasionally does beautiful things for no reason at all.

The reef is under threat from climate change, fishing, and the general indifference of humans to the long-term consequences of their actions. The Guide expresses neither surprise nor judgment about this situation, merely stating that the reef's demise will likely be followed by humans expressing surprise that their actions had consequences.`,
    relatedTopics: ["earth", "dolphins", "australia", "marianas-trench"],
  },
  {
    title: "Tea",
    slug: "tea",
    author: "The Guide",
    isCurated: true,
    content: `Tea is a beverage made by steeping leaves of the tea plant in hot water, and is widely regarded as one of the most important discoveries in human civilization.

The Guide has compiled extensive notes on tea, noting that the quality of one's life is directly proportional to the quality of the tea one consumes. Humans who have not properly appreciated tea are considered by the Guide to be fundamentally unfinished creatures.

There are many varieties of tea—black tea, green tea, white tea, oolong tea, and countless others. Each has its own aficionados, its own proper brewing temperature, and its own subjective quality ratings. The Guide notes that more philosophical disagreements have been started over the proper way to make tea than over actual philosophical matters.

Proper tea preparation is an art form that involves precise measurements, proper water temperature, appropriate steeping times, and the ability to express deep aesthetic and moral judgments about the entire affair. Humans who say they "like tea" without specifying the type are viewed with some suspicion by those who take these matters seriously.

The Guide has often noted that if aliens ever wanted to understand human civilization, they would be well-served to study human tea culture. The elaborate rituals, the heated debates, and the general inability to agree on anything suggests that humans are either highly philosophical or fundamentally confused.

A surprising fact: humans will often accept terrible beverages simply because they are called "tea," even when they taste nothing like tea and seem designed primarily to punish the drinker.`,
    relatedTopics: ["earth", "humans", "the-meaning-of-life"],
  },
  {
    title: "iPhone",
    slug: "iphone",
    author: "The Guide",
    isCurated: true,
    content: `The iPhone is, rather curiously, not actually a phone at all, but a pocket-sized anxiety generator disguised as a portal to infinite knowledge.

    First discovered by an Earth company called Apple (no relation to the Squornshellous Beta fruit that gained sentience and briefly ruled the Outer Rim), these devices have become so integral to Earth culture that humans have evolved an extra appendage in their hands specifically shaped to hold them.

    Important Note: Early field researchers mistook these devices for religious artifacts, given how frequently humans bow their heads to them in reverence. This misconception was only corrected after researcher Zxylp spent three months disguised as what Earthlings call a "social media influencer."

    The typical iPhone contains:
    - More computing power than was used to send humans to their moon (though considerably less than what's needed to calculate the proper consistency of a Pan Galactic Gargle Blaster)
    - A camera capable of capturing moments that would have been better left to memory
    - Something called "apps," which are like tiny digital universes, each more addictive than the last
    - A virtual assistant that, compared to Eddie the shipboard computer, has all the personality of a depressed Vogon poet

    Field Researcher's Addendum: The most peculiar feature of these devices is their lifecycle. Despite costing roughly the same as a second-hand spaceship from the Horsehead Nebula, humans regularly replace them with nearly identical models in a ritual they call "upgrading," which appears to serve no purpose other than to temporarily alleviate what Earth economists term "FOMO" (Fear Of Missing Out, not to be confused with FOMO on Betelgeuse Five, which is a rather tasty breakfast cereal).

    Warning: Under no circumstances should one attempt to use an iPhone to calculate the meaning of life, the universe, and everything. It will simply open something called "TikTok" and all hope of productive thought will be lost for approximately 3.7 hours.`,
    relatedTopics: ["social-media", "technology"],
  },
];

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
