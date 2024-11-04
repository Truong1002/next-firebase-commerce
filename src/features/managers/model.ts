import { addDoc, collection, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import { IAdminDb, ICreateAdminInput } from "./type";
import { COLLECTIONS } from "@/constants/common";
import { db } from "@/utils/firebase";
import { hashPassword } from "@/utils/common/password";

const adminRef = collection(db, COLLECTIONS.ADMIN)

export const findAdminByEmail = async (email:string): Promise<IAdminDb | undefined> => {
    const existedAdmin = await getDocs(
        query(adminRef, where("email", "==", email ))
    );

    if(!existedAdmin.docs[0]) {
        return undefined
    }
    const admin = existedAdmin.docs[0].data() as IAdminDb;

    return {
        ...admin,
        id: existedAdmin.docs[0].id
    }
}

export const createAdmin = async (data: ICreateAdminInput) => {
    //TODO: Save to firebase
    const existedAdmin = await findAdminByEmail(data.email);

    if(existedAdmin){
        throw Error("Email is existed");
    }

    const hashedPassword = await hashPassword(data.password);

    const newAdminRef = await addDoc(adminRef, {
        email: data.email,
        password: hashedPassword,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
    })

    const newAdmin = await getDoc(newAdminRef);
    return {id: newAdmin.id, ...newAdmin.data() }
}

