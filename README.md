# Ping TCG

This repository contains a **Next.js** project for managing decks and cards, with authentication powered by NextAuth and a Prisma-backed database.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Access to project environment credentials (you should have received these via email)

### Setup

1. **Clone the repository**

    ```bash
    git clone <repo-url>
    cd ping-tcg
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or yarn install
    ```

3. **Environment variables**
    - Fill the sample file with the values you received by email or generate your own.
    - Copy the sample file into the env file.
        ```bash
        cp .env.sample .env
        ```
    - Edit `.env` and add the provided credentials (e.g. database URL, NextAuth secret, GitHub OAuth keys, etc.).
    - **Do not commit** your `.env` file. It's excluded from version control.

4. **Prisma setup**
   If you're running the project locally and need to initialize the database:
    ```bash
    npx prisma migrate dev
    ```
    > This will create the development database using your `.env` configuration.

### Running the Project

To start the development server:

```bash
npm run dev
# or
# yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

### Additional Notes

- The project uses TypeScript and is configured via `tsconfig.json`.
- Authentication is handled via `NextAuth` with GitHub provider; make sure your GitHub OAuth keys are in `.env`.
- The Prisma schema is located at `prisma/schema.prisma`; migrations are stored under `prisma/migrations`.

---
