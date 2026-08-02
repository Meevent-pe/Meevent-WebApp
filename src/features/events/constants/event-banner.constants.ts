export const EVENT_BANNER_MAX_BYTES = 5 * 1024 * 1024;
export const EVENT_BANNER_MIN_WIDTH = 1200;
export const EVENT_BANNER_MIN_HEIGHT = 675;
export const EVENT_BANNER_MAX_DIMENSION = 6000;
export const EVENT_BANNER_MIN_ASPECT_RATIO = 3 / 2;
export const EVENT_BANNER_MAX_ASPECT_RATIO = 2;

export const EVENT_BANNER_ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const EVENT_BANNER_ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp"] as const;
export const EVENT_BANNER_CLOUDINARY_FOLDER = "meevent/events/banners";
export const EVENT_BANNER_CLOUDINARY_TOO_LARGE_ERROR = "4135242880";
export const EVENT_BANNER_CLOUDINARY_SIZE_EVAL =
    `if(resource_info.bytes>${EVENT_BANNER_MAX_BYTES})` +
    `{throw new Error(${EVENT_BANNER_CLOUDINARY_TOO_LARGE_ERROR});}`;
