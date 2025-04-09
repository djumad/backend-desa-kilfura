import prisma from "../database/prisma-client.mjs";
import { dataPendudukSchema } from "../schema/data-penduduk-schema.mjs";

export const createDataPenduduk = async (req) => {
  const validation = dataPendudukSchema.safeParse(req.body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prisma.dataPenduduk.create({
    data: validation.data,
  });
};

export const getAllDataPenduduk = async () => {
  return await prisma.dataPenduduk.findMany({
    include: { kartuKeluarga: true },
  });
};

export const getDataPendudukById = async (id) => {
  return await prisma.dataPenduduk.findUnique({
    where: { id },
    include: { kartuKeluarga: true },
  });
};

export const updateDataPenduduk = async (req) => {
  const { id } = req.params;
  const validation = dataPendudukSchema.safeParse(req.body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prisma.dataPenduduk.update({
    where: { id },
    data: validation.data,
  });
};

export const deleteDataPenduduk = async (id) => {
  return await prisma.dataPenduduk.delete({ where: { id } });
};
