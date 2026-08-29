let currentToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

export const authStore = {
  setToken: (t: string | null) => { currentToken = t; },
  getToken: () => currentToken,
  setUnauthorizedHandler: (fn: () => void) => { onUnauthorized = fn; },
  getUnauthorizedHandler: () => onUnauthorized
};