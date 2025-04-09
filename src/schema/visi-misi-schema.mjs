import {z} from "zod";

export const visiMisiSchema = z.object({
    judul : z.string(),
    deskripsi : z.string(),
})