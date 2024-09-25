


// import React, { useEffect, useState } from 'react';
// import { doc, getDoc, addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
// import { db, auth } from '../../Config/Firebase/Firebase';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { additem, setCart } from '../../Config/ReducerConfig/Reducer/CartItemSlice';
// import { onAuthStateChanged } from "firebase/auth";
// import { v4 as uuidv4 } from 'uuid';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [cartProducts, setCartProducts] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [mainImageUrl, setMainImageUrl] = useState('');
//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cartItems.items);

//   useEffect(() => {
//     const initializeUserId = () => {
//       let storedUserId = localStorage.getItem('uidcocki');
//       if (!storedUserId) {
//         storedUserId = uuidv4();
//         localStorage.setItem('uidcocki', storedUserId);
//       }
//       setUserId(storedUserId);
//     };

//     async function fetchProducts(uid) {
//       try {
//         const q = query(collection(db, "CartProducts"), where("uid", "==", uid));
//         const querySnapshot = await getDocs(q);
//         const products = [];
//         querySnapshot.forEach((doc) => {
//           products.push({ docId: doc.id, ...doc.data() });
//         });
//         setCartProducts(products);
//         if (isLoggedIn) {
//           dispatch(setCart(products));
//         }
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     }

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//         setUserId(user.uid);
//         fetchProducts(user.uid);
//       } else {
//         setIsLoggedIn(false);
//         initializeUserId();
//         fetchProducts(localStorage.getItem('uidcocki'));
//       }
//     });
//   }, [dispatch, isLoggedIn]);

//   useEffect(() => {
//     async function fetchProduct() {
//       if (!id) return;
//       try {
//         const docRef = doc(db, "Product", id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const productData = docSnap.data();
//           setProduct(productData);
//           setSelectedColor(productData.colors ? productData.colors[0] : null);
//           setMainImageUrl(productData.colors && productData.colors[0] ? productData.colors[0].imageUrl : productData.imageUrl);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     }
//     fetchProduct();
//   }, [id]);

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     setMainImageUrl(color.imageUrl);
//   };

//   const addToCart = async () => {
//     if (!product || !selectedColor || !selectedSize) {
//       setShowSizeModal(true); // Show modal if size is not selected
//       return;
//     }

//     const selectedStockItem = product.sizes.find(size => size.size === selectedSize);
//     if (selectedStockItem.stock <= 0) {
//       alert('Selected size is out of stock.');
//       return;
//     }

//     const cartItem = {
//       ProductName: product.name,
//       Image: mainImageUrl,
//       deliveryCharge: product.deliveryCharge,
//       description: product.description,
//       price: product.price,
//       uid: userId,
//       color: selectedColor.color,
//       colorImage: selectedColor.imageUrl,
//       size: selectedSize,
//     };

//     try {
//       // Update stock in Firebase
//       const productRef = doc(db, "Product", id);
//       const updatedSizes = product.sizes.map(size => {
//         if (size.size === selectedSize) {
//           return { ...size, stock: size.stock - 1 };
//         }
//         return size;
//       });
//       await updateDoc(productRef, { sizes: updatedSizes });

//       // Handle adding to cart based on login status
//       if (isLoggedIn) {
//         const docRef = await addDoc(collection(db, "CartProducts"), cartItem);
//         const updatedCartProducts = [...cartProducts, { docId: docRef.id, ...cartItem }];
//         setCartProducts(updatedCartProducts);
//         dispatch(setCart(updatedCartProducts));
//       } else {
//         const newItem = { docId: uuidv4(), ...cartItem };
//         const updatedCartProducts = [...cartProducts, newItem];
//         setCartProducts(updatedCartProducts);
//         dispatch(additem(newItem));
//         // Save cart item in Firebase using uidcocki
//         await addDoc(collection(db, "CartProducts"), { ...cartItem, uid: localStorage.getItem('uidcocki') });
//       }

//       // Update UI
//       setProduct(prevProduct => ({
//         ...prevProduct,
//         sizes: updatedSizes
//       }));

