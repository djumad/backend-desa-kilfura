import { Router } from "express";
import { createSejarahDesa, getAllSejarahDesa, getSejarahDesaById, updateSejarahDesa, deleteSejarahDesa } from "../service/sejarah-desa-service.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
import userMiddleware from "../middleware/user-middleware.mjs";

const sejarahDesaController = Router();

sejarahDesaController.post(
  "/api/sejarah-desa/create",
  userMiddleware,
  dynamicUpload("foto", "sejarah-desa"),
  async (req, res) => {
    try {
      const data = await createSejarahDesa(req);
      res.json({ message: "Data sejarah desa berhasil dibuat", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

sejarahDesaController.get("/api/sejarah-desa", async (_, res) => {
  try {
    const data = await getAllSejarahDesa();
    res.json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

sejarahDesaController.get("/api/sejarah-desa/:id", async (req, res) => {
  try {
    const data = await getSejarahDesaById(req.params.id);
    res.json({ data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

sejarahDesaController.put(
  "/api/sejarah-desa/:id",
  userMiddleware,
  dynamicUpload("foto", "sejarah-desa"),
  async (req, res) => {
    try {
      const data = await updateSejarahDesa(req);
      res.json({ message: "Data berhasil diperbarui", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

sejarahDesaController.delete("/api/sejarah-desa/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deleteSejarahDesa(req.params.id);
    res.json({ message: "Data berhasil dihapus", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default sejarahDesaController;
