const generateAvatar = (username: string) => {
  return `https://avatars.dicebear.com/api/identicon/${username}.svg?b=%23ffffff22`
}

const createChatEl = (chatMessage: ChatMessage, ownMessage: Boolean, hideAvatar: Boolean): HTMLDivElement => {
  const chatEl = document.createElement('div');
  chatEl.classList.add('chat__item');

  chatEl.dataset.username = chatMessage.username;
  chatEl.dataset.previous = hideAvatar ? 'true' : 'false';

  if (ownMessage) chatEl.classList.add('self');

  const avatarEl = document.createElement('div');
  avatarEl.classList.add('chat__item__avatar');

  if (!hideAvatar) {
    const avatarIconEl = document.createElement('div');
    avatarIconEl.classList.add('avatar__icon');
    const avatarIconImageEl = document.createElement('img');
    avatarIconImageEl.src = generateAvatar(chatMessage.username);

    const avatarNameEl = document.createElement('div');
    avatarNameEl.classList.add('avatar__name');
    avatarNameEl.innerText = chatMessage.username;

    avatarIconEl.appendChild(avatarIconImageEl);
    avatarEl.appendChild(avatarIconEl);
    avatarEl.appendChild(avatarNameEl);
  }

  const chatContentEl = document.createElement('div');
  chatContentEl.classList.add('chat__item__content');
  chatContentEl.innerText = chatMessage.content;

  chatEl.appendChild(avatarEl);
  chatEl.appendChild(chatContentEl);

  return chatEl;
}

const generateChatFromHistory = (): void => {
  const chatHistory = window.store.getters.getHistory();
  console.debug('Generating chat from history: ', chatHistory)
  const chatListEl = document.getElementById('chat-grid') as HTMLDivElement;
  chatListEl.innerHTML = '';

  let previousUsername = '';

  chatHistory.forEach((message: ChatMessage) => {
    const ownMessage = message.username === window.store.getters.getUsername();
    const hideAvatar = message.username === previousUsername;
    const chatEl = createChatEl(message, ownMessage, hideAvatar);

    chatListEl.appendChild(chatEl);

    previousUsername = message.username;
  })
}

export { createChatEl, generateChatFromHistory }