//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {product ? (
//         <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//           {/* Product Images Section */}
//           <div className="md:w-1/2 p-4">
//             <img src={mainImageUrl} alt="Product" className="w-full rounded-lg shadow-md" />
//             <div className="flex space-x-2 mt-2">
//               {product.colors && product.colors.map((color, index) => (
//                 <img
//                   key={index}
//                   src={color.imageUrl}
//                   alt={color.color}
//                   className={`w-20 h-20 rounded-lg shadow-md cursor-pointer ${selectedColor === color ? 'border-4 border-blue-500' : ''}`}
//                   onClick={() => handleColorChange(color)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Details Section */}
//           <div className="md:w-1/2 p-4">
//             <h2 className="text-3xl text-customGray font-bold mb-2">{product.name}</h2>
//             <p className="text-2xl font-extrabold text-green-500 mb-4">{product.price}.00 <sub>PKR</sub></p>
//             <p className='strikethrough text-gray-400 inline-block font-normal'>
//               {product.productFullPrice} <sub>PKR</sub>
//             </p>
//             <div className="mb-4">
//               <div className="mb-2">Color: <span className="font-semibold">{selectedColor ? selectedColor.color : 'Select a color'}</span></div>
//               <div>
//                 Size: 
//                 <select 
//                   className="select select-ghost w-3/6 max-w-xs border-lime-500"
//                   value={selectedSize} 
//                   onChange={(e) => setSelectedSize(e.target.value)}
//                 >
//                   <option disabled selected>Pick your size</option>
//                   {product.sizes && product.sizes.map((sizeItem, index) => (
//                     <option key={index} value={sizeItem.size} disabled={sizeItem.stock <= 0}>
//                       {sizeItem.size} ({sizeItem.stock > 0 ? `Stock: ${sizeItem.stock}` : 'Out of Stock'})
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <button onClick={addToCart} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
//               Add to Cart
//             </button>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Product Description</h3>
//               <p>{product.description}</p>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
//               <p>★★★★☆ (4/5)</p>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
//               <p>Estimated delivery: 4-8 business days.</p>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Related Products</h3>
//               {/* Add related products here */}
//             </div>
//             <p>Number of items in cart: {cartItems ? cartItems.length : 0}</p>
//             {isLoggedIn && (
//               <p>Number of items in cart (logged in): {cartProducts.length}</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading product details...</p>
//       )}
//       {/* Optionally show size selection modal */}
//       {showSizeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-2">Size Selection Required</h3>
//             <p>Please select a size before adding the product to your cart.</p>
//             <button onClick={() => setShowSizeModal(false)} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;





















