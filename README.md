[![Quality Gate Status (Backend)](https://sonarcloud.io/api/project_badges/measure?project=EliMCN_my-project-template_backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EliMCN_my-project-template_backend)
[![Quality Gate Status (Frontend)](https://sonarcloud.io/api/project_badges/measure?project=EliMCN_my-project-template_frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EliMCN_my-project-template_frontend)

# Plantilla de Proyecto Full-Stack con Toolchain Estándar

Repo base listo para **GitHub** con:

Repo base listo para **GitHub** con:

- **Frontend:** React + Vite (JSX)
- **Backend:** Node 18+ con Express (+ CORS para dev) y Nodemon
- **Calidad:** ESLint + Prettier (ambos paquetes)
- **Seguridad/Calidad en CI:** SonarCloud + Snyk
- **Automatización:** GitHub Actions (lint, Snyk, Sonar) y Dependabot semanal

> **Asunciones documentadas**
>
> - Para que SonarCloud distinga frontend y backend, los `sonar.projectKey` usan sufijos `_frontend` y `_backend` (puedes cambiarlos).
> - Se agregan archivos mínimos adicionales necesarios para que Vite funcione: `index.html`, `src/main.jsx` y `vite.config.js`.
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

1.  **Crear Repositorio:** En GitHub, haz clic en **"Use this template"** para crear un nuevo repositorio.
2.  **Clonar:** Clona tu nuevo repositorio en tu máquina local.
3.  **Instalar Dependencias:** Abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```
    Este comando instalará las dependencias tanto del `frontend` como del `backend` gracias a los NPM Workspaces.

## Desarrollo Local

Existen tres formas de levantar el entorno, elige la que mejor se adapte a tus necesidades.

### Opción 1: Sin Docker (Recomendado para desarrollo rápido)

Inicia ambos servicios con recarga en caliente (hot-reload).

```bash
npm run dev
```

El frontend consulta `GET http://localhost:4000/health` y muestra el estado.

### Opción 2: Con Docker (Entorno de desarrollo aislado)

Levanta los servicios de desarrollo dentro de contenedores Docker.

```bash
docker-compose up --build
```

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:4000`

### Opción 3: Simulación de Producción (Docker con Nginx)

Esta opción construye las imágenes optimizadas para producción y las sirve a través de un Reverse Proxy (Nginx), simulando un despliegue real. **No tiene hot-reload.**

```bash
docker-compose -f docker-compose.prod.yml up --build
```

- **Acceso Unificado:** `http://localhost` (el proxy redirige a los servicios correctos).

## CI/CD (GitHub Actions)

### Secrets requeridos (repo → Settings → Secrets and variables → Actions → New repository secret)

- `SNYK_TOKEN`
- `SONAR_TOKEN`

### Qué corre en cada `push`/`pull_request`

- **Lint** en `frontend` y `backend` (ESLint).
- **Snyk** (`severity-threshold=high`) → falla el pipeline si hay vulnerabilidades **altas**.
- **SonarCloud** → publica issues y code smells para cada paquete.

## Dependabot

Actualiza semanalmente dependencias `npm` en `/`, `/frontend` y `/backend` creando PRs automáticas.

## Personalización rápida

- Reemplaza `<TU_ORG>` y `<NOMBRE_PROYECTO>` en los `sonar-project.properties`.
- Endurece CORS y agrega `helmet` en el backend para prod.
- Agrega tu capa de DB/framework de migraciones cuando corresponda.

---

¡Listo! Puedes crear tu primer repo desde esta plantilla y empezar a codear con calidad y seguridad desde el día cero.
