import React, { useState, useEffect } from 'react';
import axios from 'axios';

// export const Search = (event) => {

//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState(allData);

//   useEffect(() => {
//     axios('https://jsonplaceholder.typicode.com/albums/1/photos')
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
//     <div style={{ margin: '0 auto', marginTop: '10%' }}>
//       <label>Search:</label>
//       <input type="text" onChange={(event) => handleSearch(event)} />
//     </div>
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

// // const server = process.env.API_URL || 'http://127.0.0.1:9000';

// // interface Item {
// //   id: number;
// //   name: string;
// //   category: string;
// //   brand: string,
// //   size: string,
// //   product_id: string,
// //   details: string,
// //   image_filename: string;
// // };


// // interface Prop {
// //   reload?: boolean;
// //   onSortingCompleted?: () => void;
// // }

// // type formDataType = {
// //   brand: string,
// //   product_id: string,
// // }

// // export const Sorting: React.FC<Prop> = (props) => {
// //   const { onSortingCompleted } = props;
// //   const initialState = {
// //     brand: "",
// //     product_id: "",
// //   };
// //   const [values, setValues] = useState<formDataType>(initialState);

// //   const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setValues({
// //       ...values, [event.target.name]: event.target.value,
// //     })
// //   };

// //   const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
// //     setValues({
// //       ...values, [event.target.name]: event.target.value,
// //     })
// //   };

// //   // This function is triggered when the select changes
// //   // const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //   //   // const value = event.target.value;
// //   //   // setSelectedOption(value);
// //   //   setState({
// //   //     ...values, [event.target.name]: event.target.value,
// //   //   })
// //   // };

// //   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setValues({
// //       ...values, [event.target.name]: event.target.files![0],
// //     });
// //   };
// //   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault()
// //     const data = new FormData()
// //     data.append('name', values.name)
// //     data.append('category', values.category)
// //     data.append('brand', values.brand)
// //     data.append('size', values.size)
// //     data.append('product_id', values.product_id)
// //     data.append('details', values.details)
// //     data.append('image', values.image)

// //     fetch(server.concat('/items'), {
// //       method: 'POST',
// //       mode: 'cors',
// //       body: data,
// //     })
// //       .then(response => response.json())
// //       .then(data => {
// //         console.log('POST success:', data);
// //         onListingCompleted && onListingCompleted();

// //         // clear input after submission
// //         setValues(initialState);
// //         // (document.getElementById('imageName') as HTMLInputElement).value = "";
// //       })
// //       .catch((error) => {
// //         console.error('POST error:', error);
// //       })
// //   };
// //   return (
// //     <div>
// //       <form onSubmit={onSubmit}>
// //         <div className='Listing'>
// //           <input type='text' name='name' id='nameInput' placeholder='Name' value={values.name} onChange={onNameChange} required />
// //           {/* potentially make option @e-yang08*/}
// //           <input type='text' name='category' id='categoryInput' placeholder='Category' value={values.category} onChange={onNameChange} required />
// //           {/* <select name='category' id='categoryInput'  required>
// //             <option selected disabled hidden className='placeHolder'>category</option>
// //             <option value='Fashion'>Fashion</option>
// //             <option value='Beauty'>Beauty</option>
// //             <option value='Home'>Home</option>
// //             <option value='Furniture'>Furniture</option>
// //             <option value='Jewelry'>Jewelry</option>
// //             <option value='Kids'>Kids</option>
// //             <option value='Toys'>Toys</option>
// //             <option value='Books'>Books</option>
// //           </select> */}
// //           {/* potentially make option @e-yang08 */}
// //           <input type='text' name='brand' id='brandInput' placeholder='Brand' value={values.brand} onChange={onNameChange} required />
// //           {/* potentially make option @e-yang08 */}
// //           <input type='text' name='size' id='sizeInput' placeholder='Size' value={values.size} onChange={onNameChange} required />
// //           <input type='text' name='productID' id='productIDInput' placeholder='Product ID (Optional)' value={values.product_id} onChange={onNameChange} />
// //           {/* <input type='text' name='details' id='detailsInput' placeholder="Enter item's details" value={values.details} onChange={onNameChange} required /> */}
// //           <textarea name='details' id='detailsInput' cols={30} rows={5} placeholder="Enter item's details" value={values.details} onChange={onTextChange} required></textarea>
// //           <input type='file' name='image' id='imageInput' onChange={onFileChange} />
// //           <label className='upload-btn' htmlFor='imageInput'>
// //             <img id='upload-btn-img' src='upload-icon.png' alt='upload icon'></img>
// //             Image
// //           </label>
// //           <button type='submit' id='submit-button'>List this item</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // // start
// // export const ItemList: React.FC<Prop> = (props) => {
// //   const { reload = true, onLoadCompleted } = props;
// //   const [items, setItems] = useState<Item[]>([]);
// //   const fetchItems = () => {
// //     fetch(server.concat('/items/{brand}/{product_id}'),
// //       {
// //         method: 'GET',
// //         mode: 'cors',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Accept': 'application/json'
// //         },
// //       })
// //       .then(function (response) {
// //         if (response.ok) {
// //           setEmpty(false);
// //           response.json()
// //             .then(data => {
// //               console.log('GET success:', data);
// //               setItems(data.items);
// //               onLoadCompleted && onLoadCompleted();
// //             })
// //             .catch(error => {
// //               console.error('GET error:', error)
// //             })
// //         } else {
// //           setEmpty(true);
// //         }
// //       })
// //   }


// //   useEffect(() => {
// //     if (reload) {
// //       fetchItems();
// //     }
// //   }, [reload]);

// //   // render() {
// //   //   if (emptyState) {
// //   //     return (
// //   //       <div className="empty-state">
// //   //         <img id="empty-image" src="emptystate.svg" alt="Empty State" />
// //   //         <h3>No Listed Item</h3>
// //   //         <p>Newly listed items will appear here.</p>
// //   //       </div>
// //   //     )
// //   //   }
// //   //   else {
// //   return (
// //     <div className='GridListing'>
// //       {items.map((item) => {
// //         return (
// //           <div key={item.id} className='ItemList'>
// //             {/* TODO: Task 1: Replace the placeholder image with the item image */}
// //             <img src={`${server}/image/${item.image_filename}`} alt="item-image" className='ListedImage' />
// //             <p>
// //               <span id="item-category"> {item.category}</span>
// //               <span id="item-name">{item.name}</span>
// //             </p>
// //             <button id="delete-btn">
// //               <img id="delete-btn-img" src="delete-icon.png" alt="delete icon"></img>
// //             </button>
// //             <span>{item.product_id}</span>
// //             <span>{item.details}</span>
// //           </div>
// //         )
// //       })}
// //     </div>
// //   )
// //   // }
// //   // }
// // };
