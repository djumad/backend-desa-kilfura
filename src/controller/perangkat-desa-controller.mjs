import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
import {
  createPerangkatDesa,
  getAllPerangkatDesa,
  getPerangkatDesaById,
  updatePerangkatDesa,
  deletePerangkatDesa
} from "../service/perangkat-desa-service.mjs";

const perangkatDesaController = Router();

perangkatDesaController.post(
  "/api/perangkat-desa/create",
  dynamicUpload("profil", "perangkat-desa"),
  userMiddleware,
  async (req, res) => {
    try {
      const data = await createPerangkatDesa(req);
      res.json({ message: "Data berhasil ditambahkan", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

perangkatDesaController.get("/api/perangkat-desa", async (req, res) => {
  try {
    const data = await getAllPerangkatDesa();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

perangkatDesaController.get("/api/perangkat-desa/:id", async (req, res) => {
  try {
    const data = await getPerangkatDesaById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

perangkatDesaController.put(
  "/api/perangkat-desa/update/:id",
  dynamicUpload("profil", "perangkat-desa"),
  userMiddleware,
  async (req, res) => {
    try {
      const data = await updatePerangkatDesa(req);
      res.json({ message: "Data berhasil diupdate", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

perangkatDesaController.delete("/api/perangkat-desa/delete/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deletePerangkatDesa(req.params.id);
    res.json({ message: "Data berhasil dihapus", data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default perangkatDesaController;
