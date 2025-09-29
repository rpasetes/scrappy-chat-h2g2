import SignIn from "~/components/signin";
import SignUp from "~/components/signup";
import type { Route } from "./+types/home";
import { authClient } from "~/lib/auth-client";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Chat-H2G2" },
    { name: "description", content: "Don't Panic." },
  ];
}

export default function Home() {
  const { data, isPending, error } = authClient.useSession()
  if (data) {
    console.log(data)
    return <div>Hello, {data.user.email}!</div>
  } else if (isPending) {
    return <div>Loading...</div>
  } else {
    return <div>
      <SignUp />
      <SignIn />
    </div>
  }
}
