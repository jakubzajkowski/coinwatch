interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_WS_API_URL: string;
    readonly VITE_GRAPHQL_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}