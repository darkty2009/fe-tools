import Dexie from 'dexie';

let db = new Dexie("Events");
db.version(1).stores({
    events:"++id,name,title,start_time,end_time,status"
});

export default db;