import React, { useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db, auth } from '../../Config/Firebase/Firebase';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { additem, setCart } from '../../Config/ReducerConfig/Reducer/CartItemSlice';
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.items);

  useEffect(() => {
    const initializeUserId = () => {
      let storedUserId = localStorage.getItem('uidcocki');
      if (!storedUserId) {
        storedUserId = uuidv4();
        localStorage.setItem('uidcocki', storedUserId);
      }
      setUserId(storedUserId);
    };

    async function fetchProducts(uid) {
      try {
        const q = query(collection(db, "CartProducts"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ docId: doc.id, ...doc.data() });
        });
        setCartProducts(products);
        if (isLoggedIn) {
          dispatch(setCart(products));
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        fetchProducts(user.uid);
      } else {
        setIsLoggedIn(false);
        initializeUserId();
        fetchProducts(localStorage.getItem('uidcocki'));
      }
    });
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, "Product", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setSelectedColor(productData.colors ? productData.colors[0] : null);
          setMainImageUrl(productData.colors && productData.colors[0] ? productData.colors[0].imageUrl : productData.imageUrl);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setMainImageUrl(color.imageUrl);
  };

  const addToCart = async () => {
    if (!product || !selectedColor || !selectedSize) {
      setShowSizeModal(true); // Show modal if size is not selected
      return;
    }

    const selectedStockItem = product.sizes.find(size => size.size === selectedSize);
    if (selectedStockItem.stock <= 0) {
      alert('Selected size is out of stock.');
      return;
    }

    const cartItem = {
      ProductName: product.name,
      Image: mainImageUrl,
      deliveryCharge: product.deliveryCharge,
      description: product.description,
      price: product.price,
      uid: userId,
      color: selectedColor.color,
      colorImage: selectedColor.imageUrl,
      size: selectedSize,
    };

    try {
      // Update stock in Firebase
      const productRef = doc(db, "Product", id);
      const updatedSizes = product.sizes.map(size => {
        if (size.size === selectedSize) {
          return { ...size, stock: size.stock - 1 };
        }
        return size;
      });
      await updateDoc(productRef, { sizes: updatedSizes });

      // Handle adding to cart based on login status
      if (isLoggedIn) {
        const docRef = await addDoc(collection(db, "CartProducts"), cartItem);
        const updatedCartProducts = [...cartProducts, { docId: docRef.id, ...cartItem }];
        setCartProducts(updatedCartProducts);
        dispatch(setCart(updatedCartProducts));
      } else {
        const newItem = { docId: uuidv4(), ...cartItem };
        const updatedCartProducts = [...cartProducts, newItem];
        setCartProducts(updatedCartProducts);
        dispatch(additem(newItem));
        // Save cart item in Firebase using uidcocki
        await addDoc(collection(db, "CartProducts"), { ...cartItem, uid: localStorage.getItem('uidcocki') });
      }

      // Update UI
      setProduct(prevProduct => ({
        ...prevProduct,
        sizes: updatedSizes
      }));

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {product ? (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Product Images Section */}
          <div className="md:w-1/2 p-4">
            <img src={mainImageUrl} alt="Product" className="w-full rounded-lg shadow-md" />
            {/* <div className="flex  space-x-2 mt-2">
              {product.colors && product.colors.map((color, index) => (
                <img
                  key={index}
                  src={color.imageUrl}
                  alt={color.color}
                  className={`w-16 h-16 rounded-lg shadow-md cursor-pointer ${selectedColor === color ? 'border-4 border-blue-500' : ''}`}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div> */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 mt-2">
  {product.colors && product.colors.map((color, index) => (
    <img
      key={index}
      src={color.imageUrl}
      alt={color.color}
      className={`w-16 h-16 rounded-lg shadow-md cursor-pointer ${selectedColor === color ? 'border-4 border-blue-500' : ''}`}
      onClick={() => handleColorChange(color)}
    />
  ))}
</div>

          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl text-customGray font-bold mb-2">{product.name}</h2>
            <p className="text-2xl font-extrabold text-green-500 mb-4">{product.price}.00 <sub>PKR</sub></p>
            <p className='strikethrough text-gray-400 inline-block font-normal'>
              {product.productFullPrice} <sub>PKR</sub>
            </p>
            <div className="mb-4">
              <div className="mb-2">Color: <span className="font-semibold">{selectedColor ? selectedColor.color : 'Select a color'}</span></div>
              <div>
                Size: 
                <select 
                  className="select select-ghost w-3/6 max-w-xs border-lime-500"
                  value={selectedSize} 
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option disabled selected>Pick your size</option>
                  {product.sizes && product.sizes.map((sizeItem, index) => (
                    <option key={index} value={sizeItem.size} disabled={sizeItem.stock <= 0}>
                      {sizeItem.size} ({sizeItem.stock > 0 ? `Stock: ${sizeItem.stock}` : 'Out of Stock'})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={addToCart} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
              Add to Cart
            </button>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Product Description</h3>
              <p>{product.description}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
              <p>★★★★☆ (4/5)</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
              <p>Estimated delivery: 4-8 business days.</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Related Products</h3>
              {/* Add related products here */}
            </div>
            {/* <p>Number of items in cart: {cartItems ? cartItems.length : 0}</p> */}
            <p> enjoy your shopping experience with Al-Ziyarah </p>
            {isLoggedIn && (
              <p> enjoy your shopping experience with Al-Ziyarah </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
      {/* Optionally show size selection modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Size Selection Required</h3>
            <p>Please select a size before adding the product to your cart.</p>
            <button onClick={() => setShowSizeModal(false)} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;






