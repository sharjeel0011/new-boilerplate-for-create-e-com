


// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from "firebase/firestore";
// import { db } from '../../Config/Firebase/Firebase';
// import Modal from 'react-modal';
// import UpdateProduct from '../UpdateProduct/UpdateProduct';

// // Set the app element for accessibility
// Modal.setAppElement('#root');

// const MainDashboard = ({ setActivePanel }) => {
//   const [counts, setCounts] = useState({
//     pendingOrders: 0,
//     shippedOrders: 0,
//     deliveredOrders: 0,
//     totalProducts: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchCounts = async () => {
//     try {
//       const ordersSnapshot = await getDocs(collection(db, "Orders"));
//       const productsSnapshot = await getDocs(collection(db, "Product"));
      
//       let pendingOrders = 0;
//       let shippedOrders = 0;
//       let deliveredOrders = 0;

//       ordersSnapshot.forEach((doc) => {
//         const order = doc.data();
//         if (order.status === 'pending') pendingOrders++;
//         if (order.status === 'shipped') shippedOrders++;
//         if (order.status === 'delivered') deliveredOrders++;
//       });

//       setCounts({
//         pendingOrders,
//         shippedOrders,
//         deliveredOrders,
//         totalProducts: productsSnapshot.size,
//       });

//       const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setProducts(productsData);
//     } catch (error) {
//       console.error("Error fetching counts: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchCounts();
//   }, []);

//   const openProductModal = () => {
//     setIsProductModalOpen(true);
//   };

//   const closeProductModal = () => {
//     setIsProductModalOpen(false);
//   };

//   const openUpdateProduct = (productId) => {
//     setSelectedProduct(productId);
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold text-center mb-4">Dashboard Overview</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-blue-500 text-white p-4 rounded-md cursor-pointer" onClick={() => setActivePanel('pendingOrders')}>
//           <h3 className="text-lg font-bold">Pending Orders</h3>
//           <p className="text-2xl">{counts.pendingOrders}</p>
//         </div>
//         <div className="bg-green-500 text-white p-4 rounded-md cursor-pointer" onClick={() => setActivePanel('shippedOrders')}>
//           <h3 className="text-lg font-bold">Shipped Orders</h3>
//           <p className="text-2xl">{counts.shippedOrders}</p>
//         </div>
//         <div className="bg-yellow-500 text-white p-4 rounded-md cursor-pointer" onClick={() => setActivePanel('deliveredOrders')}>
//           <h3 className="text-lg font-bold">Delivered Orders</h3>
//           <p className="text-2xl">{counts.deliveredOrders}</p>
//         </div>
//         <div className="bg-red-500 text-white p-4 rounded-md cursor-pointer" onClick={openProductModal}>
//           <h3 className="text-lg font-bold">Total Products</h3>
//           <p className="text-2xl">{counts.totalProducts}</p>
//         </div>
//       </div>

//       <Modal
//         isOpen={isProductModalOpen}
//         onRequestClose={closeProductModal}
//         contentLabel="Product Details"
//         className="modal-content"
//         overlayClassName="modal-overlay"
//       >
//         <div className="modal-header">
//           <h2 className="text-xl font-bold">Product Details</h2>
//           <button className="close-btn" onClick={closeProductModal}>Close</button>
//         </div>
//         <div className="modal-body">
//           {products.length > 0 ? (
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b">Product Name</th>
//                   <th className="py-2 px-4 border-b">Category</th>
//                   <th className="py-2 px-4 border-b">Price</th>
//                   <th className="py-2 px-4 border-b">Stock</th>
//                   <th className="py-2 px-4 border-b">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product.id}>
//                     <td className="py-2 px-4 border-b">{product.name}</td>
//                     <td className="py-2 px-4 border-b">{product.category}</td>
//                     <td className="py-2 px-4 border-b">${product.price}</td>
//                     <td className="py-2 px-4 border-b">{product.stock}</td>
//                     <td className="py-2 px-4 border-b">
//                       <button 
//                         className="bg-blue-500 text-white px-2 py-1 rounded-md"
//                         onClick={() => openUpdateProduct(product.id)}
//                       >
//                         Update
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-center text-gray-600">No products available</p>
//           )}
//         </div>
//       </Modal>

//       {selectedProduct && <UpdateProduct productId={selectedProduct} />}
//     </div>
//   );
// };

// export default MainDashboard;


















import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../Config/Firebase/Firebase';
import Modal from 'react-modal';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

// Set the app element for accessibility
Modal.setAppElement('#root');

const MainDashboard = ({ setActivePanel }) => {
  const [counts, setCounts] = useState({
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    totalProducts: 0,
  });

  const [products, setProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchCounts = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, "Orders"));
      const productsSnapshot = await getDocs(collection(db, "Product"));
      
      let pendingOrders = 0;
      let shippedOrders = 0;
      let deliveredOrders = 0;

      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        if (order.status === 'pending') pendingOrders++;
        if (order.status === 'shipped') shippedOrders++;
        if (order.status === 'delivered') deliveredOrders++;
      });

      setCounts({
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        totalProducts: productsSnapshot.size,
      });

      const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching counts: ", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const openProductModal = () => {
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
  };

  const openUpdateProduct = (productId) => {
    setSelectedProduct(productId);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-center mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-md cursor-pointer" onClick={() => setActivePanel('pendingOrders')}>
          <h3 className="text-lg font-bold">Pending Orders</h3>
          <p className="text-2xl">{counts.pendingOrders}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-md cursor-pointer" onClick={() => setActivePanel('shippedOrders')}>
          <h3 className="text-lg font-bold">Shipped Orders</h3>
          <p className="text-2xl">{counts.shippedOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-md cursor-pointer" onClick={() => setActivePanel('deliveredOrders')}>
          <h3 className="text-lg font-bold">Delivered Orders</h3>
          <p className="text-2xl">{counts.deliveredOrders}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-md cursor-pointer" onClick={openProductModal}>
          <h3 className="text-lg font-bold">Total Products</h3>
          <p className="text-2xl">{counts.totalProducts}</p>
        </div>
      </div>

      <Modal
        isOpen={isProductModalOpen}
        onRequestClose={closeProductModal}
        contentLabel="Product Details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="text-xl font-bold">Product Details</h2>
          <button className="close-btn" onClick={closeProductModal}>Close</button>
        </div>
        <div className="modal-body">
          {products.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Stock</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">PKR:{product.price}</td>
                    <td className="py-2 px-4 border-b">{product.stock}</td>
                    <td className="py-2 px-4 border-b">
                      <button 
                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                        onClick={() => openUpdateProduct(product.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No products available</p>
          )}
        </div>
      </Modal>

      {selectedProduct && <UpdateProduct productId={selectedProduct} />}
    </div>
  );
};

export default MainDashboard;
