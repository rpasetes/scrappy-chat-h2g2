import { redirect, useNavigate } from "react-router";
import { authClient } from "~/lib/auth-client";
import { Button } from "./ui/button";

export default function LogOut() {
  const navigate = useNavigate()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: (ctx) => {
          console.log('logging out!', ctx.data)
          navigate('/')
        },
        onError: (ctx) => {
          console.log(ctx.error)
        }
      }
    })
  }

  return (
    <Button className="z-20" onClick={signOut}>
      Log Out
    </Button>
  )
}