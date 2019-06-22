import React, { Component } from 'react'
import RegisterTable from '../components/RegisterTable'

class Register extends Component {

    state = { players: [] }

    constructor(props) {
        super(props)
        this.firstNameRef = React.createRef()
        this.lastNameRef = React.createRef()
        this.levelRef = React.createRef()

    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.firstNameRef.current.value)

        this.setState({
            players: [...this.state.players, {
                firstName: this.firstNameRef.current.value,
                lastName: this.lastNameRef.current.value,
                level: this.levelRef.current.value
            }]
        })

    }

    deletePlayer = (delPlayer) => {
        this.setState(
            {
                players: [this.state.players
                    .filter(p => p.firstName !== delPlayer.firstName && p.lastName !== delPlayer.lastName)]
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={this.firstNameRef} placeholder='First Name' />
                    <input type="text" ref={this.lastNameRef} placeholder='Last Name' />
                    <input type="text" ref={this.levelRef} placeholder='Level' />
                    <input type="submit" value="Submit" />
                </form>

                <RegisterTable players={this.state.players} deletePlayer={this.deletePlayer} />

            </div>
        )
    }



}


export default Register
