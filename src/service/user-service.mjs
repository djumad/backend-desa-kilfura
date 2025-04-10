import prismaClient from "../database/prisma-client.mjs";
import { ResponseException } from "../schema/response.mjs";
import { userEmail, userRequestLogin, userRequestRegistrasi, userToken, userUpdateSchema } from "../schema/user-schema.mjs";
import bcrypt from "bcrypt";
import path from "path";
import {v4 as uuid} from "uuid";

export const registrasi = async (request) => {

    const input = userRequestRegistrasi.safeParse(request);
    if (!input.success) {
        throw new ResponseException(400, "Input tidak valid");
    }

    const cekUser = await prismaClient.user.findUnique({
        where: { email: input.data.email },
    });
    if (cekUser) {
        throw new ResponseException(400, "Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(input.data.password, 10);

    const newUser = await prismaClient.user.create({
        data: {
            nama: input.data.nama,
            email: input.data.email,
            password: hashedPassword,
        },
    });

    return {
        nama: newUser.nama,
        email: newUser.email,
    };
};

export const login = async (request)=>{
    const input = userRequestLogin.safeParse(request);
    
    if (!input.success) {
        throw new ResponseException(400, "Input tidak valid");
    }

    const user = await prismaClient.user.findFirst({
        where : {
            email : input.data.email
        }
    });

    if(!user){
        throw new ResponseException(400, "email dan password salah");
    }

    const cekPassword = await bcrypt.compare(input.data.password , user.password);
    
    if(!cekPassword){
        throw new ResponseException(400, "email dan password salah");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data : {
            token : token,
        },
        where : {
            email : user.email
        },
        select : {
            token : true
        }
    });
}

export const get = async(token)=>{
    const input = userToken.safeParse(token);
    
    if(!input.success){
        throw new ResponseException(401 , "Unauthorize");
    }

    const user = await prismaClient.user.findFirst({
        where : {
            token : input.data,
            NOT: { token: null },   
        }
    });

    if(!user){
        throw new ResponseException(401 , "Unauthorize");
    }

    return {
        id : user.id,
        nama : user.nama,
        email : user.email,
        foto : user.foto,
        token : user.token
    }
}

export const logoutUser = async(email)=>{
    const input = userEmail.safeParse(email);
    if(!input.success){
        throw new ResponseException(401 , "Unauthorize");
    }

    const user = await prismaClient.user.findFirst({
        where : {
            email : input.data,
        }
    });

    if (!user) {
        throw new ResponseException(401, "Unauthorize");
    }
    

    await prismaClient.user.update({
        data : {
            token : null
        },
        where : {
            email : user.email
        }
    });
}

export const updateUser = async (req) => {
    const id = req.user.id; // ✅ diperbaiki
    const body = req.body;
    const file = req.file;
  
    const validation = userUpdateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error("Data tidak valid");
    }
  
    const existing = await prismaClient.user.findUnique({ where: { id } });
    if (!existing) throw new Error("User tidak ditemukan");
  
    let updateData = {
      nama: body.nama,
      email: body.email,
    };
  
    if (file) {
      if (existing.foto) {
        const oldPath = path.join("storage", existing.foto);
        try {
          await fs.unlink(oldPath);
        } catch (err) {
          console.warn("Gagal menghapus foto lama:", err.message);
        }
      }
      updateData.foto = path.posix.join("user", file.filename);
    }
  
    return await prismaClient.user.update({
      where: { id },
      data: updateData,
    });
  };
  
  
