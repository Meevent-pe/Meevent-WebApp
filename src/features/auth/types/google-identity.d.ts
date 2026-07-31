interface GoogleCredentialResponse {
    credential: string;
}

interface GoogleIdConfiguration {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
}

interface GoogleButtonConfiguration {
    theme: "outline";
    size: "large";
    text: "continue_with";
    locale: "es";
    width: number;
}

interface GoogleIdentityApi {
    initialize(configuration: GoogleIdConfiguration): void;
    renderButton(parent: HTMLElement, options: GoogleButtonConfiguration): void;
}

interface GoogleAccountsApi {
    id: GoogleIdentityApi;
}

interface GoogleIdentityServices {
    accounts: GoogleAccountsApi;
}

interface Window {
    google?: GoogleIdentityServices;
}
