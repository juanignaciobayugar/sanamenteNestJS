<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

# "Sanamente" - Documentación General del Proyecto (Backend)

**Sanamente** es una plataforma web de salud digital e integral diseñada exclusivamente para el seguimiento, control y organización diaria de pacientes con patologías crónicas. El propósito principal de la aplicación es brindarles a los usuarios una interfaz limpia, intuitiva y accesible donde puedan autogestionar sus rutinas de salud sin complicaciones.

Este proyecto representa la evolución y escalabilidad de un sistema que originalmente nació con una estructura nativa (HTML, CSS y JavaScript) y que fue migrado por completo hacia una arquitectura moderna basada en la separación de responsabilidades (**decoupling**). Hoy en día, la aplicación funciona de forma asíncrona y distribuida en dos repositorios independientes que se comunican de forma segura: un Frontend interactivo y un Backend robusto para la gestión y persistencia de datos.

---

## 🛠️ Tecnologías y Herramientas Utilizadas (Backend)

Para el desarrollo y la migración del servidor se eligió un ecosistema tecnológico profesional, moderno, escalable y con tipado estricto:

* **NestJS:** Framework de Node.js estructurado de forma modular (módulos, controladores y servicios) para mantener el código ordenado y mantenible.
* **TypeScript:** Utilizado en todo el servidor para definir la lógica de negocio con máxima robustez mediante clases, decoradores y DTOs (*Data Transfer Objects*) para la validación de datos.
* **TypeORM:** Mapeador objeto-relacional (ORM) encargado de conectar el código con la base de datos de manera automática mediante entidades.
* **MySQL:** Base de datos relacional normalizada para la persistencia de los datos.
* **JWT (JSON Web Tokens) & Passport:** Sistema implementado para la autenticación segura, manejo de sesiones, encriptación de contraseñas (`bcrypt`) y protección de rutas mediante *Guards*.

---

## 📁 Estructura del Proyecto (Arquitectura Multirepo)

Este repositorio corresponde al **Servidor Backend (sanamenteNestJS)**:

```text
sanamenteNestJS/
├── src/
│   ├── auth/           # Módulo de autenticación (JWT, Guards, Estrategias)
│   ├── users/          # Módulo de usuarios (Servicios, Controladores, Entidades)
│   ├── events/         # Módulo de eventos/actividades del calendario
│   ├── database/       # Configuración de TypeORM y conexión a MySQL
│   ├── app.module.ts   # Módulo raíz de la aplicación (orquestador)
│   └── main.ts         # Punto de entrada (Configura puerto, CORS y validaciones)
├── .env.example        # Plantilla para variables de entorno locales
├── package.json        # Dependencias de NestJS y scripts de inicio
└── tsconfig.json       # Configuración del compilador de TypeScript