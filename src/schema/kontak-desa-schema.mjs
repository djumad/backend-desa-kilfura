import { z } from "zod";

export const kontakDesaSchema = z.object({
  alamat: z.string().min(1, "Alamat wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  telepon: z.string().min(1, "Nomor telepon wajib diisi"),
  whatsapp: z.string().min(1, "Nomor WhatsApp wajib diisi"),
  mapsUrl: z.string().url("Format URL peta tidak valid"),
});
