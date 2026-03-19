# GalvaZinc

Aplicación web corporativa para **GalvaZinc**, empresa especializada en galvanizado en caliente. Construida con **Next.js 14 App Router** y optimizada para despliegue en **Vercel**.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Estilos | Tailwind CSS |
| Base de datos | Vercel Postgres (PostgreSQL) |
| Almacenamiento de imágenes | Vercel Blob |
| Deployment | Vercel |
| Lenguaje | TypeScript |

---

## Estructura del proyecto

```
galvazinc/
├── app/
│   ├── api/
│   │   ├── auth/route.ts        # Login/logout admin
│   │   ├── projects/
│   │   │   ├── route.ts         # GET (listar) / POST (crear)
│   │   │   └── [id]/route.ts    # GET (detalle) / DELETE
│   │   └── upload/route.ts      # Subida de imágenes a Vercel Blob
│   ├── admin/                   # Panel de administración
│   ├── contacto/                # Página de contacto
│   ├── proyectos/               # Portafolio de proyectos
│   ├── servicios/               # Servicios de la empresa
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Landing / Home
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   └── UploadForm.tsx
├── lib/
│   ├── db.ts                    # Queries a Vercel Postgres
│   ├── types.ts                 # Tipos TypeScript
│   └── utils.ts                 # Utilidades (cn, formatDate)
└── ...
```

---

## Configuración en Vercel

### 1. Clonar e instalar

```bash
git clone https://github.com/ManuelMC21/galvazinc
cd galvazinc
npm install
```

### 2. Crear servicios en Vercel

En tu proyecto de Vercel:
1. **Storage → Create Database → Postgres** → conectar al proyecto
2. **Storage → Create Database → Blob** → conectar al proyecto

Las variables de entorno se añaden automáticamente.

### 3. Variables de entorno locales

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

Agrega obligatoriamente:
```env
ADMIN_PASSWORD=tu_contraseña_segura
```

Las variables de Postgres y Blob se obtienen desde el dashboard de Vercel con:
```bash
vercel env pull .env.local
```

### 4. Desarrollo local

```bash
npm run dev
```

### 5. Deploy

```bash
git push origin main
# Vercel despliega automáticamente
```

---

## Panel de administración

Accede a `/admin` para:
- **Subir proyectos** con nombre, categoría, descripción e imagen
- **Listar y eliminar** proyectos existentes

Protegido con contraseña almacenada en la variable de entorno `ADMIN_PASSWORD`.

---

## Rutas de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/projects` | Listar todos los proyectos |
| `POST` | `/api/projects` | Crear un proyecto |
| `GET` | `/api/projects/:id` | Obtener un proyecto |
| `DELETE` | `/api/projects/:id` | Eliminar proyecto (requiere sesión admin) |
| `POST` | `/api/upload` | Subir imagen (requiere sesión admin) |
| `POST` | `/api/auth` | Iniciar sesión admin |
| `DELETE` | `/api/auth` | Cerrar sesión admin |
