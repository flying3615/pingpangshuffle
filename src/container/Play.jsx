import React, { Component } from 'react'
import AutoFind from '../components/AutoFind'
import RegisterTable from '../components/RegisterTable'
import ReactCountdownClock from 'react-countdown-clock'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShufflePlayers from '../util/shuffle'
import { env, tablesNumber } from '../util/env'

class Play extends Component {

    constructor(props) {
        super(props)
        this.state = { players: [], arrangeResult: [] }
        this.shuffler = new ShufflePlayers(tablesNumber)

        // If it's dev, add all test data
        if (env === 'dev') {
            this.props.dbContext.findAllPlayers((allPlayers) => this.setState({ players: allPlayers }))
        }
    }

    addPlayers = (p) => {
        const [firstName, lastName] = p.split(' ')

        if (this.state.players.some(existingPlayer => existingPlayer.firstName === firstName 
            && existingPlayer.lastName === lastName)) {
            alert(`Players ${firstName} ${lastName} is already added...`)
            return
        }

        this.props.dbContext.findPlayerByName(p, (player) => console.log("from DB %o", player))
        this.setState({ players: [...this.state.players, { firstName: firstName, lastName: lastName, level: 5 }] })
    }

    deletePlayer = (delPlayer) => {
        this.setState(
            {
                players: this.state.players
                    .filter(p => p.firstName + p.lastName !== delPlayer.firstName + delPlayer.lastName)
            })
    }

    timeUpCallBack = () => {
        alert('Times up')
    }

    doShuffle = () => {

        const readyPlayers = this.state.players.map(p => ({
            firstName: p.firstName,
            lastName: p.lastName,
            table: p.table || { single: [], double: [] },
            tmpSingle: 0,
            currentTable: 0,
            level: p.level
        })
        )

        const { finalSortedPlayers, nextRoundArrangement } = this.shuffler.arrangeTable(readyPlayers)
        const arrangeResult = this.shuffler.printArrangement(finalSortedPlayers)
        this.setState({ players: nextRoundArrangement, arrangeResult })
    }

    render() {
        return (
            <Container component="main">
                <AutoFind addPlayers={this.addPlayers} totalPlayers={this.props.totalPlayers} />

                <Button color="secondary" onClick={this.doShuffle}>Shuffle</Button>

                <RegisterTable players={this.state.players} deletePlayer={this.deletePlayer} />
                {
                    false &&
                    <ReactCountdownClock seconds={60}
                        color="#000"
                        alpha={0.9}
                        size={300}
                        onComplete={this.timeUpCallBack} />
                }


                {this.state.arrangeResult.map(table =>
                    <Typography key={JSON.stringify(table)}>
                        {JSON.stringify(table)}
                    </Typography>)
                }

            </Container>
        )
    }
}

export default Play
