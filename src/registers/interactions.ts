import { toggleAuthSuccess, toggleChat } from "../utils/dom";

const chatInputEl = document.querySelector('.chat__input') as HTMLInputElement;

chatInputEl.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const message = chatInputEl.value;

  if (message === '') return;

  chatInputEl.value = '';

  console.log('Sending message: ', message)
  window.chat.message(message);
});

const loginEl = document.getElementById('login__input') as HTMLInputElement;
const signupEl = document.getElementById('signup__input') as HTMLInputElement;

signupEl.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const username = signupEl.value;
  window.store.actions.setUsername(username);

  if (username === '') return;

  signupEl.value = '';

  window.chat.signup(username);
});

loginEl.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const token = loginEl.value;
  window.store.actions.setToken(token);

  if (token === '') return;

  loginEl.value = '';

  window.chat.login(token);
});

const authContinueBtn = document.querySelector('.auth__continue') as HTMLButtonElement;
authContinueBtn.addEventListener('click', () => {
  toggleAuthSuccess(false);
  toggleChat(true);
})