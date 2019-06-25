import React, { Component } from 'react'
import RegisterTable from '../components/RegisterTable'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
class Register extends Component {

    state = { players: [], showTable: true }

    constructor(props) {
        super(props)
        this.firstNameRef = React.createRef()
        this.lastNameRef = React.createRef()
        this.levelRef = React.createRef()

    }

    handleSubmit = (e) => {
        e.preventDefault();

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
                players: this.state.players
                    .filter(p => p.firstName !== delPlayer.firstName && p.lastName !== delPlayer.lastName)
            })
    }

    render() {
        return (
            <div>
                <Container component="main" maxWidth="sm">
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoFocus
                                    inputRef={this.firstNameRef}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    id="lastName"
                                    inputRef={this.lastNameRef}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="level"
                                    label="Level"
                                    id="level"
                                    inputRef={this.levelRef}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add
                    </Button>
                    </form>

                </Container>

            {this.state.players.length > 0 &&
                <Container fixed>
                    <RegisterTable players={this.state.players} deletePlayer={this.deletePlayer} />
                </Container>
            }

            </div>

        )
    }

}


export default Register
