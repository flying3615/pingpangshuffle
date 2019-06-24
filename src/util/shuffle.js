class ShufflePlayers {

    constructor(totalTablesNumber) {
        this.totalTablesNumber = totalTablesNumber
        this.lastDoubleTable = 0
    }

    /**
     * return {sortedPlayer, next time arrangement}
     */
    arrangeTable(totalPlayers) {

        const finalSortedPlayers = []

        // 1).first around allocate single
        for (let i = 1; i <= tablesNumber; i++) {
            const player1 = totalPlayers.shift()
            const player2 = totalPlayers.shift()

            player1.tmpSingle = i
            player2.tmpSingle = i

            player1.currentTable = i
            player2.currentTable = i

            finalSortedPlayers.push(player1)
            finalSortedPlayers.push(player2)

        }

        // 2).fill table as double from table 1 with the rest players
        for (let i = 1; i <= tablesNumber; i++) {
            const player1 = totalPlayers.shift()
            const player2 = totalPlayers.shift()

            if (player1 === undefined && player2 === undefined && i === 1) {
                //all can play single
                this.lastDoubleTable = 0
                break
            }

            if (player2) {
                player1.table.double.push(i)
                player2.table.double.push(i)

                player1.currentTable = i
                player2.currentTable = i

                finalSortedPlayers.push(player1)
                finalSortedPlayers.push(player2)
            } else {
                if (player1) {

                    player1.table.double.push(i)
                    player1.currentTable = i
                    finalSortedPlayers.push(player1)

                    this.lastDoubleTable = i  //only player2 is null, so the current table is the last double table
                } else {
                    this.lastDoubleTable = i - 1 //player 1&2 are null, so the previous table is the last double table
                }
                break
            }
        }

        return {
            finalSortedPlayers,
            nextRoundArrangement: this._arrangeNextRound(finalSortedPlayers)  // 3).build up next around order and return player list
        };

    }

    _groupBy(arr, fn) {
        return arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
            acc[val] = (acc[val] || []).concat(arr[i]);
            return acc;
        }, {});
    }


    printArrangement(finalSortedPlayers) {
        const groupedPlayer = this._groupBy(finalSortedPlayers, (p) => p.currentTable);
        console.log(Object.keys(groupedPlayer).map(k => ({ [k]: JSON.stringify(groupedPlayer[k].map(p => p.name)) })));
    }

    _arrangeNextRound(finalSortedPlayers) {
        let nextTimeSingleHighPriority = [];
        let nextTimeDoubleLowPriority = [];

        // const topPrioritySingles = finalSortedPlayers
        //                             .sort((p1, p2) => p1.table.single.length - p2.table.single.length)
        //                             .slice(0, 5)
        //                             .map(p => { p.tmpSingle = 0; return p });

        // finalSortedPlayers = finalSortedPlayers.filter(e => !topPrioritySingles.includes(e))

        for (let k = 0; k < finalSortedPlayers.length; k++) {
            const p = finalSortedPlayers[k];
            if (p.tmpSingle != 0) {
                // for those players who filled the number of tables(first 2*16 players)
                if (p.currentTable <= this.lastDoubleTable) {
                    // tables to play double
                    p.table.double.push(p.currentTable);
                    // next time they should play single
                    nextTimeSingleHighPriority.push(p);
                }
                else {
                    // rest tables play single
                    p.table.single.push(p.currentTable);
                    // next time they should play double
                    nextTimeDoubleLowPriority.push(p);
                }
                //reset to 0
                p.tmpSingle = 0;
            }
            else {
                // here players are double at the second step
                nextTimeSingleHighPriority.push(p);
            }
        }
        //sort those player who will play single next time by single play time ascending
        nextTimeSingleHighPriority = nextTimeSingleHighPriority.sort((p1, p2) => p1.table.single.length - p2.table.single.length);

        console.log("single player want tables " + nextTimeSingleHighPriority.length / 2)

        //shuffle those who play double this time
        nextTimeDoubleLowPriority = this._doShuffle(nextTimeDoubleLowPriority);
        // return [
        //     ...nextTimeDoubleLowPriority.slice(0, this.lastDoubleTable * 4),
        //     ...[...topPrioritySingles, ...nextTimeSingleHighPriority],
        //     ...nextTimeDoubleLowPriority.slice(this.lastDoubleTable * 4)
        // ];

        return [
            ...nextTimeDoubleLowPriority.slice(0, this.lastDoubleTable * 4),
            ...nextTimeSingleHighPriority,
            ...nextTimeDoubleLowPriority.slice(this.lastDoubleTable * 4)
        ];
    }

    _doShuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}



// To get double tables and single tables
// 4x+2y= peopleNum and x+y=tablesNumber

const tablesNumber = 16
const rounds = 8
const peopleNum = 46

const players = [...Array(peopleNum).keys()].map(i => ({
    name: ["player" + i],
    table: { single: [], double: [] },
    tmpSingle: 0,
    currentTable: 0,
    level: 5
}))

const shuffler = new ShufflePlayers(tablesNumber)


let nextRoundArrangement = players

for (let time = 0; time < rounds; time++) {

    ({ finalSortedPlayers, nextRoundArrangement } = shuffler.arrangeTable(nextRoundArrangement))

    console.log('round ' + time)
    shuffler.printArrangement(finalSortedPlayers)
}

// print out single statistic
console.log('----------Print Single Player Played Rounds---------------')
for (let r = 0; r < rounds; r++) {
    console.log(r + " times single = " + JSON.stringify(finalSortedPlayers.filter(p => p.table.single.length == r).length))
}

// console.log(JSON.stringify(finalSortedPlayers))