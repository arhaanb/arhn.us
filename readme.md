# Shrtn

> A URL shortener using Airtable and Vercel serverless functions. Available at [arhn.us](https://arhn.us) or [arhaan.xyz](https://arhaan.xyz).

- Clone [this Airtable Base](https://airtable.com/shrefiKHOJcj1qBnp) to get started
- Fill up the `.env.sample` file and rename it to .env
- Deploy to [Vercel](https://vercel.com) and add a domain

> Note: The `SHRTN` constant in the `.env.sample` is a hashed password. To generate a hashed password, check [`password.js`](./password.js)

## Functionality

- Enable/Disable links directly through Airtable
- Easily add links to Airtable via a password protected form ([arhn.us/shrtn](https://arhn.us/shrtn))
- Generate random URIs through Airtable
- Nested links (`/shortened/link`)
- Shorten GitHub Repo links -> /gh/${repository}
- Custom HTML 404 pages (instead of a `res.send(404)`)

Inspired by [someshkar/dotco](https://github.com/someshkar/dotco)
