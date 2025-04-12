import { Router } from "express";
import { 
  getAllPotensiDesa, 
  getPotensiDesaById, 
  createPotensiDesa, 
  updatePotensiDesa, 
  deletePotensiDesa 
} from "../service/potensi-desa-service.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
import userMiddleware  from "../middleware/user-middleware.mjs";

const potensiDesaController = Router();

potensiDesaController.get("/api/potensi-desa", async (req, res) => {
  try {
    const data = await getAllPotensiDesa();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

potensiDesaController.get("/api/potensi-desa/:id", async (req, res) => {
  try {
    const data = await getPotensiDesaById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

potensiDesaController.post(
  "/api/potensi-desa",
  userMiddleware,
  dynamicUpload("foto", "potensi-desa"),
  async (req, res) => {
    try {
      const data = await createPotensiDesa(req.body, req.file);
      res.status(201).json({ message: "Data berhasil ditambahkan", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

potensiDesaController.put(
  "/api/potensi-desa/:id",
  userMiddleware,
  dynamicUpload("foto", "potensi-desa"),
  async (req, res) => {
    try {
      const data = await updatePotensiDesa(req.params.id, req.body, req.file);
      res.json({ message: "Data berhasil diperbarui", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

potensiDesaController.delete("/api/potensi-desa/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deletePotensiDesa(req.params.id);
    res.json({ message: "Data berhasil dihapus", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default potensiDesaController;