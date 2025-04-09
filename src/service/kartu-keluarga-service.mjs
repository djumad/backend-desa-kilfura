import prismaClient from "../database/prisma-client.mjs";
import { kartuKeluargaSchema } from "../schema/kartu-keluarga-schema.mjs";

export const createKartuKeluarga = async (req) => {
  const body = req.body;

  const validation = kartuKeluargaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prismaClient.kartuKeluarga.create({
    data: body,
  });
};

export const getAllKartuKeluarga = async () => {
  return await prismaClient.kartuKeluarga.findMany({
    include: {
      kepalaKeluarga: true,
      anggota: true,
    },
  });
};

export const getKartuKeluargaById = async (id) => {
  return await prismaClient.kartuKeluarga.findUnique({
    where: { id },
    include: {
      kepalaKeluarga: true,
      anggota: true,
    },
  });
};

export const updateKartuKeluarga = async (req) => {
  const { id } = req.params;
  const body = req.body;

  const validation = kartuKeluargaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prismaClient.kartuKeluarga.update({
    where: { id },
    data: body,
  });
};

export const deleteKartuKeluarga = async (id) => {
  return await prismaClient.kartuKeluarga.delete({
    where: { id },
  });
};