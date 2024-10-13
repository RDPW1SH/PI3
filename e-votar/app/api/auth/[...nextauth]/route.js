import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { Users } from "@/models";

providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "text", placeholder: "jsmith" },
      password: { label: "password", type: "password" }
    },
    async authorize(credentials, req) {

      try {

        // Connect to MySql
        await connectToDB();

        const email = Users.findOne({where: req.email === credentials.email});

        if(email) {

          const password = Users.findOne({where: req.password === credentials.password});

          if(password) {
            
          }
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      } catch (error) {

      }





    },
    async session() {

    },
    pages: {
      login: './login',
      register: './register',
      forgot_password: './forgot-password',
    }
  })
]