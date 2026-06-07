export async function initMocks() {
    if (typeof window === "undefined") return;

    if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true") {
        const { worker } = await import("./browser");

        await worker.start({
            onUnhandledRequest: "bypass",
        });

        console.log("✨ [MSW] Mock Service Worker activado y listo.");
    }
}
