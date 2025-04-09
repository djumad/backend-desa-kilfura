import { Router } from "express";
import {
  createProdukUnggulan,
  getAllProdukUnggulan,
  getProdukUnggulanById,
  updateProdukUnggulan,
  deleteProdukUnggulan,
} from "../service/produk-unggulan-service.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";

const produkUnggulanController = Router();

produkUnggulanController.post(
  "/api/produk-unggulan",
  dynamicUpload("foto", "produk-unggulan"),
  async (req, res) => {
    try {
      const data = await createProdukUnggulan(req);
      res.json({ message: "Produk berhasil dibuat", data });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

produkUnggulanController.get("/api/produk-unggulan", async (req, res) => {
  const data = await getAllProdukUnggulan();
  res.json(data);
});

produkUnggulanController.get("/api/produk-unggulan/:id", async (req, res) => {
  try {
    const data = await getProdukUnggulanById(req.params.id);
    if (!data) return res.status(404).json({ error: "Tidak ditemukan" });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

produkUnggulanController.put(
  "/api/produk-unggulan/:id",
  dynamicUpload("foto", "produk-unggulan"),
  async (req, res) => {
    try {
      const data = await updateProdukUnggulan(req);
      res.json({ message: "Produk berhasil diubah", data });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

produkUnggulanController.delete("/api/produk-unggulan/:id", async (req, res) => {
  try {
    await deleteProdukUnggulan(req.params.id);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default produkUnggulanController;
