import { z } from "zod";

export const lembagaDesaSchema = z.object({
  nama: z.string().min(1, "Nama lembaga wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});
