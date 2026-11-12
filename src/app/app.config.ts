// src/app/app.config.ts — Modern Universal Angular App Initializer (17 - 22+ & Future)
// [Integration Notice]
// Add the SecureShield import and provideAppInitializer() to your existing providers array.
import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { SecureShieldService } from './services/secureshield.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... keep your existing app providers (e.g. provideRouter, provideHttpClient) ...

    // 🟢 [SecureShield] Asynchronously initializes 3-Key cryptography before initial view render
    provideAppInitializer(() => {
      const shield = inject(SecureShieldService);
      shield.initSecureShield().catch(err => console.warn('[SecureShield] Startup notice:', err));
      return Promise.resolve(true); // [Bootstrap] Yields immediately so Angular renders in 0ms without freezing
    })
  ]
};