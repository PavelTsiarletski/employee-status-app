# 🧩 Employee Status Management System

A full-stack application to manage employee statuses such as `Working`, `On Vacation`, `Lunch Time`, and `Business Trip`.

---

## 📦 Project Structure

This project is organized as a monorepo using [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), with two main packages:

```
.
├── client/   # React + Vite frontend
├── server/   # Express backend
└── package.json (root with workspaces)
```

---

## 🚀 Getting Started

### 1. Install dependencies

From the root directory:

```bash
yarn install
```

This will install dependencies for both `client` and `server` workspaces.

---

### 2. Start the app

To start both frontend and backend in development mode:

```bash
yarn dev
```

This runs:

- `client` at [http://localhost:5173](http://localhost:5173)
- `server` at [http://localhost:8000](http://localhost:8000)

> Powered by [`concurrently`](https://www.npmjs.com/package/concurrently)

---

## 🛠 Tech Stack

- **Client**: React + TypeScript + Vite
- **Server**: Node.js + Express
- **Package Manager**: Yarn Workspaces
- **Styling**: CSS Modules

---

## 📂 Workspaces

| Workspace | Path     | Description            |
|-----------|----------|------------------------|
| client    | `client/`| React application UI   |
| server    | `server/`| Express REST API       |

---

## 📌 Features

- View and filter employees by status
- Search employees by name
- Change status of an employee
- Modal for creating new users (UI only)
- Fully responsive and clean UI
- Optimized rendering and minimal re-renders

---
