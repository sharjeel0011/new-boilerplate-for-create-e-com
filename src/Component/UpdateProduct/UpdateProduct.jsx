import React, { useRef, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../Config/Firebase/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdateProduct = ({ productId }) => {
  const productNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const discountPriceRef = useRef(null);
  const imageUrlRef = useRef(null);
  const deliveryChargeRef = useRef(null);
  const categoryRef = useRef(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [colors, setColors] = useState([{ color: '', image: null }]);
  const [product, setProduct] = useState(null);

  const categories = ['Shoes', 'Dress', 'Makeup'];

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, "Product", productId));
      if (productDoc.exists()) {
        const productData = productDoc.data();
        setProduct(productData);
        productNameRef.current.value = productData.name;
        descriptionRef.current.value = productData.description;
        priceRef.current.value = productData.productFullPrice;
        discountPriceRef.current.value = productData.price;
        deliveryChargeRef.current.value = productData.deliveryCharge;
        categoryRef.current.value = productData.category;
        setColors(productData.colors || [{ color: '', image: null }]);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
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

    if (!productName || !description || !price || !discountPrice || !deliveryCharge || !category || colors.some(c => !c.color || !c.image)) {
      setError('All fields are required');
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) { // Limit file size to 5MB
      setError('File size should be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      let imageUrl = product.imageUrl;
      if (imageFile) {
        const storageRef = ref(storage, `productImages/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              setUploading(false);
              setError('Error uploading image');
              console.error("Error uploading image: ", error);
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Upload color images
      const colorData = await Promise.all(colors.map(async (color) => {
        if (color.image instanceof File) {
          const colorStorageRef = ref(storage, `colorImages/${color.image.name}`);
          const colorUploadTask = await uploadBytesResumable(colorStorageRef, color.image);
          const colorImageUrl = await getDownloadURL(colorUploadTask.ref);
          return {
            color: color.color,
            imageUrl: colorImageUrl
          };
        } else {
          return color;
        }
      }));

      // Update product details in Firestore
      await updateDoc(doc(db, "Product", productId), {
        name: productName,
        description,
        productFullPrice: parseFloat(price),
        price: parseFloat(discountPrice),
        imageUrl,
        deliveryCharge: parseFloat(deliveryCharge),
        category,
        colors: colorData
      });

      setUploading(false);
      setUploadProgress(0);
      alert('Product updated successfully');
    } catch (error) {
      setUploading(false);
      console.error("Error updating product: ", error);
      setError('Error updating product');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Update Product</h1>
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
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
            {uploading ? `Uploading... (${Math.round(uploadProgress)}%)` : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
