// import { useState } from 'react';
import React, { useState} from 'react';
// import axios from 'axios';

import './App.css';
import { ItemList } from './components/ItemList';
import { Listing } from './components/Listing';
// import { Sorting } from './components/Sorting';

// export const Search = (event) => {
//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState(allData);

//   useEffect(() => {
//     axios('http://127.0.0.1:9000/UNIQLO/448428')
//       .then(response => {
//         console.log(response.data)
//         setAllData(response.data);
//         setFilteredData(response.data);
//       })
//       .catch(error => {
//         console.log('Error getting fake data: ' + error);
//       })
//   }, []);

//   return <div className="App">
//     <div style={{ padding: 10 }}>
//       {filteredData.map((value, index) => {
//         return (
//           <div key={value.id}>
//             <div style={styles}>
//               {value.title}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   </div>
// }

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