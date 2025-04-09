import { Router } from "express";
import {
  createDataPenduduk,
  getAllDataPenduduk,
  getDataPendudukById,
  updateDataPenduduk,
  deleteDataPenduduk,
} from "../service/data-penduduk-service.mjs";

const dataPendudukController = Router();

dataPendudukController.get("/api/data-penduduk", async (req, res) => {
  try {
    const data = await getAllDataPenduduk();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dataPendudukController.get("/api/data-penduduk/:id", async (req, res) => {
  try {
    const data = await getDataPendudukById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

dataPendudukController.post("/api/data-penduduk", async (req, res) => {
  try {
    const data = await createDataPenduduk(req);
    res.status(201).json({ message: "Data berhasil ditambahkan", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dataPendudukController.put("/api/data-penduduk/:id", async (req, res) => {
  try {
    const data = await updateDataPenduduk(req);
    res.json({ message: "Data berhasil diupdate", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dataPendudukController.delete("/api/data-penduduk/:id", async (req, res) => {
  try {
    await deleteDataPenduduk(req.params.id);
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default dataPendudukController;
