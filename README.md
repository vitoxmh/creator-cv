# creator-cv

Generador de currículums (CV) con múltiples plantillas, autenticación con JWT y exportación a PDF. Frontend en React (Vite), backend en Node.js/Express y **MySQL** como base de datos a través de Prisma ORM.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React 18, Vite, React Router, Sass, PDF por impresión del navegador |
| Backend | Node.js, Express, JWT (cookie httpOnly), bcryptjs |
| Base de datos | MySQL 8.4 con Prisma ORM |
| Infra local | Docker Compose (MySQL + phpMyAdmin + app) |

## Estructura del proyecto

```
.
├── client/            # Frontend React (Vite)
│   ├── Dockerfile         # Build de producción servido con Nginx
│   ├── Dockerfile.dev     # Dev server con hot-reload
│   ├── nginx.conf         # Sirve estáticos y proxy /api -> server
│   └── src/
│       ├── components/      # Formulario, preview, plantillas
│       ├── pages/           # Login, Register, Workspace
│       ├── context/         # Autenticación (AuthContext)
│       └── styles/          # Estilos SCSS
├── server/            # Backend Express
│   ├── Dockerfile         # Imagen de producción (Node)
│   ├── Dockerfile.dev     # Dev con node --watch
│   ├── prisma/            # Schema y migraciones de la BD
│   └── src/
│       ├── controllers/      # Lógica de auth y CVs
│       ├── middleware/       # requireAuth (JWT)
│       └── routes/           # /api/auth y /api/cvs
├── docker-compose.yml   # Stack de producción (MySQL + phpMyAdmin + server + client)
├── docker-compose.dev.yml # Stack de desarrollo con hot-reload
├── render.yaml         # Config de despliegue en Render
└── package.json        # Scripts raíz (concurrently)
```

## Requisitos

- Node.js 18+ (solo desarrollo local sin Docker)
- Docker + Docker Compose
- npm

## Dockerizado

El proyecto incluye dos stacks de Docker Compose: **producción** (`docker-compose.yml`) y **desarrollo** (`docker-compose.dev.yml`). Ambos levantan MySQL, phpMyAdmin, el backend Express y el frontend React.

### Producción

```bash
npm run up        # construye y levanta todo: http://localhost:8080
npm run logs      # sigue los logs del stack
npm run down      # detiene todo
```

| Servicio | URL |
| --- | --- |
| App (client Nginx → proxy `/api` al server) | http://localhost:8080 |
| API Express | http://localhost:3001 |
| phpMyAdmin | http://localhost:8081 |
| MySQL (host) | localhost:3307 |

El frontend se compila y se sirve con **Nginx**, que redirige `/api/*` al contenedor del servidor. El servidor aplica las migraciones de Prisma automáticamente al arrancar.

Variables configurables (opcionales, con valores por defecto): `MYSQL_ROOT_PASSWORD`, `MYSQL_PORT`, `SERVER_PORT`, `CLIENT_PORT`, `JWT_SECRET`, `COOKIE_SECURE`.

> **Nota sobre la cookie**: `NODE_ENV=production` marca la cookie JWT como `Secure`, que el navegador solo guarda por HTTPS. El stack dockerizado por HTTP local fuerza `COOKIE_SECURE=false`. En un despliegue real con HTTPS, pon `COOKIE_SECURE=true`.

### Desarrollo (hot-reload)

```bash
npm run dev:up    # construye y levanta con hot-reload: http://localhost:5173
npm run dev:down  # detiene
```

| Servicio | URL |
| --- | --- |
| Frontend (Vite dev, HMR) | http://localhost:5173 |
| API Express (node --watch) | http://localhost:3001 |
| phpMyAdmin | http://localhost:8081 |

El código fuente se monta como volumen: los cambios en `server/` reinician el servidor con `node --watch` y los de `client/` se recargan con HMR. El proxy de Vite (`/api`) apunta al contenedor `server` automáticamente vía `VITE_PROXY_TARGET`.

> No ejecutes el stack de producción y el de desarrollo a la vez: comparten los puertos y el contenedor de MySQL.

## Puesta en marcha (sin Docker, desarrollo local)

### 1. Instalar dependencias

