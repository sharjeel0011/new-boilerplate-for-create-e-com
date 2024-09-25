// import React, { useEffect, useState } from 'react';
// import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from '../../Config/Firebase/Firebase';
// import Modal from 'react-modal';

// // Set the app element for accessibility
// Modal.setAppElement('#root');

// const ShippedOrders = () => {
//   const [shippedOrders, setShippedOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const fetchShippedOrders = async () => {
//     try {
//       const q = query(collection(db, "Orders"), where("status", "==", "shipped"));
//       const querySnapshot = await getDocs(q);
//       const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setShippedOrders(orders);
//     } catch (error) {
//       console.error("Error fetching shipped orders: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchShippedOrders();
//   }, []);

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold text-center mb-4">Shipped Orders</h2>
//       {shippedOrders.length > 0 ? (
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Order Number</th>
//               <th className="py-2 px-4 border-b">Customer Name</th>
//               <th className="py-2 px-4 border-b">Product Name</th>
//               <th className="py-2 px-4 border-b">Order Date</th>
//               <th className="py-2 px-4 border-b">Order Time</th>
//               <th className="py-2 px-4 border-b">Status</th>
//               <th className="py-2 px-4 border-b">Total Amount</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shippedOrders.map((order) => (
//               <tr key={order.id}>
//                 <td className="py-2 px-4 border-b">{order.orderNumber}</td>
//                 <td className="py-2 px-4 border-b">{order.customerName}</td>
//                 <td className="py-2 px-4 border-b">{order.selectedItems.map(item => item.productName).join(", ")}</td>
//                 <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
//                 <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleTimeString()}</td>
//                 <td className="py-2 px-4 border-b">{order.status}</td>
//                 <td className="py-2 px-4 border-b">{order.totalAmount}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2"
//                     onClick={() => openModal(order)}
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-600">No shipped orders</p>
//       )}

//       {selectedOrder && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           contentLabel="Order Details"
//           className="modal-content"
//           overlayClassName="modal-overlay"
//         >
//           <div className="modal-header">
//             <h2 className="text-xl font-bold">Order Details</h2>
//             <button className="close-btn" onClick={closeModal}>Close</button>
//           </div>
//           <div className="modal-body">
//             <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
//             <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
//             <p><strong>Customer Phone Number:</strong> {selectedOrder.customerPhoneNumber}</p>
//             <p><strong>Customer Address:</strong> {selectedOrder.customerFullAddress}</p>
//             <p><strong>Customer City:</strong> {selectedOrder.customerCity}</p>
//             <p><strong>Customer House Number:</strong> {selectedOrder.customerHouseNumber}</p>
//             <p><strong>Customer Town or Block:</strong> {selectedOrder.customerTownOrBlock}</p>
//             <p><strong>Customer Famous Point:</strong> {selectedOrder.customerFamousPoint}</p>
//             <p><strong>Delivery Charges:</strong> {selectedOrder.deliveryCharges}</p>
//             <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
//             <p><strong>Total Amount:</strong> {selectedOrder.totalAmount}</p>
//             <p><strong>Status:</strong> {selectedOrder.status}</p>
//             <h3 className="text-lg font-bold mt-4">Selected Items:</h3>
//             <ul className="list-disc pl-6">
//               {selectedOrder.selectedItems.map((item, index) => (
//                 <li key={index} className="mb-4">
//                   <p><strong>Product Name:</strong> {item.productName}</p>
//                   <p><strong>Color:</strong> {item.color}</p>
//                   <p><strong>Size:</strong> {item.size}</p>
//                   <p><strong>Price:</strong> {item.price}</p>
//                   <img src={item.image} alt={item.productName} className="w-16 h-16" />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ShippedOrders;









import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../../Config/Firebase/Firebase';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const ShippedOrders = () => {
  const [shippedOrders, setShippedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchShippedOrders = async () => {
    try {
      const q = query(collection(db, "Orders"), where("status", "==", "shipped"));
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShippedOrders(orders);
    } catch (error) {
      console.error("Error fetching shipped orders: ", error);
    }
  };

  useEffect(() => {
    fetchShippedOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalIsOpen(false);
  };

  const markAsDelivered = async (orderId) => {
    try {
      const orderDoc = doc(db, "Orders", orderId);
      await updateDoc(orderDoc, { status: 'delivered' });
      fetchShippedOrders(); // Refresh the list of orders after updating
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-center mb-4">Shipped Orders</h2>
      {shippedOrders.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order Number</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Order Time</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shippedOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                <td className="py-2 px-4 border-b">{order.customerName}</td>
                <td className="py-2 px-4 border-b">{order.selectedItems.map(item => item.productName).join(", ")}</td>
                <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleTimeString()}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">{order.totalAmount}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2"
                    onClick={() => openModal(order)}
                  >
                    Details
                  </button>
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded-md"
                    onClick={() => markAsDelivered(order.id)}
                  >
                    Delivered 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No shipped orders</p>
      )}

      {selectedOrder && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h2 className="text-xl font-bold">Order Details</h2>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
          <div className="modal-body">
            <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Customer Phone Number:</strong> {selectedOrder.customerPhoneNumber}</p>
            <p><strong>Customer Address:</strong> {selectedOrder.customerFullAddress}</p>
            <p><strong>Customer City:</strong> {selectedOrder.customerCity}</p>
            <p><strong>Customer House Number:</strong> {selectedOrder.customerHouseNumber}</p>
            <p><strong>Customer Town or Block:</strong> {selectedOrder.customerTownOrBlock}</p>
            <p><strong>Customer Famous Point:</strong> {selectedOrder.customerFamousPoint}</p>
            <p><strong>Delivery Charges:</strong> {selectedOrder.deliveryCharges}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Total Amount:</strong> {selectedOrder.totalAmount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <h3 className="text-lg font-bold mt-4">Selected Items:</h3>
            <ul className="list-disc pl-6">
              {selectedOrder.selectedItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Product Name:</strong> {item.productName}</p>
                  <p><strong>Color:</strong> {item.color}</p>
                  <p><strong>Size:</strong> {item.size}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <img src={item.image} alt={item.productName} className="w-16 h-16" />
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShippedOrders;

