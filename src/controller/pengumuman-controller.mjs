import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import {
  createPengumuman,
  getAllPengumuman,
  getPengumumanById,
  updatePengumuman,
  deletePengumuman
} from "../service/pengumuman-service.mjs";

const pengumumanController = Router();

pengumumanController.post("/api/pengumuman/create", userMiddleware, async (req, res) => {
  try {
    const data = await createPengumuman(req);
    res.json({ message: "Pengumuman berhasil dibuat", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

pengumumanController.get("/api/pengumuman", async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const data = await getAllPengumuman({ page, limit, sort });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

pengumumanController.get("/api/pengumuman/:id", async (req, res) => {
  try {
    const data = await getPengumumanById(req.params.id);
    if (!data) return res.status(404).json({ error: "Pengumuman tidak ditemukan" });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

pengumumanController.put("/api/pengumuman/:id", userMiddleware, async (req, res) => {
  try {
    const data = await updatePengumuman(req);
    res.json({ message: "Pengumuman berhasil diperbarui", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

pengumumanController.delete("/api/pengumuman/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deletePengumuman(req.params.id);
    res.json({ message: "Pengumuman berhasil dihapus", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default pengumumanController;