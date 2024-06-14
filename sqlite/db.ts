import * as SQLite from 'expo-sqlite';
import {SQLiteDatabase} from 'expo-sqlite';

const openDatabase = async () : Promise<SQLiteDatabase> => {
    return await SQLite.openDatabaseAsync('databaseName');
}


export default openDatabase;
