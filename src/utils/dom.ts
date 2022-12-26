const toggleLogin = (show: Boolean): void => {
  const login = document.querySelector('.login__wrapper') as HTMLElement

  if (show) login.classList.remove('hidden')
  else login.classList.add('hidden')
}

const toggleChat = (show: Boolean): void => {
  const chat = document.querySelector('.chat__wrapper') as HTMLElement
  const chatBox = document.querySelector('.chat__box') as HTMLElement

  if (show) {
    chat.classList.remove('hidden')
    chatBox.classList.remove('hidden')
    window.chat.update()
  } else {
    chat.classList.add('hidden')
    chatBox.classList.add('hidden')
  }
}

const toggleAuthSuccess = (show: Boolean): void => {
  const authSuccess = document.querySelector('.auth__success') as HTMLElement

  if (show) authSuccess.classList.remove('hidden')
  else authSuccess.classList.add('hidden')
}

export { toggleLogin, toggleChat, toggleAuthSuccess }