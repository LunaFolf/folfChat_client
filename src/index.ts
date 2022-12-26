import './styles/app.styl'
window.store = require('./state').default
import { generateChatFromHistory } from './utils/generate/chat'
import { toggleChat, toggleLogin } from './utils/dom'
require('./registers')

const existingToken = localStorage.getItem('token')
const existingUsername = localStorage.getItem('username')

if (existingToken && existingUsername) {
  window.store.actions.setToken(existingToken)
  window.store.actions.setUsername(existingUsername)
  toggleChat(true)
  toggleLogin(false)

  generateChatFromHistory();
}

const hasNotificationPermission = Notification.permission === 'granted'

if (!hasNotificationPermission) {
  Notification.requestPermission()
}