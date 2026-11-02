/** Public API of the auth module. Other modules import only from here. */
export { LogoutConfirm } from './components/LogoutConfirm'
export { useLogout } from './hooks/use-logout'
export { homePathFor, logout } from './services/auth.service'
