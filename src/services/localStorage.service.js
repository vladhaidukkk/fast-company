const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const USERID_KEY = 'local_user_id';
const EXPIRES_KEY = 'jwt-expires';

export const setTokens = ({
  idToken,
  refreshToken,
  localId,
  expiresIn = 3600,
}) => {
  const expiresDate = Date.now() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const getUserId = () => localStorage.getItem(USERID_KEY);

export const getTokenExpiresDate = () => localStorage.getItem(EXPIRES_KEY);

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(EXPIRES_KEY);
};

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getUserId,
  getTokenExpiresDate,
  removeTokens,
};

export default localStorageService;
