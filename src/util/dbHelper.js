
const DB_Name = 'Empire Table Tennis'
const STORE_NAME = 'players'
class DBHelper {
    constructor(idb) {
        this.idb = idb

        const request = this.idb.open(DB_Name, 1)

        request.onupgradeneeded = e=> {
            const db = e.target.result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                console.log('making a new object store');
                const playerStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                playerStore.createIndex('firstName, lastName', ['firstName', 'lastName'])
            }
        }
        request.onsuccess = () => console.log('running onsuccess')
    }

    addPlayer(player,cb) {

        const request = this.idb.open(DB_Name, 1)

        request.onsuccess = (event) => {
            const db = event.target.result
            const tx = db.transaction([STORE_NAME], 'readwrite');
            const players = tx.objectStore(STORE_NAME);
            tx.oncomplete = () => db.close
            players.add(player)
            cb(players.add(player))
        }
    }

    findPlayerByName(name, cb) {
        
        const request = this.idb.open(DB_Name, 1)

        request.onsuccess = (event) => {
            const db = event.target.result
            const tx = db.transaction([STORE_NAME], 'readonly');
            const players = tx.objectStore(STORE_NAME);
            tx.oncomplete = () => db.close
            const keyRng = IDBKeyRange.only(name.split(" "));
            const q1 = players.index('firstName, lastName').openCursor(keyRng)
            q1.onsuccess = () => cb(q1.result)
        }
    }

    findAllPlayers(cb) {

        const request = this.idb.open(DB_Name, 1)

        request.onsuccess = (event) => {
            const db = event.target.result
            const tx = db.transaction([STORE_NAME], 'readonly');
            const players = tx.objectStore(STORE_NAME);
            tx.oncomplete = () => db.close
            const q1 = players.getAll()
            q1.onsuccess = ()=>cb(q1.result)
        }

    }

}

export default DBHelper