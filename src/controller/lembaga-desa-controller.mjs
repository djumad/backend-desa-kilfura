import { Router } from "express";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
import userMiddleware from "../middleware/user-middleware.mjs";
import {
  createLembagaDesa,
  getAllLembagaDesa,
  getLembagaDesaById,
  updateLembagaDesa,
  deleteLembagaDesa,
} from "../service/lembaga-desa-service.mjs";

const lembagaDesaController = Router();

lembagaDesaController.post(
  "/api/lembaga-desa/create",
  userMiddleware,
  dynamicUpload("foto", "lembaga-desa"),
  async (req, res) => {
    try {
      const data = await createLembagaDesa(req);
      res.status(201).json({ message: "Lembaga berhasil ditambahkan", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

lembagaDesaController.get("/api/lembaga-desa", async (req, res) => {
  try {
    const data = await getAllLembagaDesa();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

lembagaDesaController.get("/api/lembaga-desa/:id", async (req, res) => {
  try {
    const data = await getLembagaDesaById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

lembagaDesaController.put(
  "/api/lembaga-desa/update/:id",
  userMiddleware,
  dynamicUpload("foto", "lembaga-desa"),
  async (req, res) => {
    try {
      const data = await updateLembagaDesa(req);
      res.json({ message: "Lembaga berhasil diupdate", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

lembagaDesaController.delete("/api/lembaga-desa/delete/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deleteLembagaDesa(req.params.id);
    res.json({ message: "Lembaga berhasil dihapus", data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default lembagaDesaController;
