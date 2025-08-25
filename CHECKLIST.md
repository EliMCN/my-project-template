# CHECKLIST de Buenas Prácticas

## Frontend
- [ ] Componentización clara (smart/dumb components donde tenga sentido).
- [ ] Hooks: `useEffect` con deps correctas; `useMemo`/`useCallback` para memorizar.
- [ ] Validación de inputs (y mensajes de error amigables).
- [ ] Accesibilidad: etiquetas, roles ARIA, contraste, navegación con teclado.
- [ ] Performance: dividir código (lazy), evitar renders innecesarios.

## Backend
- [ ] Seguridad HTTP: CORS limitado por entorno, `helmet` (agregar en proyecto real).
- [ ] Validación de payloads (p. ej. `zod`/`joi`).
- [ ] Logs estructurados (p. ej. `pino`) y correlación de requests.
- [ ] Manejo de errores centralizado (middleware).
- [ ] Rate limiting y protección ante brute force.

## DB (placeholder)
- [ ] Elegir motor y estrategia de migraciones (p. ej. Prisma/Knex).
- [ ] Índices en campos de búsqueda y claves foráneas.

## Seguridad (placeholder)
- [ ] Autenticación (JWT/sesiones) y rotación de tokens.
- [ ] Mitigar XSS/CSRF; sanitizar entradas.
- [ ] Backups/restore y cifrado de datos sensibles.

## CI/CD
- [ ] Lint obligatorio en cada PR.
- [ ] SonarCloud (bugs, code smells y cobertura si se agrega testing).
- [ ] Snyk (falla si hay vulnerabilidades **altas**).
- [ ] Dependabot semanal (PRs de actualización).
- [ ] Variables de entorno/secrets correctamente configurados.
