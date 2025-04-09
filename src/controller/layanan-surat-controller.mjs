import { Router } from "express";
import {
  createLayananSurat,
  getAllLayananSurat,
  getLayananSuratById,
  updateLayananSurat,
  deleteLayananSurat,
} from "../service/layanan-surat-service.mjs";

const router = Router();

router.post("/api/layanan-surat", async (req, res) => {
  try {
    const data = await createLayananSurat(req);
    res.json({ message: "Surat berhasil diajukan", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/api/layanan-surat", async (req, res) => {
  const data = await getAllLayananSurat();
  res.json(data);
});

router.get("/api/layanan-surat/:id", async (req, res) => {
  try {
    const data = await getLayananSuratById(req.params.id);
    if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/api/layanan-surat/:id", async (req, res) => {
  try {
    const data = await updateLayananSurat(req);
    res.json({ message: "Surat berhasil diperbarui", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/api/layanan-surat/:id", async (req, res) => {
  try {
    await deleteLayananSurat(req.params.id);
    res.json({ message: "Surat berhasil dihapus" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
