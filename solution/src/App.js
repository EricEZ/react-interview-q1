import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

function App() {
 
  //setting all variables
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [countires, setCountires] = useState([]);
  const [tableData, setTableData] = useState([]);

  // grabbing list of countires from api
  // empty array so it only runs once
  useEffect(() => {
    getLocations().then(countires => setCountires(countires))
    .catch(error => console.error("ERROR: ", error));
  }, []);
  

  // handlers to watch input changes
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleAddClick = async () => {
    // didnt have time but I would have also called the name vailidator in here as well and created a p tag that would take the value of the result if it was an error

    if(name && country) {
      try {
        const value = {name, country};
        setTableData([...tableData, value]);
        setName('');
        setCountry('');
      } catch (error) {
        console.error('ERROR: ', error);
      }
    }
    // place alert where user needs to put both values
  }

  //if user clicks clear it would set both values to empty
  const handleClearClick = () => {
    setName('');
    setCountry('');
  };
  

  // returns the form
  // the name is a simple input
  // country will map the option to the selected value that will then host the value for the add functionallity
  // the tabledata will then run through it's values and print them out onto the table

  // I did not have time for CSS so i would have put styles onto the input and label so they are in-line with one another
  // the drop down would have been larger as well and again it would have been in-line with its label
  // I wouild have also added style to the table so that there is better spacing between rows and columns and have alternating row coloring

  return (
    <div className="App">
      <div>
        <label>Name </label>

        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Location </label>
        <select value={country} onChange={handleCountryChange}>
          {countires.map((countryOption) => (
            <option key={countryOption} value={countryOption}>
              {countryOption}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddClick}>Add</button>
      <button onClick={handleClearClick}>Clear</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
