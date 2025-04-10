import prismaClient from "../database/prisma-client.mjs";
import path from "path";
import fs from "fs/promises";
import { sejarahDesaSchema } from "../schema/sejarah-desa-schema.mjs";

export const createSejarahDesa = async (req) => {
  const body = req.body;
  const file = req.file;

  const validation = sejarahDesaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const fotoPath = file ? path.posix.join("sejarah-desa", file.filename) : null;

  return await prismaClient.sejarahDesa.create({
    data: {
      userId: req.user.id,
      judul: body.judul,
      deskripsi: body.deskripsi,
      foto: fotoPath,
    },
  });
};

export const getAllSejarahDesa = async () => {
  return await prismaClient.sejarahDesa.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
};

export const getSejarahDesaById = async (id) => {
  return await prismaClient.sejarahDesa.findUnique({ where: { id } });
};

export const updateSejarahDesa = async (req) => {
  const { id } = req.params;
  const body = req.body;
  const file = req.file;

  const validation = sejarahDesaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const existing = await prismaClient.sejarahDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Data sejarah tidak ditemukan");

  if (file && existing.foto) {
    const oldPath = path.join("storage", existing.foto);
    try {
      await fs.unlink(oldPath);
    } catch (e) {
      console.warn("Gagal menghapus file lama:", e.message);
    }
  }

  const updateData = {
    judul: body.judul,
    deskripsi: body.deskripsi,
    foto: file ? path.posix.join("sejarah-desa", file.filename) : existing.foto,
  };

  return await prismaClient.sejarahDesa.update({
    where: { id },
    data: updateData,
  });
};

export const deleteSejarahDesa = async (id) => {
  const existing = await prismaClient.sejarahDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Data sejarah tidak ditemukan");

  if (existing.foto) {
    const filePath = path.join("storage", existing.foto);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.warn("Gagal menghapus file:", e.message);
    }
  }

  return await prismaClient.sejarahDesa.delete({ where: { id } });
};
