import { z } from "zod";

export const produkUnggulanSchema = z.object({
  nama: z.string().min(1),
  deskripsi: z.string().min(1),
  harga: z.coerce.number().min(0),
});
