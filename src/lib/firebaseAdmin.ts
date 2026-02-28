import * as admin from "firebase-admin";

function formatPrivateKey(key: string | undefined) {
    if (!key) return undefined;

    const strippedKey = key.replace(/^["']|["']$/g, "");

    return strippedKey.replace(/\\n/g, "\n");
}

function getFirebaseAdmin() {
    if (admin.apps.length > 0) {
        return admin.app();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    // Si faltan las credenciales, no inicializar para desarrollo local
    if (!projectId || !clientEmail || !privateKey) {
        console.warn(
            "Firebase: variables de entorno no configuradas (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). Firestore no estará disponible."
        );
        return null;
    }

    return admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
}

const adminApp = getFirebaseAdmin();

export const db: FirebaseFirestore.Firestore | null = adminApp
    ? adminApp.firestore()
    : null;
