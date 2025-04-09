import prismaClient from "../database/prisma-client.mjs";
import { lembagaDesaSchema } from "../schema/lembaga-desa-schema.mjs";
import path from "path";
import fs from "fs/promises";

export const createLembagaDesa = async (req) => {
  const body = req.body;
  const file = req.file;

  const validation = lembagaDesaSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  const foto = file ? path.posix.join("lembaga-desa", file.filename) : null;

  return await prismaClient.lembagaDesa.create({
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      foto,
    },
  });
};

export const getAllLembagaDesa = async () => {
  return await prismaClient.lembagaDesa.findMany();
};

export const getLembagaDesaById = async (id) => {
  return await prismaClient.lembagaDesa.findUnique({ where: { id } });
};

export const updateLembagaDesa = async (req) => {
  const { id } = req.params;
  const body = req.body;
  const file = req.file;

  const validation = lembagaDesaSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  const existing = await prismaClient.lembagaDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Lembaga tidak ditemukan");

  const updateData = {
    nama: body.nama,
    deskripsi: body.deskripsi,
  };

  if (file) {
    if (existing.foto) {
      const oldPath = path.join("storage", existing.foto);
      try {
        await fs.unlink(oldPath);
      } catch {}
    }
    updateData.foto = path.posix.join("lembaga-desa", file.filename);
  }

  return await prismaClient.lembagaDesa.update({
    where: { id },
    data: updateData,
  });
};

export const deleteLembagaDesa = async (id) => {
  const existing = await prismaClient.lembagaDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Lembaga tidak ditemukan");

  if (existing.foto) {
    const fotoPath = path.join("storage", existing.foto);
    try {
      await fs.unlink(fotoPath);
    } catch {}
  }

  return await prismaClient.lembagaDesa.delete({ where: { id } });
};
