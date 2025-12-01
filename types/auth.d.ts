export interface AuthState {
  isLoggedIn: boolean;
  githubUsername: string | null;
  theme: 'light' | 'dark';
}

export type AuthAction =
  | { type: 'LOGIN'; payload?: Partial<AuthState> }
  | { type: 'LOGOUT' }
  | { type: 'SET_GITHUB_USERNAME'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };
