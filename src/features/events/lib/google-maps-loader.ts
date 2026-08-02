import type { GoogleMapsApi } from "@/features/events/types/google-maps.types";

interface MapsWindow {
    google?: GoogleMapsApi;
    __meeventGoogleMapsLoaded?: () => void;
}

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;

export function loadGoogleMaps(apiKey: string): Promise<GoogleMapsApi> {
    const mapsWindow = window as unknown as MapsWindow;
    if (mapsWindow.google?.maps) {
        return Promise.resolve(mapsWindow.google);
    }

    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = new Promise((resolve, reject) => {
        mapsWindow.__meeventGoogleMapsLoaded = () => {
            if (!mapsWindow.google?.maps) {
                reject(new Error("Google Maps no se inicializó correctamente."));
                return;
            }
            resolve(mapsWindow.google);
        };

        const script = document.createElement("script");
        const params = new URLSearchParams({
            key: apiKey,
            v: "weekly",
            loading: "async",
            language: "es",
            region: "PE",
            callback: "__meeventGoogleMapsLoaded",
        });
        script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
        script.async = true;
        script.onerror = () => {
            googleMapsPromise = null;
            reject(new Error("No se pudo cargar Google Maps."));
        };
        document.head.appendChild(script);
    });

    return googleMapsPromise;
}
