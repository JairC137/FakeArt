# FakeArt — Estructura de Carpetas

> Este documento describe **únicamente** la estructura de carpetas del proyecto FakeArt y el propósito de cada directorio/archivo relevante. Propuesta de la arquitectura del proyecto nos permite empezar con una versión dummy para validar la idea. Más adelante podemos hacerla más robusta y escalable, sin necesidad de cambiar la estructura de carpetas.

---

## Visión general (monorepo)

```
FakeArt/
├─ frontend/                     # App móvil (React Native + Expo)
├─ backend/                      # API REST/WebSockets (Node.js + TS)
├─ infra/                        # Infraestructura como código (Terraform/CDK)
├─ docs/                         # Documentación funcional/técnica
├─ packages/                     # Paquetes compartidos (utils, tipos)
├─ .github/workflows/            # Pipelines de CI/CD
├─ .editorconfig                 # Estándares de formato
├─ .gitignore                    # Ignora artefactos locales
└─ README.md                     # README principal
```

---

## `frontend/` — App móvil (Expo)

Estructura propuesta para proyectos Expo con TypeScript y expo-router. (Actualmente funciona sin tocar el apartado de back)

```
frontend/
├─ app/                          # Ruteo (expo-router): pilas, tabs, modales
│  ├─ (tabs)/                    # Tabs principales (feed, explore, upload, profile)
│  │  ├─ _layout.tsx            # Layout para el grupo de tabs
│  │  ├─ index.tsx              # Feed
│  │  ├─ explore.tsx            # Explore/búsqueda
│  │  ├─ upload.tsx             # Subida de media
│  │  └─ profile.tsx            # Perfil
│  ├─ auth/                      # Pantallas de login/signup
│  │  ├─ login.tsx
│  │  └─ register.tsx
│  ├─ (modals)/                  
│  │  └─ report.tsx
│  └─ _layout.tsx                # Tema, providers, navegación raíz
│
├─ src/
│  ├─ components/                # UI reutilizable
│  ├─ features/                  # Dominios funcionales
│  │  ├─ auth/                   # hooks, servicios y vistas específicas de auth
│  │  ├─ feed/
│  │  ├─ explore/
│  │  ├─ post/                   # detalle de post, like/comment
│  │  └─ profile/
│  ├─ hooks/                     # Hooks compartidos (useAuth, usePaginatedQuery)
│  ├─ lib/                       # utilidades (http client, storage, formatters)
│  ├─ services/                  # clientes API (axios/fetch, OpenAPI opcional)
│  ├─ store/                     # estado global (Zustand/Redux)
│  ├─ theme/                     # tokens de diseño, dark mode
│  ├─ types/                     # tipos TS compartidos
│  └─ config/                    # constantes, endpoints, env mapping
│
├─ assets/                       # iconos, fuentes, imágenes locales
├─ env.example                   # variables de entorno de RN (EXPO_PUBLIC_*)
├─ app.json                      # configuración de Expo
├─ tsconfig.json                 # paths alias (p. ej., @/* → src/*)
└─ package.json
```

**Notas**

* **`app/`** define la navegación con **expo-router** (grupos, layouts, modales).
* **`features/`** agrupa código por dominio.
* **`env.example`** enumera variables esperadas; nunca publicar `.env` reales.

---

## `backend/` — API (Node.js + TypeScript)

Compatible con Express o NestJS; la estructura favorece modularidad y capas limpias.(estructura diseñana con la finalidad de ser compatible con mongo)

```
backend/
├─ src/
│  ├─ modules/                   # Módulos por dominio (DDD-lite)
│  │  ├─ auth/                   # Validación de JWT Cognito, guards/middleware
│  │  ├─ uploads/                # /uploads/sign (pre-signed URL S3)
│  │  ├─ posts/                  # CRUD, feed, explore
│  │  ├─ comments/               # CRUD de comentarios
│  │  ├─ likes/                  # endpoints de like/unlike
│  │  ├─ follows/                # follow/unfollow
│  │  ├─ profiles/               # perfil, avatar (S3), bio
│  │  ├─ notifications/          # notifs in-app + push (SNS/WS)
│  │  └─ reports/                # reportes, flags NSFW
│  ├─ db/                        # Conexión y modelos (Mongoose)
│  │  ├─ models/                 # Esquemas: User, Post, Like, Comment...
│  │  └─ index.ts                # bootstrap de conexión a Atlas
│  ├─ ws/                        # WebSockets (API GW WS / Socket.IO)
│  ├─ common/                    # filtros, interceptores, errores, utils
│  ├─ config/                    # configuración por ambiente, CORS, rate-limit
│  ├─ middleware/                # middlewares específicos (Express)
│  ├─ validators/                # Zod/Joi schemas (DTOs)
│  ├─ routes.ts                  # composición de rutas (si Express)
│  └─ main.ts                    # bootstrap app server
│
├─ test/                         # unit/e2e
├─ openapi.yaml                  # contrato de la API (opcional)
├─ env.example                   # variables de entorno backend
├─ tsconfig.json
└─ package.json
```

**Notas**

* **`modules/`** cada dominio mantiene controladores/servicios/repositorios.
* **`validators/`** aplica validación temprana de payloads.
* **`ws/`** encapsula la capa realtime (eventos, autenticación, rooms).

---

## `infra/` — Infraestructura como Código (Se actualizara mas adelanta y depende completamente del servicio de alojamiento del back)

```
infra/

```

**Arquitectura de las integraciones**
(Si se decide a futuro integrar con proveedores externos como OpenAi ect)

