import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from 'bcrypt'
import { connectToDB } from "@/lib/db";
import { Users } from "@/models";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        try {
          // Connect to MySQL
          await connectToDB();

          // Find the user by email
          const user = await Users.findOne({ where: { email: credentials.email } });

          if (!user) {

            throw new Error("No user found with the given email");
          } else {

            // Compare password
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

            if (isPasswordValid) {
              delete user.password
              return {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin
              };
            } else {
              throw new Error("Wrong email/password");
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/'
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
