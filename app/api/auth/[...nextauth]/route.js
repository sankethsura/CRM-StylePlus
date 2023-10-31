import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        return await signInWithEmailAndPassword(
          auth,
          credentials.email || "",
          credentials.password || ""
        )
          .then((userCredentials) => {
            if (userCredentials.user) {
              return userCredentials.user;
            }
            return null;
          })
          .catch((error) => console.log(error));
      },
    }),
    
  ],
  pages: {
    signIn: '/signin'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
