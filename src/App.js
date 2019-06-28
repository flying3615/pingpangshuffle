import React, { Component } from 'react';
import './App.css';
import Navigator from './components/Navigator'
import DBHelper from './util/dbHelper'
import { env } from './util/env'

export const DBContext = React.createContext();
const dbHelper = window.indexedDB ? new DBHelper(window.indexedDB) : null

const totalPlayers = [
  //Marvel
  { firstName: 'Spider', lastName: 'Man', level: 1 },
  { firstName: 'Luke', lastName: 'Cage', level: 2 },
  { firstName: 'Emma', lastName: 'Frost', level: 2 },
  { firstName: 'Doctor', lastName: 'Strange', level: 1 },
  { firstName: 'Captain', lastName: 'America', level: 5 },
  { firstName: 'Black', lastName: 'Panther', level: 1 },
  { firstName: 'Nick', lastName: 'Fury', level: 5 },
  { firstName: 'Black', lastName: 'Widow', level: 2 },
  { firstName: 'Jessica', lastName: 'Jones', level: 2 },
  { firstName: 'Bucky', lastName: 'Barnes', level: 5 },
  { firstName: 'Black', lastName: 'Bolt', level: 2 },
  { firstName: 'Silver', lastName: 'Surfer', level: 5 },
  { firstName: 'Rocket', lastName: 'Raccoon', level: 3 },
  //GOT
  { firstName: 'Daenerys', lastName: 'Targaryen', level: 3 },
  { firstName: 'Joffrey', lastName: 'Baratheon', level: 5 },
  { firstName: 'Samwell', lastName: 'Tarly', level: 2 },
  { firstName: 'Sansa', lastName: 'Stark', level: 4 },
  { firstName: 'Stannis', lastName: 'Baratheon', level: 5 },
  { firstName: 'Balon', lastName: 'Greyjoy', level: 4 },
  { firstName: 'Eddard', lastName: 'Stark', level: 4 },
  { firstName: 'Cersei', lastName: 'Lannister', level: 4 },
  { firstName: 'Petyr', lastName: 'Baelish', level: 5 },
  { firstName: 'Euron', lastName: 'Greyjoy', level: 5 },
  { firstName: 'Jon', lastName: 'Snow', level: 1 },
  { firstName: 'Jaime', lastName: 'Lannister', level: 2 },
  { firstName: 'Arya', lastName: 'Stark', level: 4 },
  { firstName: 'Theno', lastName: 'Greyjoy', level: 5 },
  { firstName: 'Viserys', lastName: 'Targaryen', level: 2 },
  { firstName: 'Robert', lastName: 'Baratheon', level: 4 },
  { firstName: 'Jorah', lastName: 'Mormeon', level: 3 },
  { firstName: 'Bran', lastName: 'Stark', level: 5 },
  { firstName: 'Davos', lastName: 'Seaworth', level: 1 },
  { firstName: 'Grey', lastName: 'Worm', level: 3 },
  { firstName: 'Roose', lastName: 'Bolton', level: 2 },
];



class App extends Component {

  constructor(props) {
    super(props)
    this.state = { allPlayers: [] }
  }

  componentDidMount() {
    if (env === 'dev') {
      dbHelper.dropStore(() => {
        console.log("====clean store======")
        totalPlayers.forEach(p => dbHelper.addPlayer(p))

        dbHelper.findAllPlayers((allPlayers) => {
          this.setState({ allPlayers })
        })
      })
    } else {
      dbHelper.findAllPlayers((allPlayers) => {
        this.setState({ allPlayers })
      })
    }
    
  }

  render() {
    return (
      <DBContext.Provider value={dbHelper}>
        <Navigator totalPlayers={this.state.allPlayers} />
      </DBContext.Provider>
    )
  }
}

export default App;
