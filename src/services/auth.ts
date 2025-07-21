import { v4 as uuidv4 } from 'uuid';

const USER_ID_COOKIE = 'ai_mentor_user_id';

class AuthService {
  /**
   * Get user ID from cookies or create a new one
   */
  getUserId(): string {
    if (typeof window === 'undefined') {
      // Server-side rendering - return temporary ID
      return 'temp-user';
    }

    let userId = this.getCookie(USER_ID_COOKIE);
    
    if (!userId) {
      userId = this.generateUserId();
      this.setUserIdCookie(userId);
    }
    
    return userId;
  }

  /**
   * Generate a new unique user ID
   */
  private generateUserId(): string {
    return uuidv4();
  }

  /**
   * Set user ID cookie with forever expiration
   */
  private setUserIdCookie(userId: string): void {
    if (typeof window === 'undefined') return;
    
    // Set cookie to expire in 100 years (effectively forever)
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 100);
    
    document.cookie = `${USER_ID_COOKIE}=${userId}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  /**
   * Get cookie value by name
   */
  private getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || null;
    }
    
    return null;
  }

  /**
   * Clear user ID cookie (for future logout functionality)
   */
  clearUserId(): void {
    if (typeof window === 'undefined') return;
    
    document.cookie = `${USER_ID_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Check if user is authenticated (has valid user ID)
   */
  isAuthenticated(): boolean {
    const userId = this.getUserId();
    return userId !== null && userId !== 'temp-user';
  }
}

export const authService = new AuthService();