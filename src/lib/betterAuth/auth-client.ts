import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000", // ou /api em produção
    basePath: "/auth",
});