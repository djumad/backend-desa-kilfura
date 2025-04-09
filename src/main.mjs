import express from "express";
import userController from "./controller/user-controller.mjs";
import profilDesaController from "./controller/profil-desa-controller.mjs";
import visiMisiController from "./controller/visi-misi-controller.mjs";
import perangkatDesaController from "./controller/perangkat-desa-controller.mjs";
import kontakDesaController from "./controller/kontak-desa-controller.mjs";
import galeriController from "./controller/galeri-controller.mjs";
import agendaController from "./controller/agenda-controller.mjs";
import pengumumanController from "./controller/pengumuman-controller.mjs";
import transparansiController from "./controller/transparansi-controller.mjs";
import produkUnggulanController from "./controller/produk-unggulan-controller.mjs";
import dataPendudukController from "./controller/data-penduduk-controller.mjs";
import kartuKeluargaController from "./controller/kartu-keluarga-controller.mjs";

const web = express();

web.use(express.json());
web.use(userController);
web.use(profilDesaController);
web.use(visiMisiController);
web.use(perangkatDesaController);
web.use(kontakDesaController);
web.use(galeriController);
web.use(agendaController);
web.use(pengumumanController);
web.use(transparansiController);
web.use(produkUnggulanController);
web.use(dataPendudukController);
web.use(kartuKeluargaController);

web.use("/storage", express.static("storage"))

export default web;