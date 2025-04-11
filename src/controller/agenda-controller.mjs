import { Router } from "express";
import userMiddleware from "../middleware/user-middleware.mjs";
import {
  createAgenda,
  getAllAgenda,
  getAgendaById,
  updateAgenda,
  deleteAgenda
} from "../service/agenda-service.mjs";

const agendaController = Router();

agendaController.post("/api/agenda/create", userMiddleware, async (req, res) => {
  console.log(req.body);
  try {
    const data = await createAgenda(req);
    res.json({ message: "Agenda berhasil dibuat", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
    console.log({error: e.message});
  }
});

agendaController.get("/api/agenda", async (req, res) => {
  const data = await getAllAgenda();
  res.json(data);
});

agendaController.get("/api/agenda/:id", async (req, res) => {
  try {
    const data = await getAgendaById(req.params.id);
    if (!data) return res.status(404).json({ error: "Agenda tidak ditemukan" });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

agendaController.put("/api/agenda/:id", userMiddleware, async (req, res) => {
  try {
    const data = await updateAgenda(req);
    res.json({ message: "Agenda berhasil diperbarui", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

agendaController.delete("/api/agenda/:id", userMiddleware, async (req, res) => {
  try {
    const data = await deleteAgenda(req.params.id);
    res.json({ message: "Agenda berhasil dihapus", data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default agendaController;
