/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from "zod";

export const formatZodMessage = (error:ZodError) => {
    const messages = error.issues;
    return messages.map((i: any) => i.messages).join(","); 
}