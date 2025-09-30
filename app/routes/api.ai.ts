import { anthropic } from '@ai-sdk/anthropic'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import type { Route } from "./+types/api.ai";

export async function action({ request }: Route.ActionArgs) {
  const { messages }: { messages: UIMessage[] } = await request.json()

  const result = streamText({
    model: anthropic('claude-sonnet-4-5-20250929'),
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}