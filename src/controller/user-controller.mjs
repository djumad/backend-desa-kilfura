import {Router} from "express";
import {login, logoutUser, registrasi, updateUser} from "../service/user-service.mjs";
import { ResponseException } from "../schema/response.mjs";
import userMiddeware from "../middleware/user-middleware.mjs";
import { dynamicUpload } from "../middleware/upload-middleware.mjs";
const userController = Router();

userController.post("/api/users/registrasi" , async(req , res)=>{
    try {
        const user = await registrasi(req.body);
        return res.status(201).json({
            message: "Registrasi berhasil",
            data: user
        });
    } catch (err) {
        if (err instanceof ResponseException) {
            return res.status(err.status).json({ error: err.detail });
        }
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

userController.post("/api/users/login", async(req , res)=>{
    try {
        const user = await login(req.body);
        return res.status(201).json({
            message : "Login berhasil",
            data : user
        })
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Email dan password salah" });
    }
});

userController.get("/api/users/profile" , userMiddeware , async(req , res)=>{
    res.status(200).json({
        message : "Profile di temukan",
        data : req.user
    });
});

userController.delete("/api/users/logout" , userMiddeware , async(req , res)=>{
    try {
        await logoutUser(req.user.email);

        res.status(200).json({
            message : "Logout success"
        })
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

userController.put(
    "/api/users/update",
    dynamicUpload("foto", "user"), // ✅ HARUS SEBELUM middleware lainnya
    userMiddeware,
    async (req, res) => {
      try {
        console.log({
          id: req.user.id,
          email: req.body.email,
          nama: req.body.nama,
          foto: req.file, // ✅ cek langsung req.file
        });
  
        const data = await updateUser(req);
        res.status(200).json({
          message: "User berhasil diperbarui",
          data,
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );
  

export default userController;