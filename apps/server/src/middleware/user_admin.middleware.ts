import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/user.service";
import { User } from "domain/src/entities/User";

const userRepo = userService();

interface RequestWithUser extends Request {
  user?: User;
}

export async function authorizeUserOrAdmin(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    const user = await userRepo.findById(userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;

    if (user.role === "admin") return next();

    const targetId = parseInt(req.params.id);
    const isSelf = !isNaN(targetId) && user.id === targetId;

    if (isSelf && (req.method === "GET" || req.method === "DELETE")) {
      return next();
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (err) {
    console.error("Error en authorizeUserOrAdmin:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
