import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "~/components/ui/button"
import type { Route } from "./+types/chat"
import { Starfield } from "~/components/ui/starfield-1"
import { redirect, type LoaderFunctionArgs } from "react-router"
import { auth } from "~/lib/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    return { name: session.user.name }
  } else {
    throw redirect('/')
  }
}

export default function Chat({ loaderData }: Route.ComponentProps) {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: 'api/ai'
    })
  })

  return (
    <div className="absolute inset-0 -z-10 flex h-screen w-full flex-col items-center justify-center">
      <Starfield />
      <div className="relative overflow-y-auto z-10 flex flex-col w-full max-w-md py-24 mx-auto stretch text-stone-400">
        {messages.map(message => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
              }
            })}
          </div>
        ))}
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput('');
          }}
        >
          <input
            className="fixed dark:bg-stone-900 bottom-0 w-full max-w-md p-2 mb-11 border border-stone-300 dark:border-stone-800 rounded shadow-xl text-stone-200"
            value={input}
            placeholder={`Ask me about anything in the universe, ${loaderData.name}...`}
            onChange={e => setInput(e.currentTarget.value)}
          />
          <Button
            className="fixed dark:bg-stone-800 hover:bg-stone-700 border border-stone-300 dark:border-stone-800 bottom-0"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}