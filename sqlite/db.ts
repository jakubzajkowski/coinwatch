
import * as SQLite from "expo-sqlite";


const test = async () =>{
    const db = await SQLite.openDatabaseAsync('gymfit.db');
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    INSERT INTO test (value, intValue) VALUES ('test1', 123);
    INSERT INTO test (value, intValue) VALUES ('test2', 456);
    INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);

    const firstRow = await db.getFirstAsync('SELECT * FROM test');
    // @ts-ignore
    const allRows = await db.getAllAsync('SELECT * FROM test');
    for (const row of allRows) {
        // @ts-ignore
        console.log(row.id, row.value, row.intValue);
    }
}

export default test