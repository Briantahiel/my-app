
Descripción del Proyecto.

App creada con app router.
Se implementa el uso de components Link para las rutas, grupo de rutas, enrutamiento anidado, layouts compartidos, estados de carga, manejo de errores, componente side client, uso de apis y más.

Configuración de Firebase.
Luego de haber creado la aplicación en Firebase procedo a instalar npm install firebase en mi app
Continuo con los procedimientos para implementar la autenticación utilizando Google: https://firebase.google.com/docs/auth/web/google-signin?hl=es-419


Diccionario de datos:
Documentos:
postId (Identificador único de la publicación)
title: Título de la publicación (String)
content: Contenido de la publicación (String)
author: ID del autor de la publicación (String)
createdAt: Fecha y hora de creación de la publicación (Timestamp)
Subcolección "comments":
commentId (Identificador único del comentario)
text: Contenido del comentario (String)
author: ID del autor del comentario (String)
createdAt: Fecha y hora de creación del comentario (Timestamp)
Subcolección "responses" (Para respuestas a comentarios):
responseId (Identificador único de la respuesta)
text: Contenido de la respuesta (String)
author: ID del autor de la respuesta (String)
createdAt: Fecha y hora de creación de la respuesta (Timestamp)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
