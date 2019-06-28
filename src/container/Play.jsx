import React, { Component } from 'react'
import AutoFind from '../components/AutoFind'
import RegisterTable from '../components/RegisterTable'
import ReactCountdownClock from 'react-countdown-clock'
import Container from '@material-ui/core/Container';


class Play extends Component {

    constructor(props) {
        super(props)
        this.state = { players: [] }
    }

    addPlayers = (p) => {
        const [firstName, lastName] = p.split(' ')
        this.props.dbContext.findPlayerByName(p,(player)=>console.log("from DB %o",player))
        //TODO query DB by full name and find the whole player object 
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

    render() {
        return (
            <Container component="main">
                <AutoFind addPlayers={this.addPlayers} totalPlayers={this.props.totalPlayers} />
                
                <RegisterTable players={this.state.players} deletePlayer={this.deletePlayer} />
                {
                    false &&
                    <ReactCountdownClock seconds={60}
                        color="#000"
                        alpha={0.9}
                        size={300}
                        onComplete={this.timeUpCallBack} />
                }
            </Container>
        )
    }
}


export default Play
