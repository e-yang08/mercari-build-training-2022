import { useState } from 'react';
import './App.css';
import { ItemList } from './components/ItemList';
import { Listing } from './components/Listing';

function App() {
  // reload ItemList after Listing complete
  const [reload, setReload] = useState(true);
  return (
    <div>
      <header className='Title'>
        <p>
          <b>Simple Mercari</b>
        </p>
      </header>
      <div className="search-bar">
        Search by Product ID
        <button className="search-btn">
          <img id="search-btn-img" src="search-icon.png" alt="search icon"></img>
        </button>
        <input type="text" className="search-input" placeholder="(e.g., UNIQLO 314353)" />
      </div>
      <div id="Listing-app">
        <Listing onListingCompleted={() => setReload(true)} />
      </div>
      <div id="ItemList-app">
        <ItemList reload={reload} onLoadCompleted={() => setReload(false)} />
      </div>
    </div>
  )
}

export default App;