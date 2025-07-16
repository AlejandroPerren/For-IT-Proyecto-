import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterUser } from '../RegisterUser';
import { User } from '../../../entities/User';
import { UserRepository } from '../../../services/UserRepository';
import bcrypt from 'bcrypt';

// 🧪mock de bcrypt.hash para evitar hashing real en los tests
vi.mock('bcrypt', () => ({
  hash: vi.fn(() => Promise.resolve('hashed-password')),
}));

describe('Use Case: Register User', () => {
  let mockUserRepository: UserRepository;

  /**
   * 🧱 beforeEach:
   * Prepara un repositorio de usuarios falso para cada test.
   * Se asegura de que los tests no compartan estado ni dependan de la base real.
   */
  beforeEach(() => {
    mockUserRepository = {
      findByEmail: vi.fn().mockResolvedValue(null), // Por defecto: usuario no existe
      create: vi.fn((user: User) => Promise.resolve({ ...user, id: 1 })),
      findById: vi.fn(),
      findAllPendingProfessors: vi.fn(),
      approveProfessor: vi.fn(),
    };
  });

 
  /**
   * 🚫 TEST 1: Usuario ya registrado
   * Escenario: Ya existe un usuario con el mismo email.
   * Resultado esperado: el caso de uso lanza un error para evitar duplicados.
   */
  it('debería lanzar un error si ya existe un usuario con ese email', async () => {
    // Arrange: simulamos que el usuario ya existe
    const existingUser = new User(42, 'Ya Existe', 'juan@test.com', 'student', 'xxx');
    (mockUserRepository.findByEmail as any).mockResolvedValue(existingUser);

    const registerUser = new RegisterUser(mockUserRepository);

    // Act & Assert: esperamos que se lance un error
    await expect(
      registerUser.execute('Juan', 'juan@test.com', '123456')
    ).rejects.toThrow('User already exists');
  });

   /**
   * ✅ TEST 2: Registro exitoso
   * Escenario: El email no está registrado.
   * Resultado esperado: el usuario se crea correctamente con el rol "student" y contraseña hasheada.
   */
  it('debería crear un nuevo usuario si el email no está registrado', async () => {
    // Arrange: definimos los datos de entrada
    const input = {
      name: 'Juan Pérez',
      email: 'juan@test.com',
      password: '123456',
    };
    const registerUser = new RegisterUser(mockUserRepository);

    // Act: ejecutamos el caso de uso
    const createdUser = await registerUser.execute(input.name, input.email, input.password);

    // Assert: verificamos los efectos
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
    expect(mockUserRepository.create).toHaveBeenCalled();

    // Verificamos que los datos del usuario sean correctos
    expect(createdUser).toEqual(expect.objectContaining({
      id: 1,
      name: input.name,
      email: input.email,
      role: 'student',
      password: 'hashed-password',
    }));
  });

});

