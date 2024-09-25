
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { FaPlus, FaClipboardList, FaAd, FaTruck, FaCheck, FaHome } from 'react-icons/fa';
import AddProduct from '../../Component/AddProduct/AddProduct';
import PendingOrders from '../../Component/PendingOrders/PendingOrders';
import ShippedOrders from '../../Component/ShippedOrder/ShippedOrdrs';
import DeliveredOrders from '../../Component/DeliverdOrders/DeliverdOrders';
import AdsManager from '../../Component/adsManager/AdsManager';
import MainDashboard from '../../Component/Main-Dashboard/MainDashboard'; // Import MainDashboard component
import { auth } from '../../Config/Firebase/Firebase';

const allowedEmails = ['muhummadbilawal@gmail.com']; // Add the allowed email(s)

const DashBoard = () => {
  const [activePanel, setActivePanel] = useState('mainDashboard');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && allowedEmails.includes(user.email)) {
        setIsAuthorized(true);
      } else {
        navigate('/'); // Redirect to home or login if not authorized
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const renderPanel = () => {
    switch (activePanel) {
      case 'mainDashboard':
        return <MainDashboard setActivePanel={setActivePanel} />; // Pass setActivePanel to MainDashboard
      case 'addProduct':
        return <AddProduct />;
      case 'pendingOrders':
        return <PendingOrders />;
      case 'shippedOrders':
        return <ShippedOrders />;
      case 'deliveredOrders':
        return <DeliveredOrders />; // Add case for DeliveredOrders
      case 'adsManager':
        return <AdsManager />;
      default:
        return <MainDashboard setActivePanel={setActivePanel} />; // Default to MainDashboard
    }
  };

  if (!isAuthorized) {
    return null; // Optionally, return a loading spinner here
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <nav className="flex-1 mt-6">
            <ul>
              <li className={`p-3 cursor-pointer ${activePanel === 'mainDashboard' ? 'bg-blue-500' : ''}`} onClick={() => setActivePanel('mainDashboard')}>
                <FaHome className="inline-block mr-2" /> Dashboard
              </li>
              <li className={`p-3 cursor-pointer ${activePanel === 'pendingOrders' ? 'bg-blue-500' : ''}`} onClick={() => setActivePanel('pendingOrders')}>
                <FaClipboardList className="inline-block mr-2" /> Pending Orders
              </li>
              <li className={`p-3 cursor-pointer ${activePanel === 'shippedOrders' ? 'bg-blue-500' : ''}`} onClick={() => setActivePanel('shippedOrders')}>
                <FaTruck className="inline-block mr-2" /> Shipped Orders
              </li>
              <li className={`p-3 cursor-pointer ${activePanel === 'deliveredOrders' ? 'bg-blue-500' : ''}`} onClick={() => setActivePanel('deliveredOrders')}>
                <FaCheck className="inline-block mr-2" /> Delivered Orders
              </li>
              <li className={`p-3 cursor-pointer ${activePanel === 'addProduct' ? 'bg-blue-500' : ''}`} onClick={() => setActivePanel('addProduct')}>
                <FaPlus className="inline-block mr-2" /> Add Product
              </li>
              <li className={`p-3 cursor-pointer ${activePanel === 'adsManager' ? 'bg-blue-500' : ''}`} onClick={() => setActivePanel('adsManager')}>
                <FaAd className="inline-block mr-2" /> Ads Manager
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          {renderPanel()}
        </main>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 AL-Ziyarah.com. All rights reserved Deploy by H.Sharjeel.</p>
      </footer>
    </div>
  );
};

export default DashBoard;
