import { http, HttpResponse } from "msw";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const handlers = [
    http.get(`${BASE_URL}/users`, () => {
        console.log("📖 [MSW] Interceptado GET /users");
        return HttpResponse.json([
            { id: 1, name: "Jhon", role: "Admin" },
            { id: 2, name: "Jane", role: "User" },
        ]);
    }),

    http.post(`${BASE_URL}/users`, async ({ request }) => {
        const requestBody = await request.json();
        console.log("💾 [MSW] Interceptado POST /users", requestBody);

        return HttpResponse.json(
            {
                success: true,
                message: "Usuario creado con éxito (Mock)",
                data: requestBody,
            },
            { status: 201 }
        );
    }),

    http.post(`${BASE_URL}/auth/google`, async ({ request }) => {
        const body = (await request.json()) as { token: string };

        console.log("🔹 [MSW] Interceptada llamada a Spring Boot en /auth/google.");
        console.log("🔹 [MSW] ID Token verídico de Google recibido:", body.token);

        const mockMeeventToken = "ey.mockTokenPayload.signature";

        return new HttpResponse(
            JSON.stringify({
                success: true,
                message: "Autenticación exitosa",
            }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": `token=${mockMeeventToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
                },
            }
        );
    }),
];
