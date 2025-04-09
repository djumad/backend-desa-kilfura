import { z } from "zod";

export const transparansiSchema = z.object({
  tahun: z.coerce.number().int().min(2000),
  pendapatan: z.coerce.number().nonnegative(),
  belanja: z.coerce.number().nonnegative(),
  rincian: z.string().min(1, "Rincian anggaran wajib diisi"),
});
