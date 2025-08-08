import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/user.service";
import { Course as CourseModel } from "../database/models";
import { User } from "domain/src/entities/User";

const userRepo = userService();

interface RequestWithUser extends Request {
  user?: User;
}

export async function authorizeCourseAccess(
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

    const method = req.method;

    if (method === "POST") {
      if (user.role === "admin" || user.role === "prof") {
        return next();
      } else {
        return res.status(403).json({ message: "Only professors or admins can create courses" });
      }
    }

    if (["PUT", "PATCH", "DELETE"].includes(method)) {
      const courseId = parseInt(req.params.courseId || req.body.courseId);
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid or missing courseId" });
      }

      const course = await CourseModel.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (user.role === "admin" || (user.role === "prof" && course.createdBy === user.id)) {
        return next();
      } else {
        return res.status(403).json({ message: "Access denied: you cannot modify this course" });
      }
    }

    return res.status(403).json({ message: "Method not allowed for this resource" });
  } catch (err) {
    console.error("authorizeCourseAccess error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
