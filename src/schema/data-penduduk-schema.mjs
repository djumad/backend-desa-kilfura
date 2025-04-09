import { z } from "zod";

export const dataPendudukSchema = z.object({
  nama: z.string().min(1),
  tanggalLahir: z.coerce.date(),
  pekerjaan: z.string().min(1),
  jenisKelamin: z.string().min(1),
  pendidikanTerakhir: z.string().min(1),
  agama: z.string().min(1),
  kartuKeluargaId: z.string().optional(),
  hubunganKeluarga: z.string().optional(),
});
