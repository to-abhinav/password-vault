'use client'
import Navbar from "@/components/Navbar";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      <Navbar userAvatar={session.user.image} isAuthenticated={true} />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <Navbar />
      Not signed in <br />
      <button onClick={() => signIn('github')}>Sign in using github</button>
    </>
  )
}


