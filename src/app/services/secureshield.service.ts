// src/app/services/secureshield.service.ts — Universal Angular (17 - 22+ & Future Releases)
// [SecureShield] Compatible with any version of Angular using Standalone Components & Signals
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SecureShield, SecurityAuditReport } from '@jodetx_dev/secureshield-web';

@Injectable({
  providedIn: 'root'
})
export class SecureShieldService {
  private platformId = inject(PLATFORM_ID);
  private sdkInstance: any = null;

  // [Init] Reactive Signals (Angular 17, 18, 19, 20, 21, 22+)
  public isShieldActive = signal<boolean>(false);
  public trustScore = signal<number>(100);
  public lastReport = signal<(SecurityAuditReport & { trustScore?: number }) | null>(null);

  /**
   * Initializes SecureShield with 3-Key Cryptography Envelope
   */
  async initSecureShield(): Promise<SecurityAuditReport | null> {
    // [SecureShield] SSR Safety Guard
    if (!isPlatformBrowser(this.platformId)) return null;
    if (this.sdkInstance) return this.lastReport();

    try {
      this.sdkInstance = await SecureShield.init({
        headerKey: '<YOUR_HEADER_KEY>',
        encryptionKey: '<YOUR_ENCRYPTION_KEY>',
        initializationKey: '<YOUR_INIT_KEY>',
        tenantId: 'TEN-KOTAKBANK-6241',
        appId: 'ast_web_221619',
        serverUrl: 'https://secureshield-api.testuat.com/api/v1/telemetry/ingest',
        environment: 'production',            // [Config] Change environment: 'production' | 'staging' | 'development'
        enableRuntimeIntegrityWatchdog: true,
        enablePrototypeFreezing: false,        // [Success] Kept false for Angular Signals compatibility
        enableStorageLeakScrubber: false,      // [Success] Kept false on initial boot to keep main thread light
        enableTabBlurShield: false,
        enableDomLockoutOverlay: false,        // [Bootstrap] Set false in dev to prevent black screen & allow element inspection
        blockRedirectUrl: null,

        onTamperDetected: (apiName: string, reason?: string) => {
          console.warn(`[SecureShield Tamper Alert] ${apiName}: ${reason}`);
        },
        onRemediationTriggered: (action: string, reason?: string) => {
          console.warn(`[SecureShield Policy Action] ${action} — ${reason || 'Triggered'}`);
        }
      } as any);

      // [Optimized] Defer security scans so the initial page renders in 0ms without UI freezing
      setTimeout(async () => {
        try {
          const report = await this.sdkInstance.evaluateSecurityState();
          this.lastReport.set(report);
          this.trustScore.set(report.trustScore ?? 100);
          this.isShieldActive.set(true);
          console.log('[SecureShield] Initialized [Verified]. Trust Score:', report.trustScore);
        } catch (e) {
          console.warn('[SecureShield] Background evaluation notice:', e);
        }
      }, 50);

      return null;
    } catch (error) {
      console.error('[SecureShield] Initialization error:', error);
      return null;
    }
  }

  isCleanForTransaction(): boolean {
    if (!this.sdkInstance) return false;
    const audit = this.sdkInstance.runScan();
    return audit.verdict === 'SECURE' && (audit.risk_score || 0) < 50;
  }
}