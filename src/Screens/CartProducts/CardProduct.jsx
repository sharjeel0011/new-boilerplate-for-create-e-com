

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from "firebase/firestore";
// import { db, auth } from '../../Config/Firebase/Firebase';
// import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch, useSelector } from 'react-redux';
// import { setCart, removeItem } from '../../Config/ReducerConfig/Reducer/CartItemSlice';
// import { Link, useNavigate } from 'react-router-dom';

// const CartProduct = () => {
//   const [Cartproducts, setCartProducts] = useState([]);
//   const cartItems = useSelector((state) => state.cartItems.items);
//   const [userUid, setUserUid] = useState('');
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
//   const dispatch = useDispatch();
//   const [baseDeliveryFee] = useState(200); // Base delivery fee
//   const [incrementalDeliveryFee] = useState(50); // Incremental fee per additional item
//   const [showForm, setShowForm] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerPhoneNumber: '',
//     customerFullAddress: '',
//     customerCity: '',
//     customerTownOrBlock: '',
//     customerHouseNumber: '',
//     customerFamousPoint: '',
//     customerEmail: '', // New field for customer email
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProducts = async () => {
//       onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           const uid = user.uid;
//           setUserUid(uid);
//           setIsLoggedIn(true); // Update login status

//           try {
//             const q = query(collection(db, "CartProducts"), where("uid", "==", uid));
//             const querySnapshot = await getDocs(q);
//             const products = [];
//             querySnapshot.forEach((doc) => {
//               const obj = {
//                 docId: doc.id,
//                 ...doc.data()
//               };
//               products.push(obj);
//             });
//             setCartProducts(products);
//             dispatch(setCart(products));
//           } catch (error) {
//             console.error("Error fetching products: ", error);
//           }
//         } else {
//           setIsLoggedIn(false); // Update login status
//           setCartProducts(cartItems);
//         }
//       });
//     };

//     getProducts();
//   }, [cartItems, dispatch]);

//   const deleteCartItem = async (itemId) => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         await deleteDoc(doc(db, "CartProducts", itemId));
//         const updatedProducts = Cartproducts.filter(item => item.docId !== itemId);
//         setCartProducts(updatedProducts);
//         dispatch(removeItem({ id: itemId }));
//       } catch (error) {
//         console.error("Error deleting item from Firebase: ", error);
//       }
//     } else {
//       const updatedProducts = cartItems.filter(item => item.id !== itemId);
//       setCartProducts(updatedProducts);
//       dispatch(removeItem({ id: itemId }));
//     }
//   };

//   const toggleSelectItem = (itemId) => {
//     setSelectedItems((prevSelectedItems) =>
//       prevSelectedItems.includes(itemId)
//         ? prevSelectedItems.filter((id) => id !== itemId)
//         : [...prevSelectedItems, itemId]
//     );
//   };

//   const calculateTotal = () => {
//     const selectedProducts = Cartproducts.filter((item) =>
//       selectedItems.includes(item.docId || item.id)
//     );

//     const totalCost = selectedProducts.reduce((total, item) => total + (item.price || 0), 0);
//     const deliveryCharges = selectedProducts.length > 1 
//       ? baseDeliveryFee + ((selectedProducts.length - 1) * incrementalDeliveryFee) 
//       : baseDeliveryFee;

//     return {
//       totalCost,
//       deliveryCharges,
//       totalItems: selectedProducts.length,
//     };
//   };

//   const { totalCost, deliveryCharges, totalItems } = calculateTotal();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     if (value.trim() === '') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: 'This field is required'
//       }));
//     } else {
//       setErrors((prevErrors) => {
//         const updatedErrors = { ...prevErrors };
//         delete updatedErrors[name];
//         return updatedErrors;
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form data
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (formData[key].trim() === '') {
//         newErrors[key] = 'This field is required';
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     setLoading(true);
//     const orderNumber = `ORD-${Date.now()}`;
//     const orderDate = new Date().toLocaleString();

//     const orderData = {
//       ...formData,
//       orderNumber,
//       orderDate,
//       selectedItems: selectedItems.map(itemId => {
//         const item = Cartproducts.find(product => product.docId === itemId || product.id === itemId);
//         if (!item) {
//           return null;
//         }
//         return {
//           productName: item.ProductName,
//           price: item.price,
//           image: item.Image,
//           color: item.color,
//           size: item.size,
//           status: 'pending'
//         };
//       }).filter(item => item !== null),
//       totalCost,
//       deliveryCharges,
//       totalAmount: totalCost + deliveryCharges,
//       status: 'pending'
//     };

//     try {
//       await addDoc(collection(db, "Orders"), orderData);
//       // console.log("Order submitted successfully", orderData);

//       // Remove selected items from the cart
//       selectedItems.forEach(itemId => {
//         deleteCartItem(itemId);

//       });

//       setShowForm(false);
//       setSelectedItems([]);
//       setFormData({
//         customerName: '',
//         customerPhoneNumber: '',
//         customerFullAddress: '',
//         customerCity: '',
//         customerTownOrBlock: '',
//         customerHouseNumber: '',
//         customerFamousPoint: '',
//         customerEmail: '', // Clear email field after submission
//       });
//     } catch (error) {
//       console.error("Error submitting order: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmOrderClick = () => {
//     if (userUid) {
//       setShowForm(true);
//     } else {
//       setShowLoginModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowLoginModal(false);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       <div className="mt-4">
//         <p className="text-lg font-semibold">Number of items in cart: {Cartproducts.length}</p>
//         <ul className="mt-2">
          

// {Cartproducts.map((item, index) => (
//   <li key={index} className="p-4 border-b border-gray-200 flex items-center justify-between">
//     <div className="flex items-center">
//       <input
//         type="checkbox"
//         className="mr-4"
//         checked={selectedItems.includes(item.docId || item.id)}
//         onChange={() => toggleSelectItem(item.docId || item.id)}
//       />
//       <img src={item.Image} alt={item.ProductName} className="w-16 h-16 object-cover mr-4" />
//       <div>
//         <p className="text-sm font-medium">{item.ProductName}</p>
//         <p className="text-sm text-gray-600">colour:{item.color}</p>
//         <p className="text-sm text-gray-600">Size:{item.size}</p>
//         <p className="text-sm text-gray-600">Price: {item.price}.00PKR</p>
//       </div>
//     </div>
//     {isLoggedIn && (
//       <button onClick={() => deleteCartItem(item.docId || item.id)} className="bg-[#555] hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">Delete</button>
//     )}
//   </li>
// ))}
// </ul>
// {selectedItems.length > 0 && (
// <div className="mt-6 p-4 bg-gray-100 rounded">
//   <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//   <p>Total Items: {totalItems}</p>
//   <p>Total Cost: {totalCost}.00PKR</p>
//   <p>Delivery Charges: {deliveryCharges}.00PKR</p>
//   <p className="font-bold">Total Amount: {totalCost + deliveryCharges}.00PKR</p>
//   <button onClick={handleConfirmOrderClick} className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">Click to Confirm Order</button>
// </div>
// )}
// </div>
// {showForm && (
// <div className="mt-6 p-4 bg-gray-100 rounded">
// <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
// <form onSubmit={handleSubmit}>
//   {[
//     { label: 'Customer Name', name: 'customerName' },
//     { label: 'Phone Number', name: 'customerPhoneNumber' },
//     { label: 'Full Address', name: 'customerFullAddress' },
//     { label: 'City', name: 'customerCity' },
//     { label: 'Town or Block', name: 'customerTownOrBlock' },
//     { label: 'House Number', name: 'customerHouseNumber' },
//     { label: 'Famous Point Nearby', name: 'customerFamousPoint' },
//     { label: 'Email', name: 'customerEmail' }, // Added email field
//   ].map(({ label, name }) => (
//     <div key={name} className="mb-4">
//       <label className="block text-sm font-medium mb-2">{label}</label>
//       <input
//         type={name === 'customerEmail' ? 'email' : 'text'} // Set email input type
//         name={name}
//         className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
//         value={formData[name]}
//         onChange={handleChange}
//         style={{ borderColor: formData[name] && !errors[name] ? 'green' : '' }}
//       />
//       {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
//     </div>
//   ))}
//   <button type="submit" className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Order Place !'}</button>
// </form>
// </div>
// )}
// {showLoginModal && (
// <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
// <div className="bg-white p-6 rounded shadow-lg">
//   <h2 className="text-xl font-semibold mb-4">Please Create Account</h2>
//   <p className="mb-4">You need to Create Account in to confirm your order.</p>
//   <button onClick={closeModal} className="btn bg-[#555] hover:bg-red-700 text-white mr-4">Close</button>
//   <Link to='/Singup' className="btn bg-[#555] hover:bg-[#4CAF50] text-white font-bold">Create Account</Link>
// </div>
// </div>
// )}
// </div>
// );
// };

// export default CartProduct;




















// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from "firebase/firestore";
// import { db, auth } from '../../Config/Firebase/Firebase';
// import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch, useSelector } from 'react-redux';
// import { setCart, removeItem } from '../../Config/ReducerConfig/Reducer/CartItemSlice';
// import { Link, useNavigate } from 'react-router-dom';

// const CartProduct = () => {
//   const [Cartproducts, setCartProducts] = useState([]);
//   const cartItems = useSelector((state) => state.cartItems.items);
//   const [userUid, setUserUid] = useState('');
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const dispatch = useDispatch();
//   const [baseDeliveryFee] = useState(200); 
//   const [incrementalDeliveryFee] = useState(50); 
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerPhoneNumber: '',
//     customerFullAddress: '',
//     customerCity: '',
//     customerTownOrBlock: '',
//     customerHouseNumber: '',
//     customerFamousPoint: '',
//     customerEmail: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProducts = async () => {
//       onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           const uid = user.uid;
//           setUserUid(uid);
//           setIsLoggedIn(true);

//           try {
//             const q = query(collection(db, "CartProducts"), where("uid", "==", uid));
//             const querySnapshot = await getDocs(q);
//             const products = [];
//             querySnapshot.forEach((doc) => {
//               const obj = {
//                 docId: doc.id,
//                 ...doc.data()
//               };
//               products.push(obj);
//             });
//             setCartProducts(products);
//             dispatch(setCart(products));
//           } catch (error) {
//             console.error("Error fetching products: ", error);
//           }
//         } else {
//           setIsLoggedIn(false);
//           setCartProducts(cartItems);
//         }
//       });
//     };

//     getProducts();
//   }, [cartItems, dispatch]);

//   const deleteCartItem = async (itemId) => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         await deleteDoc(doc(db, "CartProducts", itemId));
//         const updatedProducts = Cartproducts.filter(item => item.docId !== itemId);
//         setCartProducts(updatedProducts);
//         dispatch(removeItem({ id: itemId }));
//       } catch (error) {
//         console.error("Error deleting item from Firebase: ", error);
//       }
//     } else {
//       const updatedProducts = cartItems.filter(item => item.id !== itemId);
//       setCartProducts(updatedProducts);
//       dispatch(removeItem({ id: itemId }));
//     }
//   };

//   const toggleSelectItem = (itemId) => {
//     setSelectedItems((prevSelectedItems) =>
//       prevSelectedItems.includes(itemId)
//         ? prevSelectedItems.filter((id) => id !== itemId)
//         : [...prevSelectedItems, itemId]
//     );
//   };

//   const calculateTotal = () => {
//     const selectedProducts = Cartproducts.filter((item) =>
//       selectedItems.includes(item.docId || item.id)
//     );

//     const totalCost = selectedProducts.reduce((total, item) => total + (item.price || 0), 0);
//     const deliveryCharges = selectedProducts.length > 1 
//       ? baseDeliveryFee + ((selectedProducts.length - 1) * incrementalDeliveryFee) 
//       : baseDeliveryFee;

//     return {
//       totalCost,
//       deliveryCharges,
//       totalItems: selectedProducts.length,
//     };
//   };

//   const { totalCost, deliveryCharges, totalItems } = calculateTotal();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     if (value.trim() === '') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: 'This field is required'
//       }));
//     } else {
//       setErrors((prevErrors) => {
//         const updatedErrors = { ...prevErrors };
//         delete updatedErrors[name];
//         return updatedErrors;
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (formData[key].trim() === '') {
//         newErrors[key] = 'This field is required';
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     setLoading(true);
//     const orderNumber = `ORD-${Date.now()}`;
//     const orderDate = new Date().toLocaleString();

//     const orderData = {
//       ...formData,
//       orderNumber,
//       orderDate,
//       selectedItems: selectedItems.map(itemId => {
//         const item = Cartproducts.find(product => product.docId === itemId || product.id === itemId);
//         if (!item) {
//           return null;
//         }
//         return {
//           productName: item.ProductName,
//           price: item.price,
//           image: item.Image,
//           color: item.color,
//           size: item.size,
//           status: 'pending'
//         };
//       }).filter(item => item !== null),
//       totalCost,
//       deliveryCharges,
//       totalAmount: totalCost + deliveryCharges,
//       status: 'pending'
//     };

//     try {
//       await addDoc(collection(db, "Orders"), orderData);

//       selectedItems.forEach(itemId => {
//         deleteCartItem(itemId);
//       });

//       setShowForm(false);
//       setSelectedItems([]);
//       setFormData({
//         customerName: '',
//         customerPhoneNumber: '',
//         customerFullAddress: '',
//         customerCity: '',
//         customerTownOrBlock: '',
//         customerHouseNumber: '',
//         customerFamousPoint: '',
//         customerEmail: '',
//       });
//     } catch (error) {
//       console.error("Error submitting order: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmOrderClick = () => {
//     setShowForm(true);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       <div className="mt-4">
//         <p className="text-lg font-semibold">Number of items in cart: {Cartproducts.length}</p>
//         <ul className="mt-2">
//           {Cartproducts.map((item, index) => (
//             <li key={index} className="p-4 border-b border-gray-200 flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-4"
//                   checked={selectedItems.includes(item.docId || item.id)}
//                   onChange={() => toggleSelectItem(item.docId || item.id)}
//                 />
//                 <img src={item.Image} alt={item.ProductName} className="w-16 h-16 object-cover mr-4" />
//                 <div>
//                   <p className="text-sm font-medium">{item.ProductName}</p>
//                   <p className="text-sm text-gray-600">Colour: {item.color}</p>
//                   <p className="text-sm text-gray-600">Size: {item.size}</p>
//                   <p className="text-sm text-gray-600">Price: {item.price}.00PKR</p>
//                 </div>
//               </div>
//               {isLoggedIn && (
//                 <button onClick={() => deleteCartItem(item.docId || item.id)} className="bg-[#555] hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
//               )}
//             </li>
//           ))}
//         </ul>
//         {selectedItems.length > 0 && (
//           <div className="mt-6 p-4 bg-gray-100 rounded">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <p>Total Items: {totalItems}</p>
//             <p>Total Cost: {totalCost}.00PKR</p>
//             <p>Delivery Charges: {deliveryCharges}.00PKR</p>
//             <p className="font-bold">Total Amount: {totalCost + deliveryCharges}.00PKR</p>
//             <button onClick={handleConfirmOrderClick} className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">Click to Confirm Order</button>
//           </div>
//         )}
//       </div>
//       {showForm && (
//         <div className="mt-6 p-4 bg-gray-100 rounded">
//           <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
//           <form onSubmit={handleSubmit}>
//             {[
//               { label: 'Customer Name', name: 'customerName' },
//               { label: 'Phone Number', name: 'customerPhoneNumber' },
//               { label: 'Full Address', name: 'customerFullAddress' },
//               { label: 'City', name: 'customerCity' },
//               { label: 'Town or Block', name: 'customerTownOrBlock' },
//               { label: 'House Number', name: 'customerHouseNumber' },
//               { label: 'Famous Point Nearby', name: 'customerFamousPoint' },
//               { label: 'Email', name: 'customerEmail' },
//             ].map(({ label, name }) => (
//               <div key={name} className="mb-4">
//                 <label className="block text-sm font-medium mb-2">{label}</label>
//                 <input
//                   type={name === 'customerEmail' ? 'email' : 'text'}
//                   name={name}
//                   className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   style={{ borderColor: formData[name] && !errors[name] ? 'green' : '' }}
//                 />
//                 {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
//               </div>
//             ))}
//             <button type="submit" className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Order Place !'}</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartProduct;















// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from "firebase/firestore";
// import { db, auth } from '../../Config/Firebase/Firebase';
// import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch, useSelector } from 'react-redux';
// import { setCart, removeItem } from '../../Config/ReducerConfig/Reducer/CartItemSlice';
// import { Link, useNavigate } from 'react-router-dom';

// const CartProduct = () => {
//   const [cartProducts, setCartProducts] = useState([]);
//   const cartItems = useSelector((state) => state.cartItems.items);
//   const [userUid, setUserUid] = useState('');
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const dispatch = useDispatch();
//   const [baseDeliveryFee] = useState(200); 
//   const [incrementalDeliveryFee] = useState(50); 
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerPhoneNumber: '',
//     customerFullAddress: '',
//     customerCity: '',
//     customerTownOrBlock: '',
//     customerHouseNumber: '',
//     customerFamousPoint: '',
//     customerEmail: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProducts = async () => {
//       const storedUid = localStorage.getItem('uidcocki');
//       if (!storedUid) {
//         console.error("No UID found in local storage.");
//         return;
//       }

//       onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           const uid = user.uid;
//           setUserUid(uid);
//           setIsLoggedIn(true);
//         } else {
//           setUserUid(storedUid);
//           setIsLoggedIn(false);
//         }

//         try {
//           const q = query(collection(db, "CartProducts"), where("uid", "==", user ? user.uid : storedUid));
//           const querySnapshot = await getDocs(q);
//           const products = [];
//           querySnapshot.forEach((doc) => {
//             const obj = {
//               docId: doc.id,
//               ...doc.data()
//             };
//             products.push(obj);
//           });
//           setCartProducts(products);
//           dispatch(setCart(products));
//         } catch (error) {
//           console.error("Error fetching products: ", error);
//         }
//       });
//     };

//     getProducts();
//   }, [cartItems, dispatch]);

//   const deleteCartItem = async (itemId) => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         await deleteDoc(doc(db, "CartProducts", itemId));
//         const updatedProducts = cartProducts.filter(item => item.docId !== itemId);
//         setCartProducts(updatedProducts);
//         dispatch(removeItem({ id: itemId }));
//       } catch (error) {
//         console.error("Error deleting item from Firebase: ", error);
//       }
//     } else {
//       const updatedProducts = cartItems.filter(item => item.id !== itemId);
//       setCartProducts(updatedProducts);
//       dispatch(removeItem({ id: itemId }));
//     }
//   };

//   const toggleSelectItem = (itemId) => {
//     setSelectedItems((prevSelectedItems) =>
//       prevSelectedItems.includes(itemId)
//         ? prevSelectedItems.filter((id) => id !== itemId)
//         : [...prevSelectedItems, itemId]
//     );
//   };

//   const calculateTotal = () => {
//     const selectedProducts = cartProducts.filter((item) =>
//       selectedItems.includes(item.docId || item.id)
//     );

//     const totalCost = selectedProducts.reduce((total, item) => total + (item.price || 0), 0);
//     const deliveryCharges = selectedProducts.length > 1 
//       ? baseDeliveryFee + ((selectedProducts.length - 1) * incrementalDeliveryFee) 
//       : baseDeliveryFee;

//     return {
//       totalCost,
//       deliveryCharges,
//       totalItems: selectedProducts.length,
//     };
//   };

//   const { totalCost, deliveryCharges, totalItems } = calculateTotal();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     if (value.trim() === '') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: 'This field is required'
//       }));
//     } else {
//       setErrors((prevErrors) => {
//         const updatedErrors = { ...prevErrors };
//         delete updatedErrors[name];
//         return updatedErrors;
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (formData[key].trim() === '') {
//         newErrors[key] = 'This field is required';
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     setLoading(true);
//     const orderNumber = `ORD-${Date.now()}`;
//     const orderDate = new Date().toLocaleString();

//     const orderData = {
//       ...formData,
//       orderNumber,
//       orderDate,
//       selectedItems: selectedItems.map(itemId => {
//         const item = cartProducts.find(product => product.docId === itemId || product.id === itemId);
//         if (!item) {
//           return null;
//         }
//         return {
//           productName: item.ProductName,
//           price: item.price,
//           image: item.Image,
//           color: item.color,
//           size: item.size,
//           status: 'pending'
//         };
//       }).filter(item => item !== null),
//       totalCost,
//       deliveryCharges,
//       totalAmount: totalCost + deliveryCharges,
//       status: 'pending'
//     };

//     try {
//       await addDoc(collection(db, "Orders"), orderData);

//       selectedItems.forEach(itemId => {
//         deleteCartItem(itemId);
//       });

//       setShowForm(false);
//       setSelectedItems([]);
//       setFormData({
//         customerName: '',
//         customerPhoneNumber: '',
//         customerFullAddress: '',
//         customerCity: '',
//         customerTownOrBlock: '',
//         customerHouseNumber: '',
//         customerFamousPoint: '',
//         customerEmail: '',
//       });
//     } catch (error) {
//       console.error("Error submitting order: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmOrderClick = () => {
//     setShowForm(true);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       <div className="mt-4">
//         <p className="text-lg font-semibold">Number of items in cart: {cartProducts.length}</p>
//         <ul className="mt-2">
//           {cartProducts.map((item, index) => (
//             <li key={index} className="p-4 border-b border-gray-200 flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-4"
//                   checked={selectedItems.includes(item.docId || item.id)}
//                   onChange={() => toggleSelectItem(item.docId || item.id)}
//                 />
//                 <img src={item.Image} alt={item.ProductName} className="w-16 h-16 object-cover mr-4" />
//                 <div>
//                   <p className="text-sm font-medium">{item.ProductName}</p>
//                   <p className="text-sm text-gray-600">Colour: {item.color}</p>
//                   <p className="text-sm text-gray-600">Size: {item.size}</p>
//                   <p className="text-sm text-gray-600">Price: {item.price}.00PKR</p>
//                 </div>
//               </div>
//               {isLoggedIn && (
//                 <button onClick={() => deleteCartItem(item.docId || item.id)} className="bg-[#555] hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
//               )}
//             </li>
//           ))}
//         </ul>
//         {selectedItems.length > 0 && (
//           <div className="mt-6 p-4 bg-gray-100 rounded">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <p>Total Items: {totalItems}</p>
//             <p>Total Cost: {totalCost}.00PKR</p>
//             <p>Delivery Charges: {deliveryCharges}.00PKR</p>
//             <p className="font-bold">Total Amount: {totalCost + deliveryCharges}.00PKR</p>
//             <button onClick={handleConfirmOrderClick} className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">Click to Confirm Order</button>
//           </div>
//         )}
//       </div>
//       {showForm && (
//         <div className="mt-6 p-4 bg-gray-100 rounded">
//           <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
//           <form onSubmit={handleSubmit}>
//             {[
//               { label: 'Customer Name', name: 'customerName' },
//               { label: 'Phone Number', name: 'customerPhoneNumber' },
//               { label: 'Full Address', name: 'customerFullAddress' },
//               { label: 'City', name: 'customerCity' },
//               { label: 'Town or Block', name: 'customerTownOrBlock' },
//               { label: 'House Number', name: 'customerHouseNumber' },
//               { label: 'Famous Point Nearby', name: 'customerFamousPoint' },
//               { label: 'Email', name: 'customerEmail' },
//             ].map(({ label, name }) => (
//               <div key={name} className="mb-4">
//                 <label className="block text-sm font-medium mb-2">{label}</label>
//                 <input
//                   type={name === 'customerEmail' ? 'email' : 'text'}
//                   name={name}
//                   className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   style={{ borderColor: formData[name] && !errors[name] ? 'green' : '' }}
//                 />
//                 {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
//               </div>
//             ))}
//             <button type="submit" className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Order Place !'}</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartProduct;




























import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from "firebase/firestore";
import { db, auth } from '../../Config/Firebase/Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setCart, removeItem } from '../../Config/ReducerConfig/Reducer/CartItemSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartProduct = () => {
  const [Cartproducts, setCartProducts] = useState([]);
  const cartItems = useSelector((state) => state.cartItems.items);
  const [userUid, setUserUid] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [baseDeliveryFee] = useState(0); 
  const [incrementalDeliveryFee] = useState(0); 
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhoneNumber: '',
    customerFullAddress: '',
    customerCity: '',
    customerTownOrBlock: '',
    customerHouseNumber: '',
    customerFamousPoint: '',
    customerEmail: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          setUserUid(uid);
          setIsLoggedIn(true);

          try {
            const q = query(collection(db, "CartProducts"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach((doc) => {
              const obj = {
                docId: doc.id,
                ...doc.data()
              };
              products.push(obj);
            });
            setCartProducts(products);
            dispatch(setCart(products));
          } catch (error) {
            console.error("Error fetching products: ", error);
          }
        } else {
          setIsLoggedIn(false);
          const storedUid = localStorage.getItem('uidcocki');
          if (storedUid) {
            try {
              const q = query(collection(db, "CartProducts"), where("uid", "==", storedUid));
              const querySnapshot = await getDocs(q);
              const products = [];
              querySnapshot.forEach((doc) => {
                const obj = {
                  docId: doc.id,
                  ...doc.data()
                };
                products.push(obj);
              });
              setCartProducts(products);
            } catch (error) {
              console.error("Error fetching products: ", error);
            }
          }
        }
      });
    };

    getProducts();
  }, [cartItems, dispatch]);

  const deleteCartItem = async (itemId) => {
    try {
      if (isLoggedIn) {
        // User is logged in
        await deleteDoc(doc(db, "CartProducts", itemId));
        const updatedProducts = Cartproducts.filter(item => item.docId !== itemId);
        setCartProducts(updatedProducts);
        dispatch(removeItem({ id: itemId }));
      } else {
        // User is not logged in
        await deleteDoc(doc(db, "CartProducts", itemId)); // Delete from Firebase
        const updatedProducts = Cartproducts.filter(item => item.docId !== itemId);
        setCartProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error deleting item from Firebase: ", error);
    }
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const calculateTotal = () => {
    const selectedProducts = Cartproducts.filter((item) =>
      selectedItems.includes(item.docId || item.id)
    );

    const totalCost = selectedProducts.reduce((total, item) => total + (item.price || 0), 0);
    const deliveryCharges = selectedProducts.length > 1 
      ? baseDeliveryFee + ((selectedProducts.length - 1) * incrementalDeliveryFee) 
      : baseDeliveryFee;

    return {
      totalCost,
      deliveryCharges,
      totalItems: selectedProducts.length,
    };
  };

  const { totalCost, deliveryCharges, totalItems } = calculateTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'This field is required'
      }));
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        newErrors[key] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    const orderNumber = `ORD-${Date.now()}`;
    const orderDate = new Date().toLocaleString();

    const orderData = {
      ...formData,
      orderNumber,
      orderDate,
      selectedItems: selectedItems.map(itemId => {
        const item = Cartproducts.find(product => product.docId === itemId || product.id === itemId);
        if (!item) {
          return null;
        }
        return {
          productName: item.ProductName,
          price: item.price,
          image: item.Image,
          color: item.color,
          size: item.size,
          status: 'pending'
        };
      }).filter(item => item !== null),
      totalCost,
      deliveryCharges,
      totalAmount: totalCost + deliveryCharges,
      status: 'pending'
    };

    try {
      await addDoc(collection(db, "Orders"), orderData);

      selectedItems.forEach(itemId => {
        deleteCartItem(itemId);
      });

      setShowForm(false);
      setSelectedItems([]);
      setFormData({
        customerName: '',
        customerPhoneNumber: '',
        customerFullAddress: '',
        customerCity: '',
        customerTownOrBlock: '',
        customerHouseNumber: '',
        customerFamousPoint: '',
        customerEmail: '',
      });
    } catch (error) {
      console.error("Error submitting order: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrderClick = () => {
    setShowForm(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="mt-4">
        <p className="text-lg font-semibold">Number of items in cart: {Cartproducts.length}</p>
        <ul className="mt-2">
          {Cartproducts.map((item, index) => (
            <li key={index} className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={selectedItems.includes(item.docId || item.id)}
                  onChange={() => toggleSelectItem(item.docId || item.id)}
                />
                <img src={item.Image} alt={item.ProductName} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p className="text-sm font-medium">{item.ProductName}</p>
                  <p className="text-sm text-gray-600">Colour: {item.color}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Price: {item.price}.00PKR</p>
                </div>
              </div>
              {/* <button onClick={() => deleteCartItem(item.docId || item.id)} className="bg-[#555] hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button> */}
              <button 
  onClick={() => deleteCartItem(item.docId || item.id)} 
  className="text-white bg-transparent hover:bg-white hover:text-red-700 font-bold py-1 px-2 rounded-full transition-colors duration-200">
  ✖
</button>

            </li>
          ))}
        </ul>
        {selectedItems.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Cost: {totalCost}.00PKR</p>
            <p>Delivery Charges: {deliveryCharges}.00PKR</p>
            <p className="font-bold">Total Amount: {totalCost + deliveryCharges}.00PKR</p>
            <button onClick={handleConfirmOrderClick} className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">Click to Confirm Order</button>
          </div>
        )}
      </div>
      {showForm && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          
        <h2 className="text-base font-semibold mb-4">we dispatch your order after recice 100 rupes advance</h2>
        <h2 className="text-base font-semibold mb-4">our team contect you soon dont worry</h2>
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Customer Name', name: 'customerName' },
              { label: 'Phone Number', name: 'customerPhoneNumber' },
              { label: 'Full Address', name: 'customerFullAddress' },
              { label: 'City', name: 'customerCity' },
              { label: 'Town or Block', name: 'customerTownOrBlock' },
              { label: 'House Number', name: 'customerHouseNumber' },
              { label: 'Famous Point Nearby', name: 'customerFamousPoint' },
              { label: 'Email', name: 'customerEmail' },
            ].map(({ label, name }) => (
              <div key={name} className="mb-4">
                <label className="block text-sm font-medium mb-2">{label}</label>
                <input
                  type={name === 'customerEmail' ? 'email' : 'text'}
                  name={name}
                  className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
                  value={formData[name]}
                  onChange={handleChange}
                  style={{ borderColor: formData[name] && !errors[name] ? 'green' : '' }}
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
            <button type="submit" className="bg-[#555] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded">{loading ? <span className="loading loading-spinner loading-md"></span> : 'Order Place !'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
