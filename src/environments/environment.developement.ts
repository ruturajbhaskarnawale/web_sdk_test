// src/environments/environment.development.ts (Local Dev Configuration)
export const environment = {
  production: false,
  secureshield: {
    tenantId: 'TEN-KOTAKBANK-6241',
    appId: 'ast_web_221619',
    serverUrl: 'https://secureshield-api.testuat.com/api/v1/telemetry/ingest',
    headerKey: '<YOUR_HEADER_KEY>',
    encryptionKey: '<YOUR_ENCRYPTION_KEY>',
    initializationKey: '<YOUR_INIT_KEY>',
    environment: 'development' as const
  }
};