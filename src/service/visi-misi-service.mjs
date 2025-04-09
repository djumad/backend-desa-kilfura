import prismaClient from "../database/prisma-client.mjs";
import path from "path";
import fs from "fs/promises";
import { visiMisiSchema } from "../schema/visi-misi-schema.mjs";

export const createVisiMisi = async (req) => {
  const body = req.body;
  const file = req.file;

  const validation = visiMisiSchema.safeParse(body);
  if (!validation.success) {
    throw new Error("Data tidak valid");
  }

  const fotoPath = file ? path.posix.join("visi-misi", file.filename) : null;

  return await prismaClient.visiMisi.create({
    data: {
      userId: req.user.id,
      judul: body.judul,
      deskripsi: body.deskripsi,
      foto: fotoPath,
    },
  });
};

export const getAllVisiMisi = async () => {
  return await prismaClient.visiMisi.findMany({
    include: { user: true },
  });
};

export const getVisiMisiById = async (id) => {
  return await prismaClient.visiMisi.findUnique({
    where: { id },
    include: { user: true },
  });
};

export const updateVisiMisi = async (req) => {
  const { id } = req.params;
  const body = req.body;
  const file = req.file;

  const existing = await prismaClient.visiMisi.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  const validation = visiMisiSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const updateData = {
    judul: body.judul,
    deskripsi: body.deskripsi,
  };

  if (file) {
    if (existing.foto) {
      const oldPath = path.join("storage", existing.foto);
      try {
        await fs.unlink(oldPath);
      } catch (err) {}
    }
    updateData.foto = path.posix.join("visi-misi", file.filename);
  }

  return await prismaClient.visiMisi.update({
    where: { id },
    data: updateData,
  });
};

export const deleteVisiMisi = async (id) => {
  const existing = await prismaClient.visiMisi.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.foto) {
    const pathFoto = path.join("storage", existing.foto);
    try {
      await fs.unlink(pathFoto);
    } catch (err) {}
  }

  return await prismaClient.visiMisi.delete({ where: { id } });
};
