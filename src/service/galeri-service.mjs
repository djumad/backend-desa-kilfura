import prismaClient from "../database/prisma-client.mjs";
import { galeriSchema } from "../schema/galeri-schema.mjs";
import path from "path";
import fs from "fs/promises";
import parseTanggal from "../lib/parseTanggal";


export const createGaleri = async (req) => {
  const { body, file } = req;
  const validation = galeriSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  if (!file) throw new Error("Foto wajib diunggah");

  const filePath = path.posix.join("galeri", file.filename);

  return await prismaClient.galeri.create({
    data: {
      judul: body.judul,
      deskripsi: body.deskripsi,
      foto: filePath,
      tanggal: parseTanggal(body.tanggal),
    },
  });
};

export const getAllGaleri = async () => {
  return await prismaClient.galeri.findMany({ orderBy: { tanggal: "desc" } });
};

export const getGaleriById = async (id) => {
  return await prismaClient.galeri.findUnique({ where: { id } });
};

export const updateGaleri = async (req) => {
  const { id } = req.params;
  const { body, file } = req;

  const existing = await prismaClient.galeri.findUnique({ where: { id } });
  if (!existing) throw new Error("Galeri tidak ditemukan");

  const validation = galeriSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const updateData = {
    judul: body.judul,
    deskripsi: body.deskripsi,
    tanggal: parseTanggal(body.tanggal),
  };

  if (file) {
    const oldPath = path.join("storage", existing.foto);
    try {
      await fs.unlink(oldPath);
    } catch {}

    updateData.foto = path.posix.join("galeri", file.filename);
  }

  return await prismaClient.galeri.update({
    where: { id },
    data: updateData,
  });
};

export const deleteGaleri = async (id) => {
  const existing = await prismaClient.galeri.findUnique({ where: { id } });
  if (!existing) throw new Error("Galeri tidak ditemukan");

  const fotoPath = path.join("storage", existing.foto);
  try {
    await fs.unlink(fotoPath);
  } catch {}

  return await prismaClient.galeri.delete({ where: { id } });
};
