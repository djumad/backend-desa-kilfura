import prismaClient from "../database/prisma-client.mjs";
import { kontakDesaSchema } from "../schema/kontak-desa-schema.mjs";

export const createKontakDesa = async (req) => {
  const body = req.body;

  const validation = kontakDesaSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  return await prismaClient.kontakDesa.create({
    data: body,
  });
};

export const getAllKontakDesa = async () => {
  return await prismaClient.kontakDesa.findMany();
};

export const getKontakDesaById = async (id) => {
  return await prismaClient.kontakDesa.findUnique({ where: { id } });
};

export const updateKontakDesa = async (req) => {
  const { id } = req.params;
  const body = req.body;

  const validation = kontakDesaSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  const existing = await prismaClient.kontakDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Kontak tidak ditemukan");

  return await prismaClient.kontakDesa.update({
    where: { id },
    data: body,
  });
};

export const deleteKontakDesa = async (id) => {
  const existing = await prismaClient.kontakDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Kontak tidak ditemukan");

  return await prismaClient.kontakDesa.delete({ where: { id } });
};
