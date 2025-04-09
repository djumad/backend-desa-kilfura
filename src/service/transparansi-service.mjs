import prismaClient from "../database/prisma-client.mjs";
import { transparansiSchema } from "../schema/transparansi-schema.mjs";

export const createTransparansi = async (req) => {
  const body = req.body;
  const validation = transparansiSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prismaClient.transparansiAnggaran.create({
    data: {
      tahun: Number(body.tahun),
      pendapatan: Number(body.pendapatan),
      belanja: Number(body.belanja),
      rincian: body.rincian,
    },
  });
};

export const getAllTransparansi = async () => {
  return await prismaClient.transparansiAnggaran.findMany({
    orderBy: { tahun: "desc" },
  });
};

export const getTransparansiById = async (id) => {
  return await prismaClient.transparansiAnggaran.findUnique({ where: { id } });
};

export const updateTransparansi = async (req) => {
  const { id } = req.params;
  const body = req.body;

  const validation = transparansiSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const existing = await prismaClient.transparansiAnggaran.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  return await prismaClient.transparansiAnggaran.update({
    where: { id },
    data: {
      tahun: Number(body.tahun),
      pendapatan: Number(body.pendapatan),
      belanja: Number(body.belanja),
      rincian: body.rincian,
    },
  });
};

export const deleteTransparansi = async (id) => {
  const existing = await prismaClient.transparansiAnggaran.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  return await prismaClient.transparansiAnggaran.delete({ where: { id } });
};
