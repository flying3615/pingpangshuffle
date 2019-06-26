import React from 'react';
import './App.css';
import Navigator from './components/Navigator'
import DBHelper from './util/dbHelper'

function App() {

  //read this from local DB
  const totalPlayers = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
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
