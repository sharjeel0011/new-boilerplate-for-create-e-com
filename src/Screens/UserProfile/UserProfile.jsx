// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { db, app } from '../../Config/Firebase/Firebase';

// const UserProfile = () => {
//   const { currentUser } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [userOrders, setUserOrders] = useState([]);

//   useEffect(() => {
//     const unsubscribe = app.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // Fetch user data
//         const userRef = db.collection('users').doc(user.uid);
//         userRef.get().then((doc) => {
//           if (doc.exists) {
//             setUserData(doc.data());
//           } else {
//             console.log('No such document!');
//           }
//         }).catch((error) => {
//           console.log('Error getting document:', error);
//         });

//         // Fetch user orders
//         const ordersRef = db.collection('orders').where('userId', '==', user.uid);
//         ordersRef.get().then((querySnapshot) => {
//           const orders = [];
//           querySnapshot.forEach((doc) => {
//             orders.push({ id: doc.id, ...doc.data() });
//           });
//           setUserOrders(orders);
//         }).catch((error) => {
//           console.log('Error getting orders:', error);
//         });
//       }
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <div>
//       {currentUser && (
//         <div>
//           <h2>User Profile</h2>
//           <div>
//             <p>Name: {userData && userData.name}</p>
//             <p>Email: {userData && userData.email}</p>
//           </div>
//           <h3>Order Status</h3>
//           <div>
//             {userOrders.map((order) => (
//               <div key={order.id}>
//                 <p>Order ID: {order.id}</p>
//                 <p>Status: {order.status}</p>
//                 {/* Display other order details as needed */}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
