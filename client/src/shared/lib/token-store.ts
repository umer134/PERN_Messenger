
export class TokenStore {
  private static ACCESS_KEY = 'accessToken';
  private static REFRESH_KEY = 'refreshToken';

  static getAccessToken() {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  static setTokens(data:{
    accessToken: string;
    refreshToken?: string;
  }) {
    localStorage.setItem(
      this.ACCESS_KEY,
      data.accessToken
    );

    if(data.refreshToken) {
      localStorage.setItem(
        this.REFRESH_KEY, 
        data.refreshToken
      );
    }
  }

  static clear() {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }
}