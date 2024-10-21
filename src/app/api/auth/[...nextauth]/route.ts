import { findAdminByEmail } from "@/features/managers/model";
import { ICreateAdminInput } from "@/features/managers/type";
import { comparePassword } from "@/utils/common/password";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const adminLogin = async (email:string, password: string) => {
    const existedAdmin = await findAdminByEmail(email)
    if(!existedAdmin) {
        throw Error("This email is not exist");
    }

    const isMatchPassword = await comparePassword(password, existedAdmin.password)

    if(!isMatchPassword) {
        throw Error("The Password is incorrect");
    }

    return {
        email: existedAdmin.email,
        id: existedAdmin.id
    }
}

export const authOptions: NextAuthOptions = {
    providers : [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req){
                const {email, password} = credentials as ICreateAdminInput;
                return adminLogin(email, password);
            }
        })
    ]
}

const authHandler = NextAuth(authOptions)

export {authHandler as GET, authHandler as POST}
