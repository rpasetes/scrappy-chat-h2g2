import { redirect } from "react-router";
import { authClient } from "~/lib/auth-client";
import { Button } from "./ui/button";

export default function LogOut() {
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/')
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