import { isBrowser } from '../utils/browser';

export function getLocalStorage(key: string): string | null {
  if (!isBrowser) return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setLocalStorage(key: string, value: string): void {
  if (!isBrowser) return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    console.log('ERROR');
  }
}

export function removeLocalStorage(key: string): void {
  if (!isBrowser) return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    console.log('ERROR');
  }
}
