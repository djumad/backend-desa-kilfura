import prisma from "../database/prisma-client.mjs";
import { produkUnggulanSchema } from "../schema/produk-unggulan-schema.mjs";
import path from "path";
import fs from "fs/promises";

export const createProdukUnggulan = async (req) => {
  const { body, file } = req;
  const validation = produkUnggulanSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");
  if (!file) throw new Error("Foto produk wajib diunggah");

  const filePath = path.posix.join("produk-unggulan", file.filename);

  return await prisma.produkUnggulan.create({
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      harga: Number(body.harga),
      foto: filePath,
    },
  });
};

export const getAllProdukUnggulan = async () => {
  return await prisma.produkUnggulan.findMany({ orderBy: { nama: "asc" } });
};

export const getProdukUnggulanById = async (id) => {
  return await prisma.produkUnggulan.findUnique({ where: { id } });
};

export const updateProdukUnggulan = async (req) => {
  const { id } = req.params;
  const { body, file } = req;

  const existing = await prisma.produkUnggulan.findUnique({ where: { id } });
  if (!existing) throw new Error("Produk tidak ditemukan");

  const validation = produkUnggulanSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  let updateData = {
    nama: body.nama,
    deskripsi: body.deskripsi,
    harga: Number(body.harga),
  };

  if (file) {
    const oldPath = path.join("storage", existing.foto);
    try {
      await fs.unlink(oldPath);
    } catch (e) {}

    updateData.foto = path.posix.join("produk-unggulan", file.filename);
  }

  return await prisma.produkUnggulan.update({
    where: { id },
    data: updateData,
  });
};

export const deleteProdukUnggulan = async (id) => {
  const existing = await prisma.produkUnggulan.findUnique({ where: { id } });
  if (!existing) throw new Error("Produk tidak ditemukan");

  try {
    await fs.unlink(path.join("storage", existing.foto));
  } catch (e) {}

  return await prisma.produkUnggulan.delete({ where: { id } });
};
