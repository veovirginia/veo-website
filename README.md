# Virginia Entrepreneurship Organization

Platform and website for VEO @ University of Virginia.

## Technologies

- Next.js
- React.js
- TypeScript
- TailwindCSS
- MongoDB w/ Prisma

## Services

- Mailgun
- Doppler

## Local Development

### Getting Started

First, install project dependencies:

```bash
npm install
```

To manage secrets, this project uses [Doppler](https://doppler.com). Make sure you have a Doppler account and are invited to the team. Then, log in to Doppler:

> Make sure to scope the workspace directory to the project root directory.

```bash
doppler login
```

Set up the Doppler environment for local development:

```bash
doppler setup
```

> Select the `dev` environment

On project initialization and **after any modifications to `prisma.schema`**, make sure to generate database typings:

```bash
npm run generate
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the local website.

### Adding Dependencies

To add new dependencies to the project, run the following:

```bash
npm install <package>
```

### Database

To open the Prisma database manager:

```bash
npm run studio
```

To generate database typings:

```bash
npm run generate
```

## Additional Notes

When signing in with email, the sign in link may sometimes be delayed to be sent to your inbox or get blocked. Although this is uncommon, this can still happen due to the nature of Outlook blocking Mailgun emails. If this is the case, please **do not spam** sign in attempts. Wait at least 5 minutes, then try again.

## Learn More

To learn more about our stack and services, check out the following links:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TailwindCSS Documentation](https://tailwindcss.com) - learn about TailwindCSS
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma ORM
