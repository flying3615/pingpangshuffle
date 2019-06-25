class DBHelper {

    constructor(db) {
        this.db = openDatabase('tPlayers', '1.0', 'all Players', 3 * 1024 * 1024);
    }

    getPlayerByName(name) {
        const [firstName, lastName] = name.split(" ")
        let sel = `SELECT * FROM tPlayers WHERE firstName= ${firstName} and lastName= ${lastName}`
        return this.util._getResultPromise(sel)
    }


    _getResultPromise(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, params, (tx, res) => {
                    console.log('sql = ', sql)
                    console.log('db return rows ', res.rows)
                    return resolve(Array.from(res.rows))
                }, (tx, err) => {
                    console.error('%o error sql %s', err, sql)
                    reject(err)
                })
            })
        })
    }

}