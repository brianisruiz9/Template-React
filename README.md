# Template React + MUI

Plantilla de panel administrativo construida con React, TypeScript, Vite y Material UI. Incluye autenticacion demo, layout responsivo, tablas con DataGrid, exportacion a Excel e internacionalizacion.

## Funcionalidades
- Login simulado con persistencia en localStorage.
- Dashboard con tarjetas de estadisticas.
- Usuarios: busqueda, seleccion multiple, eliminacion y formulario en dialogo.
- Posts: CRUD contra JSONPlaceholder (las escrituras no persisten).
- DataGrid reutilizable con exportacion a XLSX.
- Tema claro/oscuro y soporte i18n (es/en).

## Stack
- React 19 + TypeScript
- Vite 7
- MUI (Material UI) + MUI X Data Grid
- Redux Toolkit
- React Router
- Axios
- i18next

## Requisitos
- Node.js LTS recomendado
- npm

## Instalacion
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Credenciales demo
- Email: `admin@email.com`
- Password: `123`

## Rutas principales
- `/sign-in`
- `/dashboard`
- `/users`
- `/posts`

## API
Los posts se consumen desde JSONPlaceholder (`https://jsonplaceholder.typicode.com`). Las operaciones de crear/editar/eliminar son simuladas y no persisten en el servidor.

## Estructura del proyecto
- `src/components`: componentes reutilizables (Appbar, Sidebar, DataGrid, Dialogs)
- `src/containers`: pantallas (Dashboard, Users, Posts, SignIn)
- `src/i18n`: configuracion de idiomas y traducciones
- `src/store`: Redux store y slices
- `src/utils`: helpers (exportacion a XLSX)

## Scripts
- `npm run dev`: inicia el servidor de desarrollo
- `npm run build`: build de produccion
- `npm run preview`: previsualiza el build
- `npm run lint`: lint del proyecto

## Notas
El estado de autenticacion y preferencias de UI (tema/idioma) se guardan en localStorage.
