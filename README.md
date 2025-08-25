# Template de proyectos con toolchain estándar

Repo base listo para **GitHub** con:

- **Frontend:** React + Vite (JSX)
- **Backend:** Node 18+ con Express (+ CORS para dev) y Nodemon
- **Calidad:** ESLint + Prettier (ambos paquetes)
- **Seguridad/Calidad en CI:** SonarCloud + Snyk
- **Automatización:** GitHub Actions (lint, Snyk, Sonar) y Dependabot semanal

> **Asunciones documentadas**
>
> - Para que SonarCloud distinga frontend y backend, los `sonar.projectKey` usan sufijos `__frontend` y `__backend` (puedes cambiarlos).
> - Se agregan archivos mínimos adicionales necesarios para que Vite funcione: `index.html`, `src/main.jsx` y `vite.config.js`.
> - Se habilita CORS **abierto** en `backend` solo para facilitar el desarrollo local. Endurecer en producción.

---

## Cómo usarlo (crear repo desde template)
1. Descarga o clona este repo y súbelo a tu organización.
2. En GitHub, ve a **Settings → General → Template repository** y marca la opción para usarlo como plantilla.
3. A partir de ahora, crea nuevos repos con **Use this template**.

## Desarrollo local

En terminales separadas:

```bash
cd backend
npm install
npm run dev   # -> http://localhost:4000

cd ../frontend
npm install
npm run dev   # -> http://localhost:5173
```

El frontend consulta `GET http://localhost:4000/health` y muestra el estado.

## CI/CD (GitHub Actions)

### Secrets requeridos (repo → Settings → Secrets and variables → Actions → New repository secret)
- `SNYK_TOKEN`
- `SONAR_TOKEN`
- `SONAR_HOST_URL` → para SonarCloud usa `https://sonarcloud.io`

### Qué corre en cada `push`/`pull_request`
- **Lint** en `frontend` y `backend` (ESLint).
- **Snyk** (`severity-threshold=high`) → falla el pipeline si hay vulnerabilidades **altas**.
- **SonarCloud** → publica issues y code smells para cada paquete.

## Dependabot
Actualiza semanalmente dependencias `npm` en `/`, `/frontend` y `/backend` creando PRs automáticas.

## Estructura

```text
my-project-template/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   ├── .eslintrc.json
│   ├── .prettierrc
│   └── sonar-project.properties
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── package.json
│   ├── .eslintrc.json
│   ├── .prettierrc
│   └── sonar-project.properties
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── .github/dependabot.yml
├── CHECKLIST.md
└── README.md
```

## Docker (opcional)
Levanta ambos servicios:

```bash
docker compose up --build
# Frontend: http://localhost:5173
# Backend:  http://localhost:4000
```

> En modo compose, el navegador sigue accediendo al backend por `http://localhost:4000`.

## Personalización rápida
- Reemplaza `<TU_ORG>` y `<NOMBRE_PROYECTO>` en los `sonar-project.properties`.
- Endurece CORS y agrega `helmet` en el backend para prod.
- Agrega tu capa de DB/framework de migraciones cuando corresponda.

---

¡Listo! Puedes crear tu primer repo desde esta plantilla y empezar a codear con calidad y seguridad desde el día cero 🚀
