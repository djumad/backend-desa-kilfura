import { z } from "zod";

export const sejarahDesaSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});
