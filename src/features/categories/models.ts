import { COLLECTIONS } from "@/constants/common";
import { db } from "@/utils/firebase";
import { addDoc, collection, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, Query, query, QueryConstraint, startAfter, startAt, Timestamp, where } from "firebase/firestore";
import { ICategoryDb, ICategoryDoc, ICreateCategoryInput, IGetCategoryInput } from "./type";
import { AddCategorySchema } from "./rules";
import { formatZodMessage } from "@/utils/common/zod-message";
import { IPaginationRes } from "../type";

const categoriesRef = collection(db, COLLECTIONS.CATEGORY)

export const getCategoryBySlug = async (slug: string) => {
    const existedCategory = await getDocs(
        query(categoriesRef, where("slug", "==", slug))
    );

    if(!existedCategory.docs[0]) {
        return undefined;
    }
    const category = existedCategory.docs[0].data() as ICategoryDoc;
    
    return {
       ...category,
        id: existedCategory.docs[0].id
    }
}

export const addCategory = async(data: ICreateCategoryInput): Promise<ICategoryDb> => {
    const test = AddCategorySchema.safeParse(data);
    if (!test.success){
        const message = formatZodMessage(test.error);
        throw Error(message);
    }
    const existedCategory = await getCategoryBySlug(data.slug);
    if (existedCategory) {
        throw Error("Slug has been used!")
    }
    const newCateRef = await addDoc(categoriesRef, {
        ...data,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
    });
    const newCategory = await getDoc(newCateRef)
    
    return { id: newCategory.id, ...newCategory.data() as ICategoryDoc
    }
}

export const getCategories = async (
    data: IGetCategoryInput
): Promise<IPaginationRes<ICategoryDb>> => {
    const {keyword, page, size = 5} = data;
    const queries = [];

    const queriesKeyword = keyword
    ? [orderBy("name"), startAt(keyword), endAt(keyword + "\uf8ff")]
    : [orderBy("name")];
queries.push(...queriesKeyword);

    if (page > 1){
        const lastDoc = await getLastVisibleDoc(categoriesRef, queriesKeyword, page, size);
        if (lastDoc) {
            queries.push(startAfter(lastDoc));
        }
    }

    const categoriesDocsRef = await getDocs(
        query(categoriesRef, ...queries, limit(size))
    );

    const categories = categoriesDocsRef.docs.slice(0,5).map((d) => ({
        ...(d.data() as ICategoryDoc),
        id: d.id
    }))

    const total = await getCountFromServer(query(categoriesRef, ...queriesKeyword))
    return {meta: {total: total.data().count}, data: categories}
}

const getLastVisibleDoc = async (
    queryRef: Query,
    queries: QueryConstraint[],
    page: number,
    size: number
) => {
    const offset = (page - 1) * size;
    const limitedQueries = [...queries, limit(offset)];
    const docFormStart = await getDocs(query(queryRef, ...limitedQueries));
    const lastDoc = docFormStart.docs[docFormStart.docs.length - 1];
    return lastDoc;
};