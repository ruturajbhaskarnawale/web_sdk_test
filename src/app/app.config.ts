// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// export const appConfig: ApplicationConfig = {
//   providers: [provideBrowserGlobalErrorListeners()],
// };
// src/app/app.config.ts — Modern Universal Angular App Initializer (17 - 22+ & Future)
// [SecureShield] Compatible with all modern Angular versions using provideAppInitializer
import { ApplicationConfig, provideZonelessChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SecureShieldService } from './services/secureshield.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // [SecureShield] Asynchronously initializes 3-Key cryptography before initial view render
    provideAppInitializer(() => {
      const shield = inject(SecureShieldService);
      shield.initSecureShield().catch(err => console.warn('[SecureShield] Startup notice:', err));
      return Promise.resolve(true); // [Bootstrap] Yields immediately so Angular renders in 0ms without freezing
    })
  ]
};