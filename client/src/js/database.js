import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  initdb();
console.error("putDb not implemented");

const jateDb = await openDB("jate", 1);

const text = jateDb.transaction("jate", "readwrite");

const store = tx.objectStore("jate");

const newContent = {jate: content };

store.put(newContent);

await text.done;

console.log("data saved to the database", newContent);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  initdb();
  console.error("getDb not implemented");

  const jateDb = await openDB("jate", 1);

  const text = jateDb.transaction("jate", "readonly");

  const store = text.objectStore("jate");

  const result = await store.get(1);

  if (result !== undefined) {
    console.log("data retrieved from the database", result.value);
    return result.value;
  } else {
    console.log("data not found in the database");
    return null;
  }
};
initdb();
