export interface CloudinaryUploadSignature {
    cloudName: string;
    apiKey: string;
    signature: string;
    uploadUrl: string;
    params: Record<string, string>;
}

export type CloudinarySignatureResult =
    | { success: true; data: CloudinaryUploadSignature }
    | { success: false; message: string };

export interface UploadedEventBanner {
    secureUrl: string;
    publicId: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
}
