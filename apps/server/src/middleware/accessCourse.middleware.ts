import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/user.service";
import { enrollmentService } from "../services/enrollment.service";
import { Course as CourseModel } from "../database/models";
import { User } from "domain/src/entities/User";

const userRepo = userService();
const enrollmentRepo = enrollmentService();

interface RequestWithUser extends Request {
  user?: User;
}

export async function authorizeAccessToCourse(
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

    const courseId = parseInt(req.params.courseId || req.params.id);
    if (isNaN(courseId))
      return res.status(400).json({ message: "Invalid or missing courseId" });

    const course = await CourseModel.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (user.role === "admin") {
      req.user = user;
      return next();
    }

    if (user.role === "prof" && course.createdBy === user.id) {
      req.user = user;
      return next();
    }

    const enrollment = await enrollmentRepo.findByUserAndCourse(user.id, courseId);
    if (enrollment && enrollment.status === "approved") {
      req.user = user;
      return next();
    }

    return res.status(403).json({ message: "Access denied to this course" });
  } catch (err) {
    console.error("Authorization error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}