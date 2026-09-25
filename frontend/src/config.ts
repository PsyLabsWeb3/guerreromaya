// Existing beta destination from the original landing. Override when production is ready.
const configured = import.meta.env.VITE_DAPP_URL || 'https://gm-dapp-beta.vercel.app';
const parsed = new URL(configured);
if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('VITE_DAPP_URL must be an HTTP(S) URL');
export const dappUrl = (path = '') => `${configured.replace(/\/$/, '')}${path}`;
