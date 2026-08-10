import {
    EVENT_BANNER_ALLOWED_MIME_TYPES,
    EVENT_BANNER_MAX_ASPECT_RATIO,
    EVENT_BANNER_MAX_BYTES,
    EVENT_BANNER_MAX_DIMENSION,
    EVENT_BANNER_MIN_ASPECT_RATIO,
    EVENT_BANNER_MIN_HEIGHT,
    EVENT_BANNER_MIN_WIDTH,
} from "@/features/events/constants/event-banner.constants";

export interface EventBannerMetadata {
    width: number;
    height: number;
}

function readImageMetadata(file: File): Promise<EventBannerMetadata> {
    return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({ width: image.naturalWidth, height: image.naturalHeight });
        };
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("No se pudo leer la imagen seleccionada."));
        };
        image.src = objectUrl;
    });
}

export async function validateEventBannerFile(file: File): Promise<EventBannerMetadata> {
    if (!EVENT_BANNER_ALLOWED_MIME_TYPES.includes(file.type as never)) {
        throw new Error("El banner debe estar en formato JPEG, PNG o WebP.");
    }

    if (file.size > EVENT_BANNER_MAX_BYTES) {
        throw new Error("El banner no puede pesar más de 5 MB.");
    }

    const metadata = await readImageMetadata(file);
    if (metadata.width < EVENT_BANNER_MIN_WIDTH || metadata.height < EVENT_BANNER_MIN_HEIGHT) {
        throw new Error("El banner debe medir al menos 1200 × 675 píxeles.");
    }

    if (
        metadata.width > EVENT_BANNER_MAX_DIMENSION ||
        metadata.height > EVENT_BANNER_MAX_DIMENSION
    ) {
        throw new Error("El banner no puede superar 6000 píxeles por lado.");
    }

    const aspectRatio = metadata.width / metadata.height;
    if (
        aspectRatio < EVENT_BANNER_MIN_ASPECT_RATIO ||
        aspectRatio > EVENT_BANNER_MAX_ASPECT_RATIO
    ) {
        throw new Error("Usa una imagen horizontal entre 3:2 y 2:1; recomendamos 16:9.");
    }

    return metadata;
}
