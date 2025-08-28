[![CI](https://github.com/EliMCN/my-project-template/actions/workflows/ci.yml/badge.svg)](https://github.com/EliMCN/my-project-template/actions/workflows/ci.yml)
[![Quality Gate Status (Backend)](https://sonarcloud.io/api/project_badges/measure?project=EliMCN_my-project-template_backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EliMCN_my-project-template_backend)
[![Quality Gate Status (Frontend)](https://sonarcloud.io/api/project_badges/measure?project=EliMCN_my-project-template_frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EliMCN_my-project-template_frontend)

# Plantilla de Proyecto Full-Stack con Toolchain Estándar

Repo base listo para **GitHub** con:

- **Frontend:** React + Vite (JSX)
- **Backend:** Node 18+ con Express (+ CORS para dev) y Nodemon
- **Calidad:** ESLint + Prettier (ambos paquetes)
- **Seguridad/Calidad en CI:** SonarCloud + Snyk
- **Automatización:** GitHub Actions (lint, Snyk, Sonar) y Dependabot semanal

> **Asunciones documentadas**
>
> - Para que SonarCloud distinga frontend y backend, los `sonar.projectKey` usan sufijos `_frontend` y `_backend` (puedes cambiarlos).
> - Se agregan archivos mínimos para que Vite funcione: `index.html`, `src/main.jsx` y `vite.config.js`.
> - Se habilita CORS **abierto** en `backend` solo para facilitar el desarrollo local. Endurecer en producción.

---

## Estructura del Proyecto

```text
my-project-template/
├── .github/                  # Workflows de CI/CD y Dependabot
├── backend/                  # Proyecto Node.js con Express
│   ├── src/
│   ├── Dockerfile            # Para desarrollo
│   ├── Dockerfile.prod       # Para producción
│   └── ...
├── frontend/                 # Proyecto React con Vite
│   ├── src/
│   ├── Dockerfile            # Para desarrollo
│   ├── Dockerfile.prod       # Para producción (con Nginx)
│   └── ...
├── nginx-proxy/              # Configuración del Reverse Proxy para producción
│   └── nginx.conf
├── .vscode/
│   └── settings.json         # Configuración recomendada para VS Code
├── docker-compose.yml        # Orquestador para desarrollo local
├── docker-compose.prod.yml   # Orquestador para simular producción
├── package.json              # Raíz del monorepo (gestiona workspaces)
└── README.md
```

## Cómo Empezar

1. **Crear Repositorio:** En GitHub, haz clic en **"Use this template"** para crear un nuevo repositorio.  
2. **Clonar:** Clona tu nuevo repositorio en tu máquina local.  
3. **Instalar Dependencias:** En la **raíz** del proyecto:
   ```bash
   npm install
   ```
   Gracias a los **NPM Workspaces**, se instalan dependencias de `frontend` y `backend`.

## Desarrollo Local

Existen tres formas de levantar el entorno; elige la que prefieras.

### Opción 1: Sin Docker (recomendada para desarrollo rápido)

Inicia ambos servicios con recarga en caliente:

```bash
npm run dev
```

- **Frontend:** `http://localhost:5173`  
- **Backend (healthcheck):** `GET http://localhost:4000/health`

### Opción 2: Con Docker (entorno de desarrollo aislado)

```bash
docker-compose up --build
```

- **Frontend:** `http://localhost:5173`  
- **Backend:** `http://localhost:4000`

### Opción 3: Simulación de Producción (Docker + Nginx)

Construye imágenes optimizadas y sirve vía Reverse Proxy (sin hot-reload):

```bash
docker-compose -f docker-compose.prod.yml up --build
```

- **Acceso unificado:** `http://localhost` (el proxy enruta a los servicios).

## CI/CD (GitHub Actions)

### Secrets requeridos
- `SNYK_TOKEN` (token **personal** de Snyk)
- `SONAR_TOKEN` (token de SonarCloud)
- `SNYK_ORG` *(opcional)*: **slug** de tu organización en Snyk (si no se define, se usa la org por defecto del usuario)

### ¿Qué corre?
- **Lint** (frontend y backend)
- **Snyk** (genera SARIF para Code Scanning)
  - PR internos: **no bloquea** (se sube SARIF).
  - PR desde forks: se **salta** (no hay secrets).
  - Push a `main`: **falla** si detecta **HIGH/CRITICAL** y se generó SARIF.
- **SonarCloud** (backend y frontend), usando `SONAR_HOST_URL=https://sonarcloud.io`.

### Publicación de imágenes en GHCR (solo `main`)
- `ghcr.io/<owner>/<repo>/backend:<sha>` y `:latest`  
- `ghcr.io/<owner>/<repo>/frontend:<sha>` y `:latest`

> Reemplaza `<owner>/<repo>` por tu **usuario u organización** de GitHub y el **nombre del repo**.  
> Para **SonarCloud**, reemplaza `<SONAR_KEY_BACKEND>` y `<SONAR_KEY_FRONTEND>` por los `projectKey` que definas en tus `sonar-project.properties`.

## Imágenes en GHCR

**Pull público:**
```bash
docker pull ghcr.io/<owner>/<repo>/backend:latest
docker pull ghcr.io/<owner>/<repo>/frontend:latest
```

**Si el repo es privado:**
```bash
echo $PAT | docker login ghcr.io -u <tu-usuario> --password-stdin  # PAT con scope read:packages
docker pull ghcr.io/<owner>/<repo>/backend:latest
docker pull ghcr.io/<owner>/<repo>/frontend:latest
```

## Variables de entorno (backend)

Crea `backend/.env` (**no** lo comitees):

```env
PORT=4000
JWT_SECRET=changeme
DATABASE_URL=...
CORS_ORIGIN=http://localhost:5173
```

En producción con Docker Compose:

```yaml
services:
  backend:
    env_file: backend/.env
```

## Despliegue (resumen)

- **Frontend (Vercel):** apúntalo a `frontend/`. Vercel compila el **código** (no consume tu imagen Docker).
- **Backend (VPS/IONOS con Docker Compose):** usa las imágenes de GHCR y actualiza tras cada release:
  ```bash
  docker compose pull && docker compose up -d
  ```
- Opcional: Reverse Proxy (Nginx/Caddy) con TLS y dominios `api.tudominio.com` (backend) / `tudominio.com` (frontend).

## Dependabot

Actualiza semanalmente dependencias `npm` en `/`, `/frontend` y `/backend` creando PRs automáticas.

## Personalización rápida

- Reemplaza `<TU_ORG>` y `<NOMBRE_PROYECTO>` en los `sonar-project.properties`.
- Endurece CORS y agrega `helmet` en el backend para prod.
- Agrega tu capa de DB/migraciones cuando corresponda.

---

¡Listo! Crea tu repo desde esta plantilla y arranca con calidad y seguridad desde el día cero.
