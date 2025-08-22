export function env(key: string, fallback?: string): string {
  const v = process.env[key];
  if (v && v.length) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing env var: ${key}`);
}
