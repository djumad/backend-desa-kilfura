import { Router } from "express";
import {
  createVisiMisi,
  getAllVisiMisi,
  getVisiMisiById,
  updateVisiMisi,
  deleteVisiMisi,
} from "../service/visi-misi-service.mjs";
import userMiddleware from "../middleware/user-middleware.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";

const visiMisiController = Router();

visiMisiController.post(
  "/api/visi-misi/create",
  dynamicUpload("foto", "visi-misi"),
  userMiddleware,
  async (req, res) => {
    try {
      const data = await createVisiMisi(req);
      res.json({ message: "Data berhasil ditambahkan", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

visiMisiController.get("/api/visi-misi", async (req, res) => {
  try {
    const data = await getAllVisiMisi();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

visiMisiController.get("/api/visi-misi/:id", async (req, res) => {
  try {
    const data = await getVisiMisiById(req.params.id);
    if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

visiMisiController.put(
  "/api/visi-misi/:id",
  dynamicUpload("foto", "visi-misi"),
  userMiddleware,
  async (req, res) => {
    try {
      const data = await updateVisiMisi(req);
      res.json({ message: "Data berhasil diperbarui", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

visiMisiController.delete("/api/visi-misi/:id", userMiddleware, async (req, res) => {
  try {
    await deleteVisiMisi(req.params.id);
    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default visiMisiController;