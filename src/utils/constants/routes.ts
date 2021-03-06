export enum ERoutes {
  'START' = '/',
  'REGISTER' = '/register',
  'LOGIN' = '/login',
  'LOGOUT' = '/logout',
  'GAME' = '/game',
  'LEADERBOARD' = '/leaderboard',
  'PROFILE' = '/profile',
  'FORUM' = '/forum',
  'ERROR_500' = '/500',
  'OFFLINE' = '/offline',
  'FALLBACK' = '*'
}

export const apiPath = '/api/v1';

export const serverRoutes = {
  TOPICS: `${apiPath}/topics`,
  MESSAGES: `${apiPath}/messages`,
  TOPIC: `${apiPath}/topic`,
  MESSAGE: `${apiPath}/message`,
  TOGGLE_THEME: `${apiPath}/toggleTheme`,
  THEME: `${apiPath}/theme`
};
