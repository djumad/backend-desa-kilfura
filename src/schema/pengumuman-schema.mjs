import { z } from "zod";

export const pengumumanSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  isi: z.string().min(1, "Isi pengumuman wajib diisi"),
  tanggal: z.string().default(Date.now()),
});
