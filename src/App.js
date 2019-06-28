import React from 'react';
import './App.css';
import Navigator from './components/Navigator'
import DBHelper from './util/dbHelper'

function App() {

  //read this from local DB
  const totalPlayers = [
    { firstName: 'Afghanistan', lastName: 'testLast'},
    { firstName: 'Aland Islands', lastName: 'testLast'},
    { firstName: 'Albania', lastName: 'testLast'},
    { firstName: 'Algeria', lastName: 'testLast'},
    { firstName: 'American Samoa', lastName: 'testLast'},
    { firstName: 'Andorra', lastName: 'testLast'},
    { firstName: 'Angola', lastName: 'testLast'},
    { firstName: 'Anguilla', lastName: 'testLast'},
    { firstName: 'Antarctica', lastName: 'testLast'},
    { firstName: 'Antigua and Barbuda', lastName: 'testLast'},
    { firstName: 'Argentina', lastName: 'testLast'},
    { firstName: 'Armenia', lastName: 'testLast'},
    { firstName: 'Aruba', lastName: 'testLast'},
    { firstName: 'Australia', lastName: 'testLast'},
    { firstName: 'Austria', lastName: 'testLast'},
    { firstName: 'Azerbaijan', lastName: 'testLast'},
    { firstName: 'Bahamas', lastName: 'testLast'},
    { firstName: 'Bahrain', lastName: 'testLast'},
    { firstName: 'Bangladesh', lastName: 'testLast'},
    { firstName: 'Barbados', lastName: 'testLast'},
    { firstName: 'Belarus', lastName: 'testLast'},
    { firstName: 'Belgium', lastName: 'testLast'},
    { firstName: 'Belize', lastName: 'testLast'},
    { firstName: 'Benin', lastName: 'testLast'},
    { firstName: 'Bermuda', lastName: 'testLast'},
    { firstName: 'Bhutan', lastName: 'testLast'},
    { firstName: 'Bolivia, Plurinational State of', lastName: 'testLast'},
    { firstName: 'Bonaire, Sint Eustatius and Saba', lastName: 'testLast'},
    { firstName: 'Bosnia and Herzegovina', lastName: 'testLast'},
    { firstName: 'Botswana', lastName: 'testLast'},
    { firstName: 'Bouvet Island', lastName: 'testLast'},
    { firstName: 'Brazil', lastName: 'testLast'},
    { firstName: 'British Indian Ocean Territory', lastName: 'testLast'},
    { firstName: 'Brunei Darussalam', lastName: 'testLast'},
  ];

  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  } else {
    const dbHelper = new DBHelper(window.indexedDB)
    // dbHelper.addPlayer({firstName:'test',lastName:'user',level:5})
    dbHelper.findPlayerByName("test user", (user)=>console.log("%o player",user))

    dbHelper.findAllPlayers((all)=>(console.log("%o all player", all)))
  }

  return (
    <div>
      <Navigator totalPlayers={totalPlayers} />
    </div>
  );
}

export default App;
