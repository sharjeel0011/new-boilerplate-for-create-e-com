

// import React, { useRef, useState } from 'react';
// import { collection, addDoc } from "firebase/firestore";
// import { db, storage } from '../../Config/Firebase/Firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const AddProduct = () => {
//   const productNameRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const priceRef = useRef(null);
//   const discountPriceRef = useRef(null);
//   const imageUrlRef = useRef(null);
//   const deliveryChargeRef = useRef(null);
//   const categoryRef = useRef(null);
//   const sizeRef = useRef(null);
// const stockRef = useRef(null);
// const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL', 'XXL']);
// const [stock, setStock] = useState({});

//   const [error, setError] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [colors, setColors] = useState([{ color: '', image: null }]);
//   const [campaigns, setCampaigns] = useState([]);

//   const categories = ['Abaya', 'Hijab', 'Sandal', 'Pump', 'Slipper', 'Perfume'];
//   const campaignOptions = ['Trending Product', 'Sales Products', 'New Arrival', 'Featured Product','rendom'];

//   const handleColorChange = (index, field, value) => {
//     const newColors = [...colors];
//     newColors[index][field] = value;
//     setColors(newColors);
//   };
//   const handleSizeChange = (index, value) => {
//     const newSizes = [...sizes];
//     newSizes[index] = value;
//     setSizes(newSizes);
//   };
  
//   const handleStockChange = (size, value) => {
//     const newStock = { ...stock, [size]: value };
//     setStock(newStock);
//   };
  
//   const handleCampaignChange = (e) => {
//     const { options } = e.target;
//     const selectedCampaigns = [];
//     for (let i = 0, l = options.length; i < l; i++) {
//       if (options[i].selected) {
//         selectedCampaigns.push(options[i].value);
//       }
//     }
//     setCampaigns(selectedCampaigns);
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

//     if (!productName || !description || !price || !discountPrice || !imageFile || !deliveryCharge || !category || colors.some(c => !c.color || !c.image) || campaigns.length === 0) {
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
//           const sizesData = sizes.map((size, index) => ({
//             size,
//             stock: stock[size] || 0,
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
//               campaigns,
//               colors: colorData,
//               sizes: sizesData,
//               rating: 4.0,
//             });
            
//             productNameRef.current.value = '';
//             descriptionRef.current.value = '';
//             priceRef.current.value = '';
//             discountPriceRef.current.value = '';
//             imageUrlRef.current.value = '';
//             deliveryChargeRef.current.value = '';
//             categoryRef.current.value = '';
//             setCampaigns([]);
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

//   return (
//     <div>
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
//         <div className="mb-4">
//           <label className="block text-gray-700">Campaign</label>
//           <select
//             multiple
//             onChange={handleCampaignChange}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             {campaignOptions.map((campaign, index) => (
//               <option key={index} value={campaign}>{campaign}</option>
//             ))}
//           </select>
//         </div>
//         {sizes.map((size, index) => (
//   <div key={index} className="mb-4">
//     <label className="block text-gray-700">{`Size ${size}`}</label>
//     <input
//       type="number"
//       onChange={(e) => handleStockChange(size, parseInt(e.target.value))}
//       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//     />
//   </div>
// ))}
//         {colors.map((color, index) => (
//           <div key={index} className="mb-4">
//             <label className="block text-gray-700">Color {index + 1}</label>
//             <input
//               type="text"
//               value={color.color}
//               onChange={(e) => handleColorChange(index, 'color', e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"
//               placeholder="Color Name"
//             />
//             <input
//               type="file"
//               onChange={(e) => handleColorChange(index, 'image', e.target.files[0])}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//             />
//           </div>
//         ))}
       

//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={addColor}
//             className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             Add Color
//           </button>
//         </div>
//         <div className="mb-4">
//           <button
//             type="submit"
//             disabled={uploading}
//             className={`w-full py-2 ${uploading ? 'bg-gray-400' : 'bg-pink-500'} text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500`}
//           >
//             {uploading ? `Uploading... (${Math.round(uploadProgress)}%)` : 'Add Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
















//this is good 




