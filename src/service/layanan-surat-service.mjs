import prisma from "../database/prisma-client.mjs";
import { layananSuratSchema } from "../schema/layanan-surat-schema.mjs";

export const createLayananSurat = async (req) => {
  const { body } = req;
  const validation = layananSuratSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prisma.layananSurat.create({
    data: {
      namaPemohon: body.namaPemohon,
      jenisSurat: body.jenisSurat,
      keterangan: body.keterangan,
      status: body.status || "diajukan",
    },
  });
};

export const getAllLayananSurat = async () => {
  return await prisma.layananSurat.findMany({ orderBy: { tanggal: "desc" } });
};

export const getLayananSuratById = async (id) => {
  return await prisma.layananSurat.findUnique({ where: { id } });
};

export const updateLayananSurat = async (req) => {
  const { id } = req.params;
  const { body } = req;

  const validation = layananSuratSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prisma.layananSurat.update({
    where: { id },
    data: {
      namaPemohon: body.namaPemohon,
      jenisSurat: body.jenisSurat,
      keterangan: body.keterangan,
      status: body.status || "diajukan",
    },
  });
};

export const deleteLayananSurat = async (id) => {
  return await prisma.layananSurat.delete({ where: { id } });
};
