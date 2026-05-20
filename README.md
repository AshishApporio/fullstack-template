# Fullstack Template

A production-ready fullstack boilerplate built with:

- **Backend**: Node.js + Express + TypeScript + PostgreSQL
- **Frontend**: Next.js 14 + TypeScript + React Query + Tailwind CSS

## Getting Started

### Backend
```bash
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env.local   # fill in your values
npm install
npm run dev
```

## Project Structure

### Backend (`/backend/src`)
| Folder | Purpose |
|---|---|
| `config/` | DB connection, env validation |
| `middlewares/` | Auth, error handler, validator, rate limiter |
| `utils/` | Response helpers, pagination, JWT, bcrypt, logger |
| `types/` | Shared TypeScript types |
| `routes/` | Express route definitions |
| `controllers/` | Request handlers |
| `services/` | Business logic |
| `db/` | Migrations and query files |

### Frontend (`/frontend/src`)
| Folder | Purpose |
|---|---|
| `lib/` | Axios instance, React Query client |
| `providers/` | React Query provider |
| `hooks/` | useDebounce, usePagination, useLocalStorage |
| `utils/` | cn, format, storage, pagination helpers |
| `types/` | API response types, shared entities |
| `services/` | API call functions |
| `store/` | Zustand stores |
| `components/` | UI and common components |
