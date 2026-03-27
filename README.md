# 🧢 POKEMON-APP

![DEMO](src/assets/images/Animation.gif)

## 📖 Descripción

Pokemon App es una aplicación web desarrollada con React que permite explorar, buscar y gestionar Pokémon.
Incluye funcionalidades CRUD completas (crear, leer, actualizar y borrar Pokémon) usando Firebase como backend.

Además, cuenta con características extra como modo oscuro, paginación, filtros y (opcionalmente) autenticación de usuarios para gestionar favoritos.

 ## 🚀 Features

 ### ✅ MVP

- Homepage con listado de Pokémon
- Página de detalles
- Añadir Pokémon (Firebase)
- Editar Pokémon
- Eliminar Pokémon con confirmación

### ✨ Extras
- 🔍 Filtro por nombre
- 🌙 Modo oscuro / claro
- 📄 Paginación
- 🎲 Pokémon aleatorios
- ❤️ Sistema de favoritos (con login)

## ⚙️ Instalación

1. Clonar el repositorio

   ```
    git https://github.com/Poke-Dex-App/Pokemon-App.git
    cd  pokemon-app
    npm install
   ```

2.  Ejecutar la app

    ```
    npm run dev
    ```

## 🌐 Demo

 https://pokemon-app-three.vercel.app/


## 📁 Estructura del proyecto

```
pokemon-app/
│
              
├── public/                 # Archivos públicos
├── src/
│   ├── firebase/           # Configuración de Firebase
│   │   └── client.js
│   ├── assets/             # Imagenes del proyecto
│   │   └── Images
│   │
│   ├── components/         # Componentes reutilizables
│   │   ├── Footer
│   │   ├── HamburgerMenu
│   │   ├── Header
│   │   ├── Loader
│   │   ├── Login
│   │   ├── NavBar
│   │   ├── PokemonCard
│   │   ├── SearchBar
│   │   ├── ThemeToggle
│   │   └── User
│   │
│   ├── pages/              # Páginas principales
│   │   ├── AboutPage
│   │   ├── AddPokemonPage
│   │   ├── EditPokemonPage
│   │   ├── FavouritesPage
│   │   ├── NotFoundPage
│   │   ├── PokeListDetails
│   │   └── PokeListPage
│   │
│   └── App.jsx
│
├── package.json
└── README.md

```

### 🛠️ Tech Stack
- React + Vite
- React Router
- Firebase (Database + Auth)
- Axios
