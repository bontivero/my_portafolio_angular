# Beatriz Ontivero — Portfolio

Portfolio profesional desarrollado con **Angular 20**, TypeScript y SCSS. Presenta experiencia profesional, proyectos, certificaciones, reconocimientos y competencias técnicas, con soporte bilingüe español/inglés y diseño responsive.

[![CI](https://github.com/bontivero/my_portafolio_angular/actions/workflows/ci.yml/badge.svg)](https://github.com/bontivero/my_portafolio_angular/actions/workflows/ci.yml)
[![Deploy](https://github.com/bontivero/my_portafolio_angular/actions/workflows/pages.yml/badge.svg)](https://github.com/bontivero/my_portafolio_angular/actions/workflows/pages.yml)

> Si usas otro propietario o nombre de repositorio, actualiza las URLs de los badges y la sección de GitHub Pages.

## ✨ Características

- Angular 20 con componentes standalone y rutas lazy-loaded.
- Portfolio bilingüe mediante `@ngx-translate/core`.
- Secciones de inicio, perfil, experiencia, proyectos, certificaciones, reconocimientos, habilidades y contacto.
- Carruseles responsive con `ngx-owl-carousel-o`.
- Animación de partículas con `tsParticles`.
- TypeScript en modo estricto.
- Tests unitarios con Vitest a través del builder `@angular/build:unit-test`.
- Linting de TypeScript y templates Angular con ESLint + `angular-eslint`.
- Formateo consistente con Prettier.
- CI automático con GitHub Actions.
- Despliegue automático a GitHub Pages.
- Imagen Docker de producción servida por Nginx.
- Publicación automática de la imagen en GitHub Container Registry (GHCR).

## 🧰 Stack

| Área                 | Tecnologías                                                |
| -------------------- | ---------------------------------------------------------- |
| Frontend             | Angular 20, TypeScript, SCSS, Bulma                        |
| UI                   | Font Awesome, ngx-owl-carousel-o, ngx-spinner, tsParticles |
| Internacionalización | ngx-translate                                              |
| Calidad              | ESLint, angular-eslint, Prettier, TypeScript, Vitest       |
| CI/CD                | GitHub Actions, GitHub Pages                               |
| Contenedores         | Docker, Nginx, Docker Compose, GHCR                        |

## 🚀 Requisitos

Angular 20 requiere **Node.js 20.19+**. Consulta la matriz oficial de compatibilidad de Angular antes de actualizar el runtime.

```bash
node --version
npm --version
```

## 💻 Desarrollo local

Instalación limpia recomendada si vienes de una versión anterior del proyecto:

```bash
# Linux / macOS
rm -rf node_modules .angular
npm ci
npm start
```

```bat
:: Windows (cmd)
rmdir /s /q node_modules 2>nul
rmdir /s /q .angular 2>nul
npm ci
npm start
```

La aplicación estará disponible en `http://localhost:4200/`.

## 🧪 Calidad y tests

Ejecuta las comprobaciones individualmente:

```bash
npm run typecheck
npm run lint
npm run format:check
npm test -- --watch=false
npm run build -- --configuration production
```

Para corregir automáticamente el formato:

```bash
npm run format
```

El pipeline de CI ejecuta estas comprobaciones en cada `push` a `main` y en cada Pull Request hacia `main`.

> **Nota sobre tests:** el proyecto usa el builder experimental `@angular/build:unit-test` con Vitest. El target de tests está configurado en `angular.json` con `runner: "vitest"`. Si tu configuración usa detección de cambios zoneless, los providers globales de test se inyectan mediante el archivo indicado en `providersFile`.

## 🚀 Despliegues

El proyecto se despliega automáticamente en dos plataformas al hacer push a `main`:

| Plataforma       | URL                                                | Workflow                                       | Propósito                  |
| ---------------- | -------------------------------------------------- | ---------------------------------------------- | -------------------------- |
| GitHub Pages     | https://bontivero.github.io/my_portafolio_angular/ | `.github/workflows/pages.yml`                  | Despliegue principal       |
| Firebase Hosting | https://my-portafolio-angular.web.app/             | `.github/workflows/firebase-hosting-merge.yml` | Demo de CI/CD con Firebase |

Ambos despliegues se ejecutan tras pasar el quality gate (`typecheck`, `lint`, `format`, `tests`, `build`).

## 🐳 Docker y GitHub Container Registry

El proyecto incluye un workflow específico en `.github/workflows/docker.yml` para construir y publicar la imagen en **GitHub Container Registry (GHCR)**. El flujo es:

1. Ejecutar type-check, ESLint, Prettier, tests unitarios y build de producción.
2. Configurar Docker Buildx.
3. Autenticarse en `ghcr.io` mediante `docker/login-action` usando el `GITHUB_TOKEN` del workflow.
4. Generar tags y labels con `docker/metadata-action`.
5. Construir y publicar la imagen con `docker/build-push-action`.

La publicación se ejecuta al hacer `push` a `main` y al crear tags semver del tipo `v1.0.0`. En Pull Requests se ejecuta el quality gate, pero no se publica ninguna imagen.

La imagen queda disponible en el paquete **Packages** del repositorio, con nombres como:

```text
ghcr.io/<owner>/<repository>:main
ghcr.io/<owner>/<repository>:sha-<commit>
ghcr.io/<owner>/<repository>:v1.0.0
```

No es necesario crear manualmente un usuario o contraseña de Docker Hub: para GHCR, el workflow utiliza `GITHUB_TOKEN` y la siguiente configuración de permisos: `contents: read` y `packages: write`.

### Construcción local

Construir la imagen:

```bash
docker build -t beatriz-portfolio .
```

Ejecutarla:

```bash
docker run --rm -p 8080:80 beatriz-portfolio
```

Abrir `http://localhost:8080`.

Con Docker Compose:

```bash
docker compose up --build
```

La configuración de Nginx incluye fallback a `index.html` para las rutas del Angular Router.

## 📁 Estructura

```text
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── features/
│   │   ├── about/
│   │   ├── certifications/
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── home/
│   │   ├── projects/
│   │   └── skills/
│   └── shared/
│       └── components/
├── assets/
│   └── i18n/
├── index.html
├── main.ts
└── styles.scss

.github/workflows/
├── ci.yml
├── pages.yml
└── docker.yml

Dockerfile
nginx.conf
compose.yaml
eslint.config.js
```

## 🔄 Flujo CI/CD

```text
Pull Request ──► CI ──► typecheck ──► lint ──► format ──► tests ──► build

main ─────────► CI ────────────────────────────────────────────► GitHub Pages
                                                              └─► GHCR (Docker)
```

## 🔐 Seguridad y mantenimiento

- No se almacenan secretos de despliegue en el repositorio.
- `node_modules`, builds y caches están excluidos de Git.
- Para actualizaciones de Angular, conviene respetar la matriz oficial de compatibilidad de Node.js/TypeScript/RxJS.
- Las dependencias deben actualizarse periódicamente y revisarse con `npm audit` cuando corresponda.

## 📄 Licencia

Este repositorio contiene un portfolio personal. Si deseas reutilizar código, contacta con la autora para acordar las condiciones de uso.
