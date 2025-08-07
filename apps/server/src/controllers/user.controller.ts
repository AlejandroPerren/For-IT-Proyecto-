import { Request, Response } from "express";
import { userService } from "../services/user.service";
import {
  createBadRequestError,
  createInternalServerError,
} from "domain/src/errors/error";
import { comparePasswords, generateToken } from "../utils/auth.util";

export function userController() {
  const service = userService();

  return {
    getUserById: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const idUser = Number(id);
        const user = await service.findById(idUser);
        return res.status(200).json({
          ok: true,
          data: user,
        });
      } catch (e) {
        const error =
          createInternalServerError(
            "Ocurrio un error al encontrar el usuario"
          ) || e;
        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },

    getUserByEmail: async (req: Request, res: Response) => {
      try {
        const email = req.query.email as string;
        if (!email) {
          const error = createBadRequestError("El email es obligatorio");
          return res.status(400).json({ ok: false, message: error.message });
        }

        const user = await service.findByEmail(email);
        if (!user) {
          return res.status(404).json({
            ok: false,
            message: `Usuario con email ${email} no encontrado`,
          });
        }

        return res.status(200).json({ ok: true, data: user });
      } catch (error) {
        const err =
          createInternalServerError("Error al obtener usuario por email") ||
          error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    createUser: async (req: Request, res: Response) => {
      try {
        const userData = req.body;

        const existingUser = await service.findByEmail(userData.email);
        if (existingUser) {
          const error = createBadRequestError("El email ya está registrado");
          return res.status(400).json({ ok: false, message: error.message });
        }
        const user = await service.createUser(userData);

        const token = generateToken(userData.id, userData.role);

        return res.status(201).json({ ok: true, data: { user, token } });
      } catch (error) {
        const err =
          createInternalServerError("Error al crear usuario") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    loginUser: async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          const error = createBadRequestError(
            "Email y contraseña son obligatorios"
          );
          return res.status(400).json({ ok: false, message: error.message });
        }

        const user = await service.findByEmail(email);
        if (!user) {
          return res
            .status(401)
            .json({ ok: false, message: "Credenciales inválidas" });
        }

        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) {
          return res
            .status(401)
            .json({ ok: false, message: "Credenciales inválidas" });
        }

        const token = generateToken(user.id, user.role);

        return res.status(200).json({
          ok: true,
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          },
        });
      } catch (error) {
        const err =
          createInternalServerError("Error al loguear usuario") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findAllUser: async (req: Request, res: Response) => {
      try {
        const users = await service.findAllUser();
        return res.status(200).json({ ok: true, data: users });
      } catch (error) {
        const err =
          createInternalServerError("Error al obtener usuarios") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    updateUser: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const updatedData = req.body;

        const existingUser = await service.findByEmail(updatedData.email);
        if (existingUser) {
          const error = createBadRequestError("El email ya está registrado");
          return res.status(400).json({ ok: false, message: error.message });
        }

        const updatedUser = await service.updateUser(Number(id), updatedData);
        return res.status(200).json({ ok: true, data: updatedUser });
      } catch (error) {
        const err =
          createInternalServerError("Error al actualizar usuario") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    deleteUser: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const deleted = await service.deleteUser(Number(id));
        if (!deleted) {
          return res
            .status(404)
            .json({ ok: false, message: "Usuario no encontrado" });
        }

        return res
          .status(200)
          .json({ ok: true, message: "Usuario eliminado correctamente" });
      } catch (error) {
        const err =
          createInternalServerError("Error al eliminar usuario") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
