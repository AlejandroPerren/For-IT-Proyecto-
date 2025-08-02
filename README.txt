---

# Plataforma de Cursos (Estilo Udemy)

Proyecto de backend para una plataforma de cursos tipo Udemy (sin pagos) con manejo de usuarios, cursos, progreso y quizzes.

## 🚀 Tecnologías

* **Frontend:** React + TypeScript
* **Backend:** Node.js + Express + TypeScript
* **Base de Datos:** MySQL
* **ORM:** Sequelize
* **Autenticación:** JWT (con cookies o localStorage)
* **Contenedores:** Docker (para desarrollo y despliegue)
* **Subida de archivos:** multer (para contenido futuro)

---

## 🎯 Funcionalidades

### Roles

* **Admin**

  * Crear cursos
  * Aprobar profesores
  * Ver estadísticas

* **Profesor**

  * Crear y gestionar cursos propios
  * Subir clases (video, texto, tests)
  * Aprobar o rechazar solicitudes de alumnos
  * Ver progreso de sus alumnos

* **Alumno**

  * Solicitar acceso a cursos
  * Ver progreso y contenido
  * Realizar quizzes
  * Comentar

---

## 🧠 Flujo General

1. Alumno se registra
2. Solicita acceso a un curso
3. Profesor aprueba la solicitud
4. Alumno comienza a ver lecciones (video/texto)
5. Sistema marca lecciones completadas y actualiza progreso
6. Alumno realiza quizzes
7. Admin y profesores pueden ver reportes y estadísticas

---

## 📦 Tablas (Modelos principales)

* **User**

  ```
  id | name | email | password | role (admin, prof, student)
  ```
* **Course**

  ```
  id | title | description | createdBy (UserId) | isPublished
  ```
* **Section**

  ```
  id | title | courseId
  ```
* **Lesson**

  ```
  id | title | videoUrl | textContent | sectionId | order
  ```
* **Enrollment**

  ```
  id | userId | courseId | status (pending, approved) | progress (0-100)
  ```
* **Quiz**

  ```
  id | lessonId | question | correctAnswer | wrongAnswers (array o tabla aparte)
  ```
* **Answer**

  ```
  id | userId | quizId | selectedAnswer | isCorrect
  ```

---

## 📂 Estructura de rutas principales (Express)

* **Auth**

  * `POST /auth/register`
  * `POST /auth/login`

* **Cursos y lecciones**

  * `GET /courses` → listar cursos publicados
  * `POST /courses/:id/request-access` → alumno solicita acceso
  * `POST /courses/:id/approve-user/:userId` → profesor aprueba
  * `GET /courses/:id/lessons` → obtener lecciones del curso

* **Progreso**

  * `POST /courses/:id/progress` → actualizar progreso

* **Quizzes**

  * `POST /quiz/:lessonId/answer` → guardar respuesta del quiz

---

## 🛠 Instalación y uso con Docker

```bash
# Clonar repositorio
git clone https://github.com/usuario/proyecto.git
cd proyecto

# Crear archivo .env basado en .env.example

# Construir e iniciar contenedores
docker-compose up --build
```

---

## Estado actual

* API RESTful inicial con Express y TypeScript
* Modelos principales creados
* Rutas CRUD básicas para:

  * Users
  * Courses
  * Sections
  * Lessons
  * Enrollments
  * Quizzes
  * Answers (en progreso)

---
