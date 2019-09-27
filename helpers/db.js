import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

const getTransactionPromise = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      )
    });
  });
};

export const init = () =>
  getTransactionPromise(`CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL , image TEXT NOT NULL, address TEXT, lat REAL, lng REAL)`);

export const insertPlace = (params) =>
  getTransactionPromise(`INSERT INTO places (title, image, address, lat, lng) VALUES (?,?,?,?,?)`, params);

export const selectPlaces = () =>
  getTransactionPromise(`SELECT * FROM places`);

export const deletePlaceById = (id) =>
  getTransactionPromise(`DELETE FROM places WHERE id=${id}`);

