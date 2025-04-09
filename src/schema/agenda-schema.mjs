import { z } from "zod";

export const agendaSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  tanggal: z.string().datetime({ message: "Format tanggal tidak valid" }),
});
