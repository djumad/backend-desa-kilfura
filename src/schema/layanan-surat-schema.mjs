import { z } from "zod";

export const layananSuratSchema = z.object({
  namaPemohon: z.string().min(1),
  jenisSurat: z.string().min(1),
  keterangan: z.string().min(1),
  status: z.enum(["diajukan", "diproses", "selesai"]).optional(),
});
