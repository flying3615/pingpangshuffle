
const DB_Name = 'Empire Table Tennis'
const STORE_NAME = 'players'
class DBHelper {
    constructor(idb) {
        this.idb = idb
        this.idb.open(DB_Name, 1, upgradeDb => {
            if (!upgradeDb.objectStoreNames.contains(STORE_NAME)) {
                console.log('making a new object store');
                const playerStore = upgradeDb.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                playerStore.createIndex('firstName, lastName', ['firstName', 'lastName'])
            }
        })
    }

    addPlayer(player) {
        return this._openDBHandler((players) => {return players.add(player)}, 'readwrite')
    }

    findPlayerByName(name) {
        return this._openDBHandler((players) => {
            const keyRng = IDBKeyRange.only(name.split(" "));
            return players.index('firstName, lastName').openCursor(keyRng)
        }, 'readonly')
    }

    findAllPlayers() {
        return this._openDBHandler((players)=>{return players.getAll()},'readonly')
    }


    _openDBHandler(cb, operation) {
        return this.idb.open(DB_Name, 1).then(db => {
            const tx = db.transaction(STORE_NAME, operation);
            const players = tx.objectStore(STORE_NAME);
            return cb(players)
        })
        
    }

}

export default DBHelper