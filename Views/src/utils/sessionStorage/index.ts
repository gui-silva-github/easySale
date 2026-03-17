const ABERTURA_ID_KEY = 'easysale_aberturaId';

export const getStoredAberturaId = (): string | null =>
  typeof window !== 'undefined' ? sessionStorage.getItem(ABERTURA_ID_KEY) : null;

export const setStoredAberturaId = (id: string | null): void => {
  if (typeof window === 'undefined') return;
  if (id) sessionStorage.setItem(ABERTURA_ID_KEY, id);
  else sessionStorage.removeItem(ABERTURA_ID_KEY);
};