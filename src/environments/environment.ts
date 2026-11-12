// src/environments/environment.ts (Production Configuration)
export const environment = {
  production: true,
  secureshield: {
    tenantId: 'TEN-KOTAKBANK-6241',
    appId: 'ast_web_221619',
    serverUrl: 'https://secureshield-api.testuat.com/api/v1/telemetry/ingest',
    headerKey: '<YOUR_HEADER_KEY>',
    encryptionKey: '<YOUR_ENCRYPTION_KEY>',
    initializationKey: '<YOUR_INIT_KEY>',
    environment: 'production' as const
  }
};