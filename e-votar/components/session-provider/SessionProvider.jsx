import { SessionProvider } from "next-auth/react"

function SessionAuthProvider({
  children,
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default SessionAuthProvider