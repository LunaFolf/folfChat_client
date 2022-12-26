interface State {
  _loading: boolean;
  _history: ChatMessage[];
  _username: string;
  _token: string;
}

interface Getters {
  // Loading
  isLoading(): boolean;

  // History
  getHistory(): ChatMessage[];

  // Username
  getUsername(): string;

  // Token
  getToken(): string;
}

interface Actions {
  // Loading
  setLoading(loading: boolean): void;

  // History
  addMessageToHistory(message: ChatMessage): void;

  // Username
  setUsername(username: string): void;

  // Token
  setToken(token: string): void;

  // Auth
  clearAuth(): void;
}

interface SocketSendObject {
  type: 'login' | 'signup' | 'message' | 'update';
  token?: string;
  username?: string;
  content?: string;
}

interface Window {
    store: {
      state?: State;
      getters: Getters;
      actions: Actions;
    };
    chat: {
      socket: WebSocket;
      _send(data: SocketSendObject | string): void;
      login(token: string): void;
      signup(username: string): void;
      message(content: string): void;
      update(): void;
    };
  }
