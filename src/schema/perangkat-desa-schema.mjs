import { z } from "zod";

export const perangkatDesaSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
});
