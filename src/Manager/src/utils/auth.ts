// src/utils/auth.ts
export const getCleanToken = () => {
  const raw = localStorage.getItem("token") || "";
  return raw.startsWith("Bearer ") ? raw.slice(7) : raw;
};
