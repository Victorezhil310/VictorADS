export type ConsentState = 'UNKNOWN' | 'ACCEPTED' | 'DENIED' | 'WITHDRAWN';

export interface ConsentPreferences {
  analytics: boolean;
  personalizedAds: boolean;
  functional: boolean;
  state: ConsentState;
  updatedAt: string;
}

const STORAGE_KEY = 'user_consent_preferences_v1';

export class ConsentManager {
  private static defaultPreferences: ConsentPreferences = {
    analytics: false,
    personalizedAds: false,
    functional: true, // Essential cookies/tracking always required
    state: 'UNKNOWN',
    updatedAt: new Date().toISOString()
  };

  /**
   * Retrieves the current consent preferences from local storage or returns UNKNOWN defaults.
   */
  public static getConsent(): ConsentPreferences {
    if (typeof window === 'undefined') {
      return this.defaultPreferences;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return this.defaultPreferences;
      const parsed = JSON.parse(stored);
      return {
        ...this.defaultPreferences,
        ...parsed
      };
    } catch (e) {
      return this.defaultPreferences;
    }
  }

  /**
   * Updates consent preferences and persists to storage.
   */
  public static updateConsent(
    prefs: Partial<Omit<ConsentPreferences, 'updatedAt' | 'functional'>>,
    state: ConsentState
  ): ConsentPreferences {
    const current = this.getConsent();
    const updated: ConsentPreferences = {
      ...current,
      ...prefs,
      functional: true,
      state,
      updatedAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        // Dispatch custom event for client listener reactive updates
        window.dispatchEvent(new CustomEvent('consent_updated', { detail: updated }));
      } catch (e) {
        console.error('Failed to persist consent preferences', e);
      }
    }

    return updated;
  }

  /**
   * Accepts all optional consent categories.
   */
  public static acceptAll(): ConsentPreferences {
    return this.updateConsent({ analytics: true, personalizedAds: true }, 'ACCEPTED');
  }

  /**
   * Rejects all non-essential consent categories.
   */
  public static denyAll(): ConsentPreferences {
    return this.updateConsent({ analytics: false, personalizedAds: false }, 'DENIED');
  }

  /**
   * Withdraws previously granted consent.
   */
  public static withdrawConsent(): ConsentPreferences {
    return this.updateConsent({ analytics: false, personalizedAds: false }, 'WITHDRAWN');
  }
}
