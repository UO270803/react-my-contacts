import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import Searcher from "./components/Searcher";
import ErrorFallback from "./components/ErrorFallback";

import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchField, setSearchField] = useState('');

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  const searchedContacts = contacts.filter(contact => {
      return (contact.name['first'] + ' ' + contact.name['last']).toLowerCase().includes(searchField.toLowerCase())
  });

  const onAZ = () => {
    let az = contacts.sort((a, b) => {
      return (a.name['first'] + " " + a.name['last']).localeCompare(b.name['first'] + " " + b.name['last'])
    })
    setContacts([...az]); //clone the list
  }

  const onZA = () => {
    let za = contacts.sort((a, b) => {
      return (b.name['first'] + " " + b.name['last']).localeCompare(a.name['first'] + " " + a.name['last'])
    })
    setContacts([...za]); //clone the list
  }


  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(contacts => setContacts(contacts.results));
  }, [])

  return (
    <div className='tc '>
      <header>
        <h1 className='f1'>My contacts</h1>
      </header>
      {contacts.length === 0 ? <h2 className='f2'>Loading...</h2> :
        <ErrorBoundary>
          <Searcher searchChange={onSearchChange} az={onAZ} za={onZA}/>
          <Scroll>
            <CardList contacts={searchedContacts} />
          </Scroll>
        </ErrorBoundary>
      }
      <footer>
        <hr /><p>Desarrollo de Software para Dispositivos Moviles.
          {new Date().getFullYear()}</p>
      </footer>
    </div>

  );
}

export default App;
