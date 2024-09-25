
// import React, { useState, useRef, useEffect } from 'react';
// import { collection, addDoc } from "firebase/firestore";
// import { db, auth, storage } from '../../Config/Firebase/Firebase';
// import { onAuthStateChanged } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const SellCenter = () => {
//   const productNameRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const priceRef = useRef(null);
//   const discountPriceRef = useRef(null);
//   const imageUrlRef = useRef(null);
//   const deliveryChargeRef = useRef(null);
//   const categoryRef = useRef(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [colors, setColors] = useState([{ color: '', image: null }]);

//   const categories = ['Shoes', 'Dress', 'Makeup'];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleColorChange = (index, field, value) => {
//     const newColors = [...colors];
//     newColors[index][field] = value;
//     setColors(newColors);
//   };

//   const addColor = () => {
//     setColors([...colors, { color: '', image: null }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const productName = productNameRef.current.value;
//     const description = descriptionRef.current.value;
//     const price = priceRef.current.value;
//     const discountPrice = discountPriceRef.current.value;
//     const deliveryCharge = deliveryChargeRef.current.value;
//     const imageFile = imageUrlRef.current.files[0];
//     const category = categoryRef.current.value;

//     if (!productName || !description || !price || !discountPrice || !imageFile || !deliveryCharge || !category || colors.some(c => !c.color || !c.image)) {
//       setError('All fields are required');
//       return;
//     }

//     if (imageFile.size > 5 * 1024 * 1024) { // Limit file size to 5MB
//       setError('File size should be less than 5MB');
//       return;
//     }

//     setError('');
//     setUploading(true);

//     try {
//       const storageRef = ref(storage, `productImages/${imageFile.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, imageFile);

//       uploadTask.on('state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setUploadProgress(progress);
//         },
//         (error) => {
//           setUploading(false);
//           setError('Error uploading image');
//           console.error("Error uploading image: ", error);
//         },
//         async () => {
//           const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

//           // Upload color images
//           const colorData = await Promise.all(colors.map(async (color) => {
//             const colorStorageRef = ref(storage, `colorImages/${color.image.name}`);
//             const colorUploadTask = await uploadBytesResumable(colorStorageRef, color.image);
//             const colorImageUrl = await getDownloadURL(colorUploadTask.ref);
//             return {
//               color: color.color,
//               imageUrl: colorImageUrl
//             };
//           }));

//           // Add product details to Firestore
//           try {
//             await addDoc(collection(db, "Product"), {
//               name: productName,
//               description,
//               productFullPrice: parseFloat(price),
//               price: parseFloat(discountPrice),
//               imageUrl,
//               deliveryCharge: parseFloat(deliveryCharge),
//               category,
//               colors: colorData
//             });
//             productNameRef.current.value = '';
//             descriptionRef.current.value = '';
//             priceRef.current.value = '';
//             discountPriceRef.current.value = '';
//             imageUrlRef.current.value = '';
//             deliveryChargeRef.current.value = '';
//             categoryRef.current.value = '';
//             setColors([{ color: '', image: null }]);
//             setUploading(false);
//             setUploadProgress(0);
//             alert('Product added successfully');
//           } catch (error) {
//             setUploading(false);
//             console.error("Error adding product: ", error);
//             setError('Error adding product');
//           }
//         }
//       );
//     } catch (error) {
//       setUploading(false);
//       console.error("Error during upload: ", error);
//       setError('Error during upload');
//     }
//   };

//   if (!isLoggedIn) {
//     return <p className="text-center text-red-500">You must be logged in to add products</p>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
//       <h1 className="text-2xl font-bold text-center mb-6">Add a New Product</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Product Name</label>
//           <input
//             type="text"
//             ref={productNameRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             ref={descriptionRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Price</label>
//           <input
//             type="number"
//             ref={priceRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Discount Price</label>
//           <input
//             type="number"
//             ref={discountPriceRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Image</label>
//           <input
//             type="file"
//             ref={imageUrlRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         {/* {uploading && (
//           <div className="mb-4">
//             <label className="block text-gray-700">Uploading: {Math.round(uploadProgress)}%</label>
//             <div className="w-full bg-gray-200 h-4 rounded-md">
//               <div
//                 className="bg-pink-500 h-4 rounded-md"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           </div>
//         )} */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Delivery Charge</label>
//           <input
//             type="number"
//             ref={deliveryChargeRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Category</label>
//           <select
//             ref={categoryRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             <option value="">Select Category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
//         {colors.map((color, index) => (
//           <div key={index} className="mb-4">
//             <label className="block text-gray-700">Color {index + 1}</label>
//             <input
//               type="text"
//               value={color.color}
//               onChange={(e) => handleColorChange(index, 'color', e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"
//             />
//             <input
//               type="file"
//               onChange={(e) => handleColorChange(index, 'image', e.target.files[0])}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={addColor} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 mb-4">
//           Add Another Color
//         </button>
//         {uploading && (
//           <div className="mb-4">
//             <label className="block text-gray-700">Uploading: {Math.round(uploadProgress)}%</label>
//             <div className="w-full bg-gray-200 h-4 rounded-md">
//               <div
//                 className="bg-pink-500 h-4 rounded-md"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           </div>
//         )}
//         <button
//           type="submit"
//           className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
//           disabled={uploading}
//         >
//           {uploading ? 'Uploading...' : 'Add Product'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SellCenter;



















