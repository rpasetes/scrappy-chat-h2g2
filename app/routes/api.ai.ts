import { anthropic } from '@ai-sdk/anthropic'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import type { Route } from "./+types/api.ai";

// (1635) ohh, adding custom route handler to 
// routes.ts generates the appropriate types!
export async function action({ request }: Route.ActionArgs) {
  const { messages }: { messages: UIMessage[] } = await request.json()

  const result = streamText({
    model: anthropic('claude-sonnet-4-5-20250929'),
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}