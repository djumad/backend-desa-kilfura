// prodil-desa-service.mjs
import prismaClient from "../database/prisma-client.mjs";
import { profilDesaSchema } from "../schema/profil-desa-schema.mjs"
import path from "path";
import fs from "fs/promises";


export const createProfilDesa = async (req) => {
    const body = req.body;
    const file = req.file; // ✅ ini sudah betul

    const validation = profilDesaSchema.safeParse(body);
    if (!validation.success) {
        throw new Error("Data tidak valid");
    }

    if (!file) throw new Error("Logo wajib diunggah");

    const filePath = path.posix.join("profil-desa", file.filename); // ⬅️ gunakan path.posix agar tetap "/" di semua OS

    return await prismaClient.profilDesa.create({
        data: {
            userId: req.user.id,
            namaDesa: body.namaDesa, // ⬅️ pastikan ambil field namaDesa, bukan seluruh body
            logo: filePath
        }
    });
};

export const getAllProfilDesa = async () => {
    return await prismaClient.profilDesa.findMany({
        select : {
            id : true,
            namaDesa : true,
            logo : true
        }
    });
};

export const getProfilDesaById = async (id) => {
    return await prismaClient.profilDesa.findUnique({
        where: { id },
        select : {
            id : true,
            namaDesa : true,
            logo : true
        }
    });
};

export const updateProfilDesa = async (req) => {
    const { id } = req.params;
    const body = req.body;
    const file = req.file;

    const validation = profilDesaSchema.safeParse(body);
    if (!validation.success) {
        throw new Error("Data tidak valid");
    }

    const existing = await prismaClient.profilDesa.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("Profil desa tidak ditemukan");
    }

    const updateData = {
        namaDesa: body.namaDesa,
    };

    if (file) {
        if (existing.logo) {
            const oldPath = path.join("storage", existing.logo);
            try {
                await fs.unlink(oldPath);
            } catch (err) {
                // File mungkin sudah tidak ada, jadi kita log saja
                console.warn("Gagal hapus logo lama:", err.message);
            }
        }

        updateData.logo = path.posix.join("profil-desa", file.filename);
    }

    return await prismaClient.profilDesa.update({
        where: { id },
        data: updateData,
    });
};


export const deleteProfilDesa = async (id) => {
    const existing = await prismaClient.profilDesa.findUnique({ where: { id } });
    if (!existing) throw new Error("Profil desa tidak ditemukan");

    if (existing.logo) {
        const logoPath = path.join("storage", existing.logo);
        try {
            await fs.unlink(logoPath);
        } catch (err) {
            console.warn("Gagal hapus logo:", err.message);
        }
    }

    return await prismaClient.profilDesa.delete({
        where: { id },
    });
};

