// from Better-Auth React Router Integration:
import { Form } from "react-router"
import { useState } from "react"
import { authClient } from "~/lib/auth-client"

type SignUpProps = {
  toggleLogin: () => void
}

export default function SignUp({ toggleLogin }: SignUpProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")


  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          // show loading state
        },
        onSuccess: (ctx) => {
          // redirect to home
        },
        onError: (ctx) => {
          console.log(ctx.error)
        },
      },
    )
  }

  return (
    <div className="text-center text-stone-200">
      <h2>
        Glad to have you,
      </h2>
      <Form
        className="flex flex-col justify-center"
        onSubmit={signUp}
      >
        <input
          className="text-center"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="text-center"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="text-center"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
        >
          Sign Up
        </button>
      </Form>
      <button onClick={toggleLogin}>
        Return to Login
      </button>
    </div>
  )
}