export class TokenStore {
  private static ACCESS_KEY = 'accessToken';

  static getAccessToken() {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  static setAccessToken(token: string) {
    localStorage.setItem(
      this.ACCESS_KEY,
      token
    );
  }

  static clear() {
    localStorage.removeItem(
      this.ACCESS_KEY
    );
  }
}