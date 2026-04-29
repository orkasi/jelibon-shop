export type CompletedOrder = {
  orderNumber: string;
  email: string;
  total: number;
};

const STORAGE_KEY = "jelibon-last-order";

export const saveCompletedOrder = (order: CompletedOrder) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
};

export const readCompletedOrder = (): CompletedOrder | null => {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CompletedOrder;
  } catch {
    return null;
  }
};
