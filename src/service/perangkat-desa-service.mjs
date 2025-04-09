import prismaClient from "../database/prisma-client.mjs";
import { perangkatDesaSchema } from "../schema/perangkat-desa-schema.mjs";
import path from "path";
import fs from "fs/promises";

export const createPerangkatDesa = async (req) => {
  const body = req.body;
  const file = req.file;

  const validation = perangkatDesaSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  if (!file) {
    throw new Error("Foto profil wajib diunggah");
  }

  const filePath = path.posix.join("perangkat-desa", file.filename);

  return await prismaClient.perangkatDesa.create({
    data: {
      userId: req.user.id,
      nama: body.nama,
      status: body.status,
      profil: filePath,
    },
  });
};

export const getAllPerangkatDesa = async () => {
  return await prismaClient.perangkatDesa.findMany({
    include: { user: true },
  });
};

export const getPerangkatDesaById = async (id) => {
  return await prismaClient.perangkatDesa.findUnique({
    where: { id },
    include: { user: true },
  });
};

export const updatePerangkatDesa = async (req) => {
  const { id } = req.params;
  const body = req.body;
  const file = req.file;

  const validation = perangkatDesaSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  const existing = await prismaClient.perangkatDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  const updateData = {
    nama: body.nama,
    status: body.status,
  };

  if (file) {
    const oldPath = path.join("storage", existing.profil);
    try {
      await fs.unlink(oldPath);
    } catch {}

    updateData.profil = path.posix.join("perangkat-desa", file.filename);
  }

  return await prismaClient.perangkatDesa.update({
    where: { id },
    data: updateData,
  });
};

export const deletePerangkatDesa = async (id) => {
  const existing = await prismaClient.perangkatDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.profil) {
    const filePath = path.join("storage", existing.profil);
    try {
      await fs.unlink(filePath);
    } catch {}
  }

  return await prismaClient.perangkatDesa.delete({ where: { id } });
};
