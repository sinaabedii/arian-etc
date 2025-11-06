// Token management utilities for secure storage and retrieval

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export class TokenManager {
  /**
   * Store access token in memory and optionally in localStorage
   */
  static setAccessToken(token: string, remember: boolean = false): void {
    // Always store in sessionStorage for current session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
      
      // If remember me is true, also store in localStorage
      if (remember) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      }
    }
  }

  /**
   * Get access token from storage
   */
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Check sessionStorage first, then localStorage
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) || 
           localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  /**
   * Store refresh token
   */
  static setRefreshToken(token: string, remember: boolean = false): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
      
      if (remember) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
      }
    }
  }

  /**
   * Get refresh token from storage
   */
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) || 
           localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Store user data
   */
  static setUserData(userData: any, remember: boolean = false): void {
    if (typeof window !== 'undefined') {
      const userJson = JSON.stringify(userData);
      sessionStorage.setItem(USER_DATA_KEY, userJson);
      
      if (remember) {
        localStorage.setItem(USER_DATA_KEY, userJson);
      }
    }
  }

  /**
   * Get user data from storage
   */
  static getUserData(): any | null {
    if (typeof window === 'undefined') return null;
    
    const userJson = sessionStorage.getItem(USER_DATA_KEY) || 
                     localStorage.getItem(USER_DATA_KEY);
    
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    
    return null;
  }

  /**
   * Clear all tokens and user data
   */
  static clearAll(): void {
    if (typeof window !== 'undefined') {
      // Clear from sessionStorage
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      sessionStorage.removeItem(USER_DATA_KEY);
      
      // Clear from localStorage
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      
      // Also clear legacy user key
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  }

  /**
   * Check if user is authenticated (has valid access token)
   */
  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Check if token is expired (basic check without decoding)
   * Returns true if token is likely expired
   */
  static isTokenExpired(token: string): boolean {
    if (!token) return true;
    
    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      
      // Decode payload (second part)
      const payload = JSON.parse(atob(parts[1]));
      
      // Check expiration
      if (payload.exp) {
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() >= expirationTime;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  /**
   * Get token expiration time in milliseconds
   */
  static getTokenExpiration(token: string): number | null {
    if (!token) return null;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      
      if (payload.exp) {
        return payload.exp * 1000; // Convert to milliseconds
      }
      
      return null;
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  }
}
