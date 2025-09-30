import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { Route } from "../routes/+types/protected"; // nit: check type-route match!
import { auth } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    return { user: session.user }
  } else {
    throw redirect('/')
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request)
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  return <div>Hello, {loaderData.user.email}!</div>
}