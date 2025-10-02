// from Better-Auth React Router Integration:
import { Form, redirect } from "react-router"
import { useState } from "react"
import { authClient } from "~/lib/auth-client"
import { useNavigate } from "react-router"

type SignInProps = {
  toggleLogin: () => void
}

export default function SignIn({ toggleLogin }: SignInProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (ctx) => {
          console.log('logging in!', ctx.data)
          navigate('/chat')
        },
        onError: (ctx) => {
          console.log(ctx.error)
        },
      },
    )
  }

  return (
    <div className="text-center text-stone-200">
      <Form className="flex flex-col justify-center" onSubmit={signIn}>
        <input
          className="text-center"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="text-center"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className="text-stone-200"
          type="submit"
        >
          ENTER THE GUIDE
        </button>
      </Form>
      <button
        className="mt-4"
        onClick={toggleLogin}>
        First time?
      </button>
    </div>
  )
}