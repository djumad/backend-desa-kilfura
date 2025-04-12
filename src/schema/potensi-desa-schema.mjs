import { z } from "zod";

export const potensiDesaSchema = z.object({
  kategori: z.string().min(1, "Kategori wajib diisi"),
  nama: z.string().min(1, "Nama wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});