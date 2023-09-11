import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//exporting the function as an asynchronous function that takes in an argument
export const putDb = async (content) => {
  //console log message to putting data into database
  console.log('PUT to the database');
  //uses openDB function to open IndexedDB database named jate
  const jateDb = await openDB('jate', 1);
  //the transaction is created on the 'jate' object store of the opened database. The 'rewrite' can read and write data
  const text = jateDb.transaction('jate', 'readwrite');
  //within the transaction the jate opject is accesed where teh data will be stored or updated
  const store = text.objectStore('jate');
  //the put method of the object store is used to add or update data and it sepcifies the object to 
  //be added or updated with an id of 1 and content provided as the value
  const request = store.put({ id: 1, value: content });
  //await method is used to complete the put operation with a request promise. The result varible contains info about the operation
  const result = await request;
  //logging a message that indicates that the data has been saved to the database
  console.log('data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //logging a message to indicate that its attempting to retreive data from the database
  console.log('GET from the database');
  //uses the openDB function to open an IndexedDB databse and name it 'jate' with verion 1.
  //function returns a promise that resolves to the database object 'jateDb, wehn the database is successfully opened
  const jateDb = await openDB('jate', 1);
  //within the database, a transaction is created with a 'readonly' mode so you can only read it
  const text = jateDb.transaction('jate', 'readonly');
  //within the transaction, jate is accesed from where the data is retrieved.
  const store = text.objectStore('jate');
  //the get method is used to retrieve data from the object store. Getting id of 1
  const request = store.get(1);
  //await the completion of the get operation by awaiting the request promise.
  //the result variable will contain the retrieved data or undefined if the data is not found
  const result = await request;

  //whethere the data is found, the code logs either a success message or say it was not found.
  result
    ? console.log('data successfully retrieved', result.value)
    : console.log('data not found');
    return result?.value;
  };
initdb();
