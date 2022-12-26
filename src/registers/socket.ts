import { createChatEl, generateChatFromHistory } from "../utils/generate/chat";
import { toggleAuthSuccess, toggleChat, toggleLogin } from "../utils/dom";

const chatListEl = document.getElementById('chat-grid') as HTMLDivElement;

const messageQueue: string[] = [];

const wss = new WebSocket('wss://api.jaxbot.co.uk:6982');

wss.onopen = () => {
  while (messageQueue.length > 0) {
    wss.send(messageQueue.shift() || '');
  }
}

wss.onmessage = event => {
  const { username, type, success } = JSON.parse(event.data);

  if (type === 'message') {
    const content = JSON.parse(event.data).content;
    const ownMessage = username === window.store.getters.getUsername();
    const lastChild = chatListEl.lastElementChild as HTMLDivElement;
    const hideAvatar = lastChild?.dataset.username === username;
    const chatEl = createChatEl(content, ownMessage, hideAvatar);

    chatListEl.appendChild(chatEl);

    const hasNotificationPermission = Notification.permission === 'granted';
    if (hasNotificationPermission && !ownMessage) {
      new Notification(`${username}`, {
        body: `${content}`,
        icon: `https://avatars.dicebear.com/api/identicon/${username}.svg?b=%23ffffff22`,
        tag: username
      })
    }
  }

  if (type === 'update') {
    if (!success) {
      console.log('Update failed');
      window.store.actions.clearAuth();
      toggleAuthSuccess(false);
      toggleLogin(true);
      toggleChat(false);
      return;
    }
    const history = JSON.parse(event.data).messageHistory;
    window.store.actions.clearHistory();
    history.forEach((message: ChatMessage) => {
      window.store.actions.addMessageToHistory(message);
    })

    generateChatFromHistory();
  }

  if (type === 'signup') {
    const token = JSON.parse(event.data).token;
    window.store.actions.setToken(token);

    const authTokenEl = document.querySelector('.auth__token') as HTMLDivElement;
    authTokenEl.innerText = token;

    toggleAuthSuccess(true);
    toggleLogin(false);
  }

  if (type === 'login') {
    const success = JSON.parse(event.data).success;
    if (success) {
      const username = JSON.parse(event.data).username;
      window.store.actions.setUsername(username);
      toggleChat(true);
      toggleLogin(false);
    } else {
      console.log('Login failed');
      window.store.actions.clearAuth();
    }
  }
}

window.chat = {
  socket: wss,
  _send (data: SocketSendObject | string) {
    console.debug('Sending data: ', data)
    if (typeof data !== 'string') data = JSON.stringify(data);

    if (wss.readyState === WebSocket.OPEN) {
      console.debug('Connection is open, sending data')
      this.socket.send(data);
    }
    else {
      console.debug('Connection is not open, adding data to queue')
      messageQueue.push(data);
    }
  },
  login (token: string) {
    this._send({
      type: 'login',
      token
    });
  },
  signup (username: string) {
    this._send({
      type: 'signup',
      username
    });
  },
  message (content: string) {
    this._send({
      type: 'message',
      content,
      token: window.store.getters.getToken()
    });
  },
  update () {
    this._send({
      type: 'update',
      token: window.store.getters.getToken()
    });
  }
};