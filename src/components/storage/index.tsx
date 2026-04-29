import createWebStorage from "redux-persist/lib/storage/createWebStorage";

type NoopStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<string>;
  removeItem(key: string): Promise<void>;
};

const createNoopStorage = () => {
  return {
    getItem(key: string) {
      void key;
      return Promise.resolve(null);
    },
    setItem(key: string, value: string) {
      void key;
      return Promise.resolve(value);
    },
    removeItem(key: string) {
      void key;
      return Promise.resolve();
    },
  } satisfies NoopStorage;
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
