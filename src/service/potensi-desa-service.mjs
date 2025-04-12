import prismaClient from "../database/prisma-client.mjs";
import { potensiDesaSchema } from "../schema/potensi-desa-schema.mjs";
import path from "path";
import fs from "fs/promises";

export const getAllPotensiDesa = async () => {
  return await prismaClient.potensiDesa.findMany();
};

export const getPotensiDesaById = async (id) => {
  return await prismaClient.potensiDesa.findUnique({ where: { id } });
};

export const createPotensiDesa = async (body, file) => {
  const validation = potensiDesaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  let data = {
    kategori: body.kategori,
    nama: body.nama,
    deskripsi: body.deskripsi,
  };

  if (file) {
    data.foto = path.posix.join("potensi-desa", file.filename);
  }

  return await prismaClient.potensiDesa.create({ data });
};

export const updatePotensiDesa = async (id, body, file) => {
  const validation = potensiDesaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const existing = await prismaClient.potensiDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  let data = {
    kategori: body.kategori,
    nama: body.nama,
    deskripsi: body.deskripsi,
  };

  if (file) {
    if (existing.foto) {
      const oldPath = path.join("storage", existing.foto);
      try {
        await fs.unlink(oldPath);
      } catch (err) {
        console.warn("Gagal menghapus foto lama:", err.message);
      }
    }
    data.foto = path.posix.join("potensi-desa", file.filename);
  }

  return await prismaClient.potensiDesa.update({
    where: { id },
    data,
  });
};

export const deletePotensiDesa = async (id) => {
  const existing = await prismaClient.potensiDesa.findUnique({ where: { id } });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.foto) {
    const filePath = path.join("storage", existing.foto);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn("Gagal menghapus foto:", err.message);
    }
  }

  return await prismaClient.potensiDesa.delete({ where: { id } });
};