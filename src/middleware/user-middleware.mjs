import { get } from "../service/user-service.mjs";
import { ResponseException } from "../schema/response.mjs";
import { Router } from "express";

const userMiddleware = Router();

userMiddleware.use(async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    
    if (!token) {
      throw new ResponseException(401, "Unauthorized");
    }

    const user = await get(token); // ini bisa throw ResponseException
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ResponseException) {
      res.status(err.status).json({ error: err.detail });
    } else {
      console.error("Unexpected error in auth middleware:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default userMiddleware;
