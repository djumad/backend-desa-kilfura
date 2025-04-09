import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import {
  createTransparansi,
  getAllTransparansi,
  getTransparansiById,
  updateTransparansi,
  deleteTransparansi,
} from "../service/transparansi-service.mjs";

const transparansiController = Router();

transparansiController.post("/api/transparansi", userMiddleware, async (req, res) => {
  try {
    const data = await createTransparansi(req);
    res.json({ message: "Data berhasil ditambahkan", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

transparansiController.get("/api/transparansi", async (req, res) => {
  try {
    const data = await getAllTransparansi();
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

transparansiController.get("/api/transparansi/:id", async (req, res) => {
  try {
    const data = await getTransparansiById(req.params.id);
    if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

transparansiController.put("/api/transparansi/:id", userMiddleware, async (req, res) => {
  try {
    const data = await updateTransparansi(req);
    res.json({ message: "Data berhasil diperbarui", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

transparansiController.delete("/api/transparansi/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deleteTransparansi(req.params.id);
    res.json({ message: "Data berhasil dihapus", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default transparansiController;
