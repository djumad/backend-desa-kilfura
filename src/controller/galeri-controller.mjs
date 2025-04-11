import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
import {
  createGaleri,
  getAllGaleri,
  getGaleriById,
  updateGaleri,
  deleteGaleri
} from "../service/galeri-service.mjs";

const galeriController = Router();

galeriController.post(
  "/api/galeri/create",
  dynamicUpload("foto", "galeri"),
  userMiddleware,
  async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
      const data = await createGaleri(req);
      res.json({ message: "Galeri berhasil ditambahkan", data });
    } catch (e) {
      res.status(400).json({ error: e.message });
      console.log(e.message);
    }
  }
);

galeriController.get("/api/galeri", async (req, res) => {
  const data = await getAllGaleri();
  res.json(data);
});

galeriController.get("/api/galeri/:id", async (req, res) => {
  try {
    const data = await getGaleriById(req.params.id);
    if (!data) return res.status(404).json({ error: "Galeri tidak ditemukan" });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

galeriController.put(
  "/api/galeri/:id",
  dynamicUpload("foto", "galeri"),
  userMiddleware,
  async (req, res) => {
    try {
      const data = await updateGaleri(req);
      res.json({ message: "Galeri berhasil diperbarui", data });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

galeriController.delete("/api/galeri/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deleteGaleri(req.params.id);
    res.json({ message: "Galeri berhasil dihapus", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default galeriController;
