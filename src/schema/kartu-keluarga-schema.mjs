import { z } from "zod";

export const kartuKeluargaSchema = z.object({
  nomorKK: z.string().max(50),
  alamat: z.string().max(255),
  rt: z.string().max(10),
  rw: z.string().max(10),
  desa: z.string().max(100),
  kecamatan: z.string().max(100),
  kabupaten: z.string().max(100),
  provinsi: z.string().max(100),
  kepalaKeluargaId: z.string().optional(),
});