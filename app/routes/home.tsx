import SignIn from "~/components/signin";
import SignUp from "~/components/signup";
import type { Route } from "./+types/home";
import { authClient } from "~/lib/auth-client";
import { Starfield } from "~/components/ui/starfield-1";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { auth } from "~/lib/auth.server";


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
  const { data, isPending, error } = authClient.useSession()
  if (data) {
    console.log(data)
    return <div>Hello, {data.user.email}!</div>
  } else if (isPending) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <div className="absolute -z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <Starfield />
        </div>
        <div className="flex flex-col relative z-10 align-center justify-center">
          <img src="/dont_panic.svg" />
          <SignIn />
          <SignUp />
        </div>
      </div>
    )
  }
}