```bash
npm install          # raíz
npm install --prefix server
npm install --prefix client
```

### 2. Levantar la base de datos

```bash
npm run db:up
```

Levanta MySQL en el puerto **3307** y phpMyAdmin en **http://localhost:8081**.

> El puerto 3307 se usa porque en esta máquina el 3306 ya está ocupado por otro proyecto (contenedor `mysql-dev`). Si quieres usar el 3306, cambia el mapeo en `docker-compose.yml` y la `DATABASE_URL`.

### 3. Configurar variables de entorno

Copia `server/.env.example` a `server/.env` y ajusta los valores:

```bash
cp server/.env.example server/.env
```

| Variable | Descripción |
| --- | --- |
| `DATABASE_URL` | Cadena de conexión MySQL, ej. `mysql://root:postgres@localhost:3307/cv_generator` |
| `JWT_SECRET` | Secreto para firmar los tokens JWT (¡cámbialo en producción!) |
| `PORT` | Puerto del servidor Express (por defecto 3001) |
| `CLIENT_ORIGIN` | Origen permitido por CORS, ej. `http://localhost:5173` |
| `NODE_ENV` | `development` o `production` |

### 4. Aplicar migraciones

```bash
npm run db:deploy
```

### 5. Arrancar en desarrollo

```bash
npm run dev
```

Levanta el servidor (puerto 3001) y el cliente Vite (puerto 5173) con `concurrently`. También puedes arrancarlos por separado:

```bash
npm run dev:server   # solo API
npm run dev:client   # solo frontend
```

## Base de datos (MySQL)

- **Servidor local**: contenedor Docker `mysql:8.4`, puerto `3307:3306`.
- **Usuario**: `root`, contraseña `postgres` (configuradas en `docker-compose.yml`).
- **BD**: `cv_generator`.
- **Admin**: phpMyAdmin en http://localhost:8081.

Para regenerar el esquema desde Prisma (con el stack levantado):

```bash
npm run db:push     # sincroniza el schema sin crear migración
npm run db:migrate  # crea y aplica una nueva migración (dev)
npm run db:studio   # abre Prisma Studio
```

## API

| Método | Ruta | Descripción | Auth |
| --- | --- | --- | --- |
| GET | `/api/health` | Healthcheck | — |
| POST | `/api/auth/register` | Registro de usuario | — |
| POST | `/api/auth/login` | Inicio de sesión (cookie JWT) | — |
| POST | `/api/auth/logout` | Cerrar sesión | Sí |
| GET | `/api/auth/me` | Datos del usuario actual | Sí |
| GET | `/api/cvs` | Listar CVs del usuario | Sí |
| GET | `/api/cvs/:id` | Obtener un CV | Sí |
| POST | `/api/cvs` | Crear CV | Sí |
| PUT | `/api/cvs/:id` | Actualizar CV | Sí |
| DELETE | `/api/cvs/:id` | Eliminar CV | Sí |

## Despliegue

`render.yaml` despliega el backend, el frontend compilado (`client/dist`) y provisiona una base de datos gestionada de Postgres en Render.

> **Importante**: este proyecto usa MySQL, y Render **no ofrece MySQL como base de datos gestionada**. Para desplegar necesitarás un MySQL externo (p. ej. PlanetScale, Aiven, o una instancia propia) y configurar `DATABASE_URL` manualmente en las variables de entorno de Render.

## Scripts útiles

| Comando | Descripción |
| --- | --- |
| `npm run setup` | Instala dependencias de server y client |
| `npm run build` | Compila el frontend |
| `npm run start` | Arranca el servidor en producción |
| `npm run up` / `down` | Levanta / detiene el stack Docker completo (producción) |
| `npm run dev:up` / `dev:down` | Levanta / detiene el stack Docker de desarrollo (hot-reload) |
| `npm run db:up` | Levanta solo MySQL + phpMyAdmin (base de datos para dev local) |
| `npm run logs` | Sigue los logs del stack Docker |

## Seguridad

- Las credenciales y secretos van en `server/.env`, que está excluido de Git (ver `.gitignore`). Usa `server/.env.example` como plantilla sin valores reales.
- Nunca comitees `.env`, certificados (`*.pem`, `*.key`, `*.crt`) ni logs.
