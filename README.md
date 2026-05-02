# Summarize AI — практичний проєкт Next.js + Strapi

## Опис проєкту

**Summarize AI** — це full-stack вебзастосунок, реалізований відповідно до теми практикуму за туторіалом Strapi:  
**Epic Next.js 15 Tutorial: Learn Next.js by Building a Real-Life Project**.

Проєкт складається з двох основних частин:

- **Frontend** — застосунок на Next.js;
- **Backend** — Headless CMS на Strapi.

Основна ідея застосунку: користувач може зареєструватися, увійти в систему, завантажити зображення профілю, створювати AI summary для YouTube-відео, зберігати результати у Strapi, переглядати, редагувати, видаляти summaries, а також шукати їх і перегортати сторінки через pagination.

---

## Реалізована функціональність

У проєкті реалізовано такі частини відповідно до практикуму:

- головна сторінка з контентом зі Strapi;
- Dynamic Zone для блоків головної сторінки;
- Hero Section;
- Features Section;
- Global Single Type для Header/Footer;
- навігація та footer з даними зі Strapi;
- сторінки Sign Up / Sign In;
- автентифікація через Strapi Users & Permissions;
- збереження JWT у httpOnly cookie;
- protected routes через middleware;
- dashboard для авторизованого користувача;
- profile page;
- upload зображення профілю;
- генерація summary для YouTube-відео через AI;
- збереження summary у Strapi;
- список summaries;
- перегляд окремого summary;
- редагування summary;
- видалення summary;
- пошук summaries;
- pagination;
- деплой backend на Strapi Cloud;
- деплой frontend на Vercel.

---

## Технології

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Server Actions
- Middleware
- AI SDK / OpenAI API

### Backend

- Strapi 5
- SQLite для локальної розробки
- Strapi Users & Permissions
- Strapi Upload Plugin
- Strapi Cloud для deployment

### Deployment

- Frontend: Vercel
- Backend: Strapi Cloud
- Repository: GitHub

---

## Структура проєкту

```txt
practice2-3
├── backend
│   ├── config
│   ├── database
│   ├── public
│   ├── src
│   │   ├── api
│   │   │   ├── global
│   │   │   ├── home-page
│   │   │   └── summary
│   │   ├── components
│   │   │   ├── layout
│   │   │   └── shared
│   │   └── extensions
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── app
│   │   │   ├── (auth)
│   │   │   ├── (protected)
│   │   │   └── api
│   │   ├── components
│   │   ├── data
│   │   ├── lib
│   │   └── types.ts
│   └── package.json
│
└── README.md