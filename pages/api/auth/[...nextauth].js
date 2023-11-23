import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import conn from "../db-connection";
import { promisify } from 'util';

export default NextAuth({
  
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        nim: { label: "NIM", type: "text" },
      },
      authorize: async (credentials) => {
        const query = promisify(conn.query).bind(conn);
        const { nim } = credentials;
        const q = "SELECT * FROM tb_pengunjung WHERE kd_pengunjung = ?";
        const values = [nim];
        try {
          const user = await query(q, values);
          if (user.length > 0) {
            return user[0];
          } else {
            return null;
          }
        } catch (error) {
          throw error;
        }       
      },
      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({token,account,user}){
      if(account?.provider === 'credentials'){
        token.name = user.nm_pengunjung
        token.nim = user.kd_pengunjung
      }
      return token;
    },
    async session({session, token}){
      if("nim" in token){
        session.user.name = token.name;
        session.user.nim = token.nim;
      }
      return session;
    }
  },
  pages:{
    signIn: "/auth/login",
  }
});
