import React, { Component } from 'react'
import AutoFind from '../components/AutoFind'
import RegisterTable from '../components/RegisterTable'



class Play extends Component {

    constructor(props) {
        super(props)
        this.state = { players: [] }
    }

    addPlayers = (p)=>{
        //TODO query DB by full name and find the whole player object 
        this.setState({players:[...this.state.players, {firstName:p, lastName:'null', level:5}]})
    }


    deletePlayer = (delPlayer) => {
        this.setState(
            {
                players: this.state.players
                    .filter(p => p.firstName !== delPlayer.firstName && p.lastName !== delPlayer.lastName)
            })
    }

    render() {
        return (
            <div>
                <AutoFind addPlayers={this.addPlayers}/>
                <RegisterTable players={this.state.players} deletePlayer={this.deletePlayer} />
            </div>
        )
    }
}


export default Play
