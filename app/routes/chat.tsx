import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "~/components/ui/button"
import type { Route } from "./+types/chat"
import { Starfield } from "~/components/ui/starfield-1"
import { redirect, type LoaderFunctionArgs } from "react-router"
import { auth } from "~/lib/auth.server"
import LogOut from "~/components/logout"

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
      <div className="relative overflow-y-scroll z-10 flex flex-col w-full max-w-md py-24 mx-auto stretch text-stone-300">
        <div className="flex-1 flex-col">
          {messages.map(message => (
            <div key={message.id} className="whitespace-pre-wrap">
              {message.role === 'user' ? `${loaderData.name}: ` : `The Guide: `}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          ))}
        </div>
        <div className="shrink-0 flex flex-col">
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
              placeholder={`What would you like to know about Earth, ${loaderData.name}?`}
              onChange={e => setInput(e.currentTarget.value)}
            />
            <Button
              className="fixed dark:bg-stone-800 hover:bg-stone-700 bottom-0"
              type="submit"
            >
              Submit
            </Button>
            <LogOut />
          </form>
        </div>
      </div>
    </div>
  );
}