import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
import {
    createProfilDesa,
    getAllProfilDesa,
    getProfilDesaById,
    updateProfilDesa,
    deleteProfilDesa,
} from "../service/profil-desa-service.mjs";

const profilDesaController = Router();

// 🔹 CREATE
profilDesaController.post(
    "/api/profil-desa/create",
    dynamicUpload("logo", "profil-desa"),
    userMiddleware,
    async (req, res) => {
        try {
            const data = await createProfilDesa(req);
            res.status(200).json({
                message: "Profil desa berhasil dibuat",
                data,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// 🔹 READ ALL
profilDesaController.get(
    "/api/profil-desa",
    async (req, res) => {
        try {
            const data = await getAllProfilDesa();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// 🔹 READ BY ID
profilDesaController.get(
    "/api/profil-desa/:id",
    async (req, res) => {
        try {
            const data = await getProfilDesaById(req.params.id);
            if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// 🔹 UPDATE
profilDesaController.put(
    "/api/profil-desa/:id",
    dynamicUpload("logo", "profil-desa"),
    userMiddleware,
    async (req, res) => {
        try {
            const data = await updateProfilDesa(req);
            res.status(200).json({
                message: "Profil desa berhasil diperbarui",
                data,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// 🔹 DELETE
profilDesaController.delete(
    "/api/profil-desa/:id",
    userMiddleware,
    async (req, res) => {
        try {
            const data = await deleteProfilDesa(req.params.id);
            res.status(200).json({
                message: "Profil desa berhasil dihapus",
                data,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

export default profilDesaController;
