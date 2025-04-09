import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import {
  createKontakDesa,
  getAllKontakDesa,
  getKontakDesaById,
  updateKontakDesa,
  deleteKontakDesa,
} from "../service/kontak-desa-service.mjs";

const kontakDesaController = Router();

kontakDesaController.post("/api/kontak-desa/create", userMiddleware, async (req, res) => {
  try {
    const data = await createKontakDesa(req);
    res.status(201).json({ message: "Kontak berhasil ditambahkan", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

kontakDesaController.get("/api/kontak-desa", async (req, res) => {
  try {
    const data = await getAllKontakDesa();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

kontakDesaController.get("/api/kontak-desa/:id", async (req, res) => {
  try {
    const data = await getKontakDesaById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

kontakDesaController.put("/api/kontak-desa/update/:id", userMiddleware, async (req, res) => {
  try {
    const data = await updateKontakDesa(req);
    res.json({ message: "Kontak berhasil diupdate", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

kontakDesaController.delete("/api/kontak-desa/delete/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deleteKontakDesa(req.params.id);
    res.json({ message: "Kontak berhasil dihapus", data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default kontakDesaController;
