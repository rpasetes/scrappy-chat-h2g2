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
    <div>
      <div className="absolute -z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Starfield />
      </div>
      <img
        className="relative motion-safe:animate-pulse [transform-gpu] [will-change:transform]"
        src="/dont_panic.svg"
      />
      <div className="flex flex-col relative mt-14 z-20 align-center justify-center">
        {signingUp
          ? <SignUp toggleLogin={toggleLogin} />
          : <SignIn toggleLogin={toggleLogin} />
        }
      </div>
    </div>
  )
}
