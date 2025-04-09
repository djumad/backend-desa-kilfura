import { Router } from "express";
import {
  createKartuKeluarga,
  getAllKartuKeluarga,
  getKartuKeluargaById,
  updateKartuKeluarga,
  deleteKartuKeluarga,
} from "../service/kartu-keluarga-service.mjs";

const kartuKeluargaController = Router();

kartuKeluargaController.post("/api/kartu-keluarga", async (req, res) => {
  try {
    const data = await createKartuKeluarga(req);
    res.status(200).json({ message: "Kartu Keluarga berhasil dibuat", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

kartuKeluargaController.get("/api/kartu-keluarga", async (req, res) => {
  try {
    const data = await getAllKartuKeluarga();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

kartuKeluargaController.get("/api/kartu-keluarga/:id", async (req, res) => {
  try {
    const data = await getKartuKeluargaById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

kartuKeluargaController.put("/api/kartu-keluarga/:id", async (req, res) => {
  try {
    const data = await updateKartuKeluarga(req);
    res.status(200).json({ message: "Kartu Keluarga berhasil diperbarui", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

kartuKeluargaController.delete("/api/kartu-keluarga/:id", async (req, res) => {
  try {
    const data = await deleteKartuKeluarga(req.params.id);
    res.status(200).json({ message: "Kartu Keluarga berhasil dihapus", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default kartuKeluargaController;