import React, { Component } from 'react'
import AutoFind from '../components/AutoFind'
import RegisterTable from '../components/RegisterTable'
import ReactCountdownClock from 'react-countdown-clock'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShufflePlayers from '../util/shuffle'
import ColorHelper from '../util/ColorHelper'
import styled from 'styled-components';
import { env, tablesNumber } from '../util/Env'


const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;


class Play extends Component {

    constructor(props) {
        super(props)
        this.state = { players: [], arrangeResult: [] }
        this.shuffler = new ShufflePlayers(tablesNumber)
        this.colorHelper = new ColorHelper()

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
        const bgColor = this.colorHelper.getRandomColor() //name background color
        const color = this.colorHelper.invertColor(bgColor) // name color
        this.setState({ players: [...this.state.players, { firstName: firstName, lastName: lastName, level: 5, bgColor, color }] })
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

        const readyPlayers = this.state.players
            .map(p => ({
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

                <Grid container direction="row"
                    justify="center"
                    alignItems="center"
                     spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <StyledButton onClick={this.doShuffle}>Shuffle</StyledButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledButton onClick={()=>console.log('Stop playing')}>Stop</StyledButton>
                    </Grid>
                </Grid>

                <RegisterTable players={this.state.players} deletePlayer={this.deletePlayer} />
                {
                    false &&
                    <ReactCountdownClock seconds={60}
                        color="#000"
                        alpha={0.9}
                        size={300}
                        onComplete={this.timeUpCallBack} />
                }

                {/* TODO should be show in multi cards? */}
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
