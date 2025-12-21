import NextAuth from "next-auth";
import { authOptions } from './options';


const handler= NextAuth(authOptions) //NextAuth is basically a method that text authOptions as a parameter

export {handler as GET , handler as POST}