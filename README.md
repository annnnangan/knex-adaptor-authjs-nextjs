# Background

Hoping to use [auth.js](https://authjs.dev/) for authentication for my [Next.js](https://nextjs.org/) side project, I find that there is no official adaptor for [Knex](https://knexjs.org/), which is the tool that I am using to interact with my postgresql database.

Understand that auth.js provide flexibility to create our [own custom adaptor](https://next-auth.js.org/tutorials/creating-a-database-adapter) if there is no official one, it is still a bit confusing on how to do it until I found this [package](https://github.com/travishorn/authjs-knexjs-adapter/tree/master) provided by travishorn and his detailed explanation [here](https://travishorn.com/introducing-the-knex-adapter-for-authjs). I took the source code and modify the adaptor to fit in the naming convention that I am currently using for my database.

Also, I made a simple register and login form component. When user logins, they will be redirected to the settings page and the session will be dropped in the cookies. Users cannot go back to register or login page when they successfully login. The settings is built following [this tutorial](https://www.youtube.com/watch?v=1MTyCvS05V4) and modified a bit to fit in the tech that I am using.

# Built With

- Next.js v15
- NextAuth.js v5
- Knex

# Getting Started

1. Clone the project
2. Run `npm install`
3. Create an `.env.local` file with below variables

   ```jsx
   POSTGRES_DB=
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_HOST=
   NEXTAUTH_SECRET=
   ```

   The `NEXTAUTH_SECRET` is created by typing this command `openssl rand -base64 33` in your terminal.

4. Run `npm run data` to create the all the tables needed. There might be an error stating there is no seed file. No worry about this. It doesn’t affect the current project.
5. Run `npm run dev` to start the project
6. Go to [`localhost:3000/auth/register`](http://localhost:3000/auth/register) to register the account
7. Go to `localhsot:3000/auth/login` to login and you will be redirected to settings page after login
8. Right click insepctor > application, you could find the cookie with `authjs.session-token`

# Resources

- Original [package source code](https://github.com/travishorn/authjs-knexjs-adapter/tree/master) and [detailed explanation](https://travishorn.com/introducing-the-knex-adapter-for-authjs) from travishorn
- [Next Auth v5 tutorial](https://www.youtube.com/watch?v=1MTyCvS05V4)
