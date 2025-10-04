import SignIn from "~/components/signin";
import SignUp from "~/components/signup";
import type { Route } from "./+types/home";
import { Starfield } from "~/components/ui/starfield-1";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { auth } from "~/lib/auth.server";
import { useState } from "react";
import Logo from "~/components/Logo";


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
      <div className="max-w-screen-2xl absolute inset-0 -z-10 flex min-w-dvw flex-col items-center justify-center overflow-hidden">
        <Starfield />
      </div>
      <section className="mx-auto min-h-dvh z-10 grid md:grid-cols-[1fr_auto] items-center">
        <div className="flex justify-center self-center ">
          <img
            className="relative motion-safe:animate-pulse [transform-gpu] [will-change:transform]"
            src="/dont_panic.svg"
          />
        </div>
        <div className="flex flex-col items-center md:items-stretch max-w-md w-full text-2xl">
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
