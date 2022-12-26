// This file acts as a rudimentary store/state management system for the app.
// (Yes, I'm aware I could have imported something, but I wanted to minimize dependencies.)

const state: State = {
  _loading: false, // Whether or not the app is currently loading something.
  _history: [], // The chat history.
  _username: '', // The username of the user.
  _token: '' // The token of the user.
}

const getters: Getters = {
  isLoading (): boolean {
    // Returns whether or not the app is currently loading something.
    return state._loading
  },
  getHistory (): ChatMessage[] {
    // Returns the chat history.
    return state._history
  },
  getUsername (): string {
    // Returns the username of the user.
    return state._username
  },
  getToken (): string {
    // Returns the token of the user.
    return state._token
  }
}

const actions: Actions = {
  setLoading (loading: boolean): void {
    // Sets whether or not the app is currently loading something.
    state._loading = loading
  },
  addMessageToHistory (message: ChatMessage): void {
    // Adds a message to the chat history.
    state._history.push(message)
  },
  clearHistory (): void {
    // Clears the chat history.
    state._history = []
  },
  setUsername (username: string): void {
    // Sets the username of the user.
    localStorage.setItem('username', username)
    state._username = username
  },
  setToken (token: string): void {
    // Sets the token of the user.
    localStorage.setItem('token', token)
    state._token = token
  },
  clearAuth (): void {
    // Clears the token and username of the user.
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    state._token = ''
    state._username = ''
  }
}

export default { getters, actions }
