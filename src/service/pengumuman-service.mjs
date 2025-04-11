import prismaClient from "../database/prisma-client.mjs";
import parseTanggal from "../lib/parseTanggal";
import { pengumumanSchema } from "../schema/pengumuman-schema.mjs";

export const createPengumuman = async (req) => {
  const body = req.body;

  const validation = pengumumanSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prismaClient.pengumuman.create({
    data: {
      judul: body.judul,
      isi: body.isi,
      tanggal: parseTanggal(body.tanggal),
    },
  });
};

export const getAllPengumuman = async (params) => {
  const { page = 1, limit = 10, sort = "desc" } = params;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prismaClient.pengumuman.findMany({
      skip: Number(skip),
      take: Number(limit),
      orderBy: { tanggal: sort === "asc" ? "asc" : "desc" },
    }),
    prismaClient.pengumuman.count(),
  ]);

  return {
    data,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const getPengumumanById = async (id) => {
  return await prismaClient.pengumuman.findUnique({ where: { id } });
};

export const updatePengumuman = async (req) => {
  const { id } = req.params;
  const body = req.body;

  const validation = pengumumanSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const existing = await prismaClient.pengumuman.findUnique({ where: { id } });
  if (!existing) throw new Error("Pengumuman tidak ditemukan");

  return await prismaClient.pengumuman.update({
    where: { id },
    data: {
      judul: body.judul,
      isi: body.isi,
      tanggal: parseTanggal(body.tanggal),
    },
  });
};

export const deletePengumuman = async (id) => {
  const existing = await prismaClient.pengumuman.findUnique({ where: { id } });
  if (!existing) throw new Error("Pengumuman tidak ditemukan");

  return await prismaClient.pengumuman.delete({ where: { id } });
};
