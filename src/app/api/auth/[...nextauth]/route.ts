import { findAdminByEmail } from "@/features/managers/model";
import { loginSchema } from "@/features/managers/rules";
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
    if (!existedAdmin.isActive) {
        throw Error("This admin is inactive!");
    }
    return {
        email: existedAdmin.email,
        id: existedAdmin.id
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers : [
        CredentialsProvider({
            credentials: {},
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials, req){
                const {email, password} = credentials as ICreateAdminInput;
                const data = loginSchema.safeParse({email, password})

                if(!data.success){
                    const messages = JSON.parse(data.error.message)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    throw Error(messages.map((i: any) => i.messages).join(','))
                }
                return adminLogin(email, password);
            }
        })
    ],
    callbacks: {}
}

const authHandler = NextAuth(authOptions)

export {authHandler as GET, authHandler as POST}
