import prismaClient from "../database/prisma-client.mjs";
import parseTanggal from "../lib/parseTanggal.mjs";
import { agendaSchema } from "../schema/agenda-schema.mjs";

// Helper untuk memastikan tanggal valid

export const createAgenda = async (req) => {
  const body = req.body;

  const validation = agendaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  return await prismaClient.agenda.create({
    data: {
      judul: body.judul,
      lokasi: body.lokasi,
      deskripsi: body.deskripsi,
      tanggal: parseTanggal(body.tanggal),
    },
  });
};

export const getAllAgenda = async () => {
  return await prismaClient.agenda.findMany({ orderBy: { tanggal: "desc" } });
};

export const getAgendaById = async (id) => {
  return await prismaClient.agenda.findUnique({ where: { id } });
};

export const updateAgenda = async (req) => {
  const { id } = req.params;
  const body = req.body;

  const validation = agendaSchema.safeParse(body);
  if (!validation.success) throw new Error("Data tidak valid");

  const existing = await prismaClient.agenda.findUnique({ where: { id } });
  if (!existing) throw new Error("Agenda tidak ditemukan");

  return await prismaClient.agenda.update({
    where: { id },
    data: {
      judul: body.judul,
      lokasi: body.lokasi,
      deskripsi: body.deskripsi,
      tanggal: parseTanggal(body.tanggal),
    },
  });
};

export const deleteAgenda = async (id) => {
  const existing = await prismaClient.agenda.findUnique({ where: { id } });
  if (!existing) throw new Error("Agenda tidak ditemukan");

  return await prismaClient.agenda.delete({ where: { id } });
};
