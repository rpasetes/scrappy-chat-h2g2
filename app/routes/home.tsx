import SignIn from "~/components/signin";
import SignUp from "~/components/signup";
import type { Route } from "./+types/home";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { auth } from "~/lib/auth.server";
import { useState } from "react";
import StarryBackground from "~/components/StarryBackground";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hitchhiker's Chat" },
    { name: "description", content: "Don't Panic." },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    return redirect('/chat')
  } else {
    return
  }
}

export default function Home() {
  const [signingUp, setSigningUp] = useState(false)

  const toggleLogin = () => {
    setSigningUp(prev => {
      const next = !prev
      console.log('toggling login to', next)
      return next
    })
  }

  return (
    <div className="relative min-h-dvh">
      <StarryBackground />
      <section className="absolute inset-0 z-10 grid place-content-center md:place-items-center
                px-6 mx-auto w-full max-w-screen-2xl md:grid-cols">
        <div className="flex justify-center self-center ">
          <img
            className="justify-self-center md:justify-self-end w-full max-w-4xl motion-safe:animate-pulse [will-change:transform] [transform-gpu]"
            src="/dont_panic.svg"
          />
        </div>
        <div className="w-full max-w-sm md:max-w-md justify-self-center md:justify-self-start text-4xl md:text-2xl">
          {signingUp
            ? <SignUp toggleLogin={toggleLogin} />
            : <SignIn toggleLogin={toggleLogin} />
          }
        </div>
        <audio src='h2g2.mp3' autoPlay />
      </section>
    </div>
  )
}
