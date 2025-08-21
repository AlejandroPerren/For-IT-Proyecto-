# Plataforma de Cursos (Estilo Udemy)

Proyecto de backend para una plataforma de cursos al estilo Udemy (sin pagos). Soporta manejo de usuarios, cursos, progreso de estudiantes y quizzes.

---

## Tecnologías

- Frontend: React + TypeScript
- Backend: Node.js + Express + TypeScript
- Base de Datos: MySQL
- ORM: Sequelize
- Autenticación: JWT (con cookies o localStorage)
- Contenedores: Docker (para desarrollo y despliegue)

---

## Funcionalidades por Rol

### Admin
- Crear cursos
- Aprobar profesores
- Ver estadísticas

### Profesor
- Crear y gestionar sus propios cursos
- Subir clases (video, texto, tests)
- Aprobar o rechazar solicitudes de alumnos
- Ver progreso de sus alumnos

### Alumno
- Registrarse y solicitar acceso a cursos
- Ver contenido y progreso
- Realizar quizzes
- Comentar en clases

---

## Flujo General

1. El alumno se registra  
2. Solicita acceso a un curso  
3. El profesor aprueba la solicitud  
4. El alumno comienza a ver lecciones (video/texto)  
5. El sistema marca lecciones completadas y actualiza el progreso  
6. El alumno realiza quizzes  
7. Admin y profesores pueden ver reportes y estadísticas  

---

## Tablas (Modelos principales)

### User
id | name | email | password | role (admin, prof, student)

### Course
id | title | description | createdBy (UserId) | isPublished

### Section
id | title | courseId

### Lesson
id | title | videoUrl | textContent | sectionId | order

### Enrollment
id | userId | courseId | status (pending, approved) | progress (0-100)

### Quiz
id | lessonId | question | correctAnswer | wrongAnswers (array o tabla aparte)

### Answer
id | userId | quizId | selectedAnswer | isCorrect

---

## Rutas principales (Express)

### Main Router
router.use("/users", userRoute);
router.use("/course", courseRoute);
router.use("/section", sectionRoute);
router.use("/lesson", lessonRoute);
router.use("/enrollment", enrollmentRoute);
router.use("/quiz", quizzesRoute);

---

### User
router.post("/", controller.createUser);
router.get("/", authorizeUserOrAdmin, controller.findAllUser);
router.get("/:id", authorizeUserOrAdmin, controller.getUserById);
router.put("/:id", authorizeUserOrAdmin, controller.updateUser);
router.delete("/:id", authorizeUserOrAdmin, controller.deleteUser);
router.get("/:email", authorizeUserOrAdmin, controller.getUserByEmail);
router.post("/login", controller.loginUser);

### Course
router.get("/:courseId", authorizeAccessToCourse, controller.findById);
router.post("/", authorizeCourseAccess, controller.createCourse);
router.get("/", controller.findAllCourses);
router.get("/all/:id", controller.findAllCourses);
router.get("/createdBy/:id", controller.findCoursesByCreatorID);
router.get("/all/course/:courseId/user/:userId", authorizeAccessToCourse, courseFullCtrl.getFullCourse);

### Section
router.get("/:courseId", authorizeAccessToCourse, controller.findByCourseId);
router.post("/", authorizeCourseAccess, controller.createSection);

### Lesson
router.get("/:id", authorizeAccessToCourse, controller.findById);
router.get("/section/:sectionId", authorizeAccessToCourse, controller.findBySectionId);
router.post("/", authorizeCourseAccess, controller.createLesson);

### Enrollment
router.post("/", controller.createEnrollment);
router.get("/:userId/:courseId", authorizeAccessToCourse, controller.findByUserAndCourse);
router.put("/:userId/:courseId/approve", authorizeAccessToCourse, controller.approve);
router.put("/:userId/:courseId/progress", authorizeAccessToCourse, controller.updateProgress);
router.get("/:userId/:courseId/progress", authorizeAccessToCourse, controller.getProgress);
router.get("/course/users/:courseId", controller.findEnrolledUsers);

### Quiz
router.post("/", authorizeCourseAccess, controller.create);
router.get("/:id", authorizeAccessToCourse, controller.findById);
router.get("/lessons/:lessonId", authorizeAccessToCourse, controller.findByLessonId);

---

## Instalación y uso con Docker

# Clonar repositorio
git clone https://github.com/usuario/proyecto.git
cd proyecto

# Crear archivo .env basado en .env.example

# Construir e iniciar contenedores
docker-compose up --build
