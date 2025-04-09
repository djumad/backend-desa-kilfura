import {z} from "zod";

export const userRequestRegistrasi = z.object({
    nama : z.string().min(1).max(100),
    email : z.string().min(10).max(100),
    password : z.string().min(6).max(100)
});

export const userRequestLogin = z.object({
    email : z.string().min(10).max(100),
    password : z.string().min(6).max(100)
});

export const userToken = z.string().uuid();
export const userEmail = z.string().email();