import React, { useRef, useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../../Config/Firebase/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProduct = () => {
  const productNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const discountPriceRef = useRef(null);
  const imageUrlRef = useRef(null);
  const deliveryChargeRef = useRef(null);
  const categoryRef = useRef(null);
  const sizeRef = useRef(null);
  const stockRef = useRef(null);
  const [sizes, setSizes] = useState([]);
  const [stock, setStock] = useState({});
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [colors, setColors] = useState([{ color: '', image: null }]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Abaya', 'Hijab', 'Sandal', 'Pump', 'Assoseries', 'Perfume'];
  const campaignOptions = ['Trending Product', 'Sales Products', 'New Arrival', 'Featured Product', 'Random'];

  const categorySizes = {
    Abaya: ['50', '52', '54', '56'],
    Hijab: ['Free Size'],
    Sandal: ['36', '37', '38', '39', '40', '41'],
    Pump: ['36', '37', '38', '39', '40', '41'],
    Slipper: ['Free Size'],
    Perfume: ['25ML','50ML','100ML']  // Custom sizes, if any
  };

  useEffect(() => {
    if (selectedCategory) {
      setSizes(categorySizes[selectedCategory] || []);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const handleStockChange = (size, value) => {
    const newStock = { ...stock, [size]: value };
    setStock(newStock);
  };

  const handleCampaignChange = (e) => {
    const { options } = e.target;
    const selectedCampaigns = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedCampaigns.push(options[i].value);
      }
    }
    setCampaigns(selectedCampaigns);
  };

  const addColor = () => {
    setColors([...colors, { color: '', image: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productName = productNameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const discountPrice = discountPriceRef.current.value;
    const deliveryCharge = deliveryChargeRef.current.value;
    const imageFile = imageUrlRef.current.files[0];
    const category = categoryRef.current.value;

    if (!productName || !description || !price || !discountPrice || !imageFile || !deliveryCharge || !category || colors.some(c => !c.color || !c.image) || campaigns.length === 0) {
      setError('All fields are required');
      return;
    }

    if (imageFile.size > 5 * 1024 * 1024) { // Limit file size to 5MB
      setError('File size should be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const storageRef = ref(storage, `productImages/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploading(false);
          setError('Error uploading image');
          console.error("Error uploading image: ", error);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Upload color images
          const colorData = await Promise.all(colors.map(async (color) => {
            if (color.image) {
              const colorStorageRef = ref(storage, `colorImages/${color.image.name}`);
              const colorUploadTask = await uploadBytesResumable(colorStorageRef, color.image);
              const colorImageUrl = await getDownloadURL(colorUploadTask.ref);
              return {
                color: color.color,
                imageUrl: colorImageUrl
              };
            } else {
              return null;
            }
          }));
          const sizesData = sizes.map((size) => ({
            size,
            stock: stock[size] || 0,
          }));
          
          // Add product details to Firestore
          try {
            await addDoc(collection(db, "Product"), {
              name: productName,
              description,
              productFullPrice: parseFloat(price),
              price: parseFloat(discountPrice),
              imageUrl,
              deliveryCharge: parseFloat(deliveryCharge),
              category,
              campaigns,
              colors: colorData.filter(c => c !== null),
              sizes: sizesData,
              rating: 4.0,
            });
            
            productNameRef.current.value = '';
            descriptionRef.current.value = '';
            priceRef.current.value = '';
            discountPriceRef.current.value = '';
            imageUrlRef.current.value = '';
            deliveryChargeRef.current.value = '';
            categoryRef.current.value = '';
            setCampaigns([]);
            setColors([{ color: '', image: null }]);
            setSizes([]);
            setStock({});
            setUploading(false);
            setUploadProgress(0);
            alert('Product added successfully');
          } catch (error) {
            setUploading(false);
            console.error("Error adding product: ", error);
            setError('Error adding product');
          }
        }
      );
    } catch (error) {
      setUploading(false);
      console.error("Error during upload: ", error);
      setError('Error during upload');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Add a New Product</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            ref={productNameRef}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            ref={descriptionRef}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            ref={priceRef}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Discount Price</label>
          <input
            type="number"
            ref={discountPriceRef}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            ref={imageUrlRef}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Delivery Charge</label>
          <input
            type="number"
            ref={deliveryChargeRef}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            ref={categoryRef}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Campaign</label>
          <select
            multiple
            onChange={handleCampaignChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {campaignOptions.map((campaign, index) => (
              <option key={index} value={campaign}>{campaign}</option>
            ))}
          </select>
        </div>
        {sizes.map((size, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">{`Size ${size}`}</label>
            <input
              type="number"
              onChange={(e) => handleStockChange(size, parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        ))}
        {colors.map((color, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Color {index + 1}</label>
            <input
              type="text"
              value={color.color}
              onChange={(e) => handleColorChange(index, 'color', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"
              placeholder="Color Name"
            />
            <input
              type="file"
              onChange={(e) => handleColorChange(index, 'image', e.target.files[0])}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        ))}
        <div className="mb-4">
          <button
            type="button"
            onClick={addColor}
            className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Add Color
          </button>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 ${uploading ? 'bg-gray-400' : 'bg-pink-500'} text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            {uploading ? `Uploading... (${Math.round(uploadProgress)}%)` : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;




































































// import React, { useRef, useState, useEffect } from 'react';
// import { collection, addDoc } from "firebase/firestore";
// import { db, storage } from '../../Config/Firebase/Firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const AddProduct = () => {
//   const productNameRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const priceRef = useRef(null);
//   const discountPriceRef = useRef(null);
//   const imageUrlRef = useRef(null);
//   const deliveryChargeRef = useRef(null);
//   const categoryRef = useRef(null);
//   const [sizes, setSizes] = useState([]);
//   const [stock, setStock] = useState({});
//   const [error, setError] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [colors, setColors] = useState([{ color: '', image: null }]);
//   const [variants, setVariants] = useState([{ type: 'Hijab', colors: [{ color: '', image: null }], quantity: 0, numColors: 1 }]);
//   const [campaigns, setCampaigns] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const categories = ['Abaya', 'Hijab', 'Sandal', 'Pump', 'Slipper', 'Perfume'];
//   const campaignOptions = ['Trending Product', 'Sales Products', 'New Arrival', 'Featured Product', 'Random'];

//   const categorySizes = {
//     Abaya: ['50', '52', '54', '56'],
//     Hijab: ['Free Size'],
//     Sandal: ['36', '37', '38', '39', '40', '41'],
//     Pump: ['36', '37', '38', '39', '40', '41'],
//     Slipper: ['36', '37', '38', '39', '40', '41'],
//     Perfume: []  // Custom sizes, if any
//   };

//   useEffect(() => {
//     if (selectedCategory) {
//       setSizes(categorySizes[selectedCategory] || []);
//       if (selectedCategory === 'Hijab') {
//         setVariants([{ type: 'Hijab', colors: [{ color: '', image: null }], quantity: 0, numColors: 1 }]);
//       } else {
//         setVariants([]);
//       }
//     }
//   }, [selectedCategory]);

//   const handleCategoryChange = (e) => {
//     const selected = e.target.value;
//     setSelectedCategory(selected);
//     if (selected === 'Hijab') {
//       setVariants([{ type: 'Hijab', colors: [{ color: '', image: null }], quantity: 0, numColors: 1 }]);
//     } else {
//       setVariants([]);
//     }
//   };

//   const handleColorChange = (variantIndex, colorIndex, field, value) => {
//     const newVariants = [...variants];
//     newVariants[variantIndex].colors[colorIndex][field] = value;
//     setVariants(newVariants);
//   };

//   const handleAddColor = (variantIndex) => {
//     const newVariants = [...variants];
//     const numColors = newVariants[variantIndex].numColors;
//     newVariants[variantIndex].colors.push({ color: '', image: null });
//     newVariants[variantIndex].numColors = numColors + 1;
//     setVariants(newVariants);
//   };

//   const handleVariantChange = (index, field, value) => {
//     const newVariants = [...variants];
//     newVariants[index][field] = value;
//     setVariants(newVariants);
//   };

//   const handleStockChange = (size, value) => {
//     const newStock = { ...stock };
//     newStock[size] = value;
//     setStock(newStock);
//   };

//   const handleCampaignChange = (e) => {
//     const { options } = e.target;
//     const selectedCampaigns = [];
//     for (let i = 0, l = options.length; i < l; i++) {
//       if (options[i].selected) {
//         selectedCampaigns.push(options[i].value);
//       }
//     }
//     setCampaigns(selectedCampaigns);
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

//     if (!productName || !description || !price || !discountPrice || !imageFile || !deliveryCharge || !category || variants.length === 0 || variants.some(v => v.colors.some(c => !c.color || !c.image)) || campaigns.length === 0) {
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
//           const variantColorData = await Promise.all(variants.map(async (variant) => {
//             return Promise.all(variant.colors.map(async (color) => {
//               if (color.image) {
//                 const colorStorageRef = ref(storage, `colorImages/${color.image.name}`);
//                 const colorUploadTask = await uploadBytesResumable(colorStorageRef, color.image);
//                 const colorImageUrl = await getDownloadURL(colorUploadTask.ref);
//                 return {
//                   color: color.color,
//                   imageUrl: colorImageUrl
//                 };
//               } else {
//                 return null;
//               }
//             }));
//           }));
          
//           const sizesData = sizes.map((size) => ({
//             size,
//             stock: stock[size] || 0,
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
//               campaigns,
//               variants: variants.map((variant, index) => ({
//                 type: variant.type,
//                 colors: variantColorData[index].filter(c => c !== null),
//                 quantity: variant.quantity,
//               })),
//               sizes: sizesData,
//               rating: 4.0,
//             });
            
//             productNameRef.current.value = '';
//             descriptionRef.current.value = '';
//             priceRef.current.value = '';
//             discountPriceRef.current.value = '';
//             imageUrlRef.current.value = '';
//             deliveryChargeRef.current.value = '';
//             categoryRef.current.value = '';
//             setCampaigns([]);
//             setVariants([{ type: 'Hijab', colors: [{ color: '', image: null }], quantity: 0, numColors: 1 }]);
//             setSizes([]);
//             setStock({});
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

//   return (
//     <div>
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
//           <label className="block text-gray-700">Delivery Charge</label>
//           <input
//             type="number"
//             ref={deliveryChargeRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Product Image</label>
//           <input
//             type="file"
//             ref={imageUrlRef}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Category</label>
//           <select
//             ref={categoryRef}
//             onChange={handleCategoryChange}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             <option value="">Select a category</option>
//             {categories.map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
//         {sizes.length > 0 && (
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Sizes and Stock</h3>
//             {sizes.map(size => (
//               <div key={size} className="mb-4">
//                 <label className="block text-gray-700">Size {size}</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={stock[size] || ''}
//                   onChange={(e) => handleStockChange(size, e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//         {selectedCategory === 'Hijab' && (
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Variants for Hijab</h3>
//             {variants.map((variant, variantIndex) => (
//               <div key={variantIndex} className="mb-4">
//                 <div className="mb-2">
//                   <label className="block text-gray-700">Variant Type</label>
//                   <input
//                     type="text"
//                     value={variant.type}
//                     onChange={(e) => handleVariantChange(variantIndex, 'type', e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-gray-700">Quantity</label>
//                   <input
//                     type="number"
//                     value={variant.quantity}
//                     onChange={(e) => handleVariantChange(variantIndex, 'quantity', e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block text-gray-700">Number of Colors</label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={variant.numColors}
//                     onChange={(e) => handleVariantChange(variantIndex, 'numColors', e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                   />
//                 </div>
//                 {variant.colors.map((color, colorIndex) => (
//                   <div key={colorIndex} className="mb-4">
//                     <div className="mb-2">
//                       <label className="block text-gray-700">Color</label>
//                       <input
//                         type="text"
//                         value={color.color}
//                         onChange={(e) => handleColorChange(variantIndex, colorIndex, 'color', e.target.value)}
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <label className="block text-gray-700">Color Image</label>
//                       <input
//                         type="file"
//                         onChange={(e) => handleColorChange(variantIndex, colorIndex, 'image', e.target.files[0])}
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => handleAddColor(variantIndex)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   Add Color
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => setVariants([...variants, { type: 'Hijab', colors: [{ color: '', image: null }], quantity: 0, numColors: 1 }])}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Add Variant
//             </button>
//           </div>
//         )}
//         <div className="mb-4">
//           <label className="block text-gray-700">Campaigns</label>
//           <select
//             multiple
//             value={campaigns}
//             onChange={handleCampaignChange}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             {campaignOptions.map(campaign => (
//               <option key={campaign} value={campaign}>{campaign}</option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="submit"
//           disabled={uploading}
//           className={`px-4 py-2 bg-green-500 text-white rounded-md ${uploading && 'opacity-50 cursor-not-allowed'}`}
//         >
//           {uploading ? `Uploading ${Math.round(uploadProgress)}%` : 'Add Product'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
