// from Better-Auth React Router Integration:
import { Form, redirect } from "react-router"
import { useState } from "react"
import { authClient } from "~/lib/auth-client"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (ctx) => {
          console.log('logging in!', ctx.data)
          redirect('/chat')
        },
        onError: (ctx) => {
          alert(ctx.error)
        },
      },
    )
  }

  return (
    <div>
      <h2 className="text-center text-stone-200">
        Welcome back,
      </h2>
      <Form className="flex flex-col justify-center text-stone-200 text-center" onSubmit={signIn}>
        <input
          className="text-center"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user"
        />
        <input
          className="text-center"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="..."
        />
        <button
          className="text-stone-200"
          type="submit"
        >
          Enter the Guide
        </button>
      </Form>
    </div>
  )
}