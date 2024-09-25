

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Badge from '@mui/material/Badge';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Drawer from '@mui/material/Drawer';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from '../../Config/Firebase/Firebase';
// import LocalMallIcon from '@mui/icons-material/LocalMall';
// import Header from '../header/Header';

// const pages = [
//   { name: 'Home', route: '/' },
//   { name: 'T-shirts', route: '/T-shirtsProducts' },
//   { name: 'Shirts', route: '/ShirtsProducts' },
//   { name: 'Oversize T-Shirt', route: '/OversizeTshirts' },
//   { name: 'Minimal T-Shirt', route: '/MinimalTshirt' },
//   { name: 'Bottomwear', route: '/Bottomwear' },
//   { name: 'Casual', route: '/Causal' }
// ];

// const settings = ['Profile', 'Account', 'Dashboard'];

// function Navbar() {
//   const cartItems = useSelector((state) => state.cartItems.items);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setShowModal(true);
//       setUser(null);
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const cartItemsCount = cartItems ? cartItems.length : 0;

//   const handleCartClick = () => {
//     navigate('/CartProducts');
//   };

//   const handlePageClick = (route) => {
//     navigate(route);
//   };

//   return (
//     <>
//       <div position="fixed">
//         <Header />
//         <AppBar sx={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
//           <Toolbar>
//             <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <IconButton
//                 size="large"
//                 aria-label="toggle navigation menu"
//                 onClick={handleToggleSidebar}
//                 color="inherit"
//                 sx={{
//                   display: { xs: 'flex', md: 'none' },
//                   marginRight: 'auto',
//                   marginLeft: '2px',
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>

//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 sx={{
//                   fontFamily: 'monospace',
//                   fontWeight: 700,
//                   letterSpacing: '.2rem',
//                   color: 'inherit',
//                   textDecoration: 'none',
//                   textAlign: 'center',
//                   padding: '8px 0',
//                   display: { xs: 'block', md: 'none' },
//                 }}
//               >
//                 AlbariOutfit
//               </Typography>

//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 sx={{
//                   fontFamily: 'monospace',
//                   fontWeight: 700,
//                   letterSpacing: '.3rem',
//                   color: 'inherit',
//                   textDecoration: 'none',
//                   display: { xs: 'none', md: 'block' },
//                 }}
//               >
//                 AlbariOutfit
//               </Typography>

//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                   {pages.map((page) => (
//                     <Button key={page.name} sx={{ mx: 1, color: 'black' }} onClick={() => handlePageClick(page.route)}>
//                       {page.name}
//                     </Button>
//                   ))}
//                 </Box>

//                 <Tooltip title="Cart">
//                   <IconButton color="inherit" sx={{ fontSize: '1.2rem', ml: 1 }} onClick={handleCartClick}>
//                     <Badge badgeContent={cartItemsCount} color="black">
//                       <LocalMallIcon fontSize="small" />
//                     </Badge>
//                   </IconButton>
//                 </Tooltip>

//                 <Tooltip title="Open settings">
//                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
//                     <Avatar alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" sx={{ width: 32, height: 32 }} />
//                   </IconButton>
//                 </Tooltip>

//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorElUser}
//                   anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   open={Boolean(anchorElUser)}
//                   onClose={handleCloseUserMenu}
//                 >
//                   {user ? (
//                     <>
//                       {settings.map((setting) => (
//                         <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                           <Typography variant="body1" textAlign="center" sx={{ textTransform: 'capitalize' }}>
//                             {setting}
//                           </Typography>
//                         </MenuItem>
//                       ))}
//                       <MenuItem onClick={handleLogout}>
//                         <Typography variant="body1" textAlign="center">
//                           Logout
//                         </Typography>
//                       </MenuItem>
//                     </>
//                   ) : (
//                     <MenuItem onClick={handleCloseUserMenu}>
//                       <Link to="/Signin" className="text-black">
//                         <Typography variant="body1" textAlign="center">
//                           Login
//                         </Typography>
//                       </Link>
//                     </MenuItem>
//                   )}
//                 </Menu>
//               </Box>
//             </Container>
//           </Toolbar>
//         </AppBar>

//         <Drawer
//           anchor="left"
//           open={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//           sx={{
//             '& .MuiDrawer-paper': {
//               width: '250px',
//               backgroundColor: 'white',
//               color: 'black',
//               textAlign: 'center',
//               paddingTop: '16px',
//             },
//           }}
//         >
//           <Box sx={{ width: '250px', padding: '16px' }}>
//             <Box>
//               {pages.map((page) => (
//                 <Button
//                   key={page.name}
//                   fullWidth
//                   sx={{
//                     textTransform: 'capitalize',
//                     marginBottom: '8px',
//                     color: 'black',
//                     justifyContent: 'start',
//                   }}
//                   onClick={() => handlePageClick(page.route)}
//                 >
//                   {page.name}
//                 </Button>
//               ))}
//             </Box>
//           </Box>
//         </Drawer>
        

//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="bg-black bg-opacity-50 absolute inset-0"></div>
//             <div className="bg-white rounded-lg shadow-lg p-6 z-10">
//               <h2 className="text-2xl font-bold mb-4">Logout Successful</h2>
//               <p>You have been logged out successfully.</p>
//               <button
//                 className="bg-[#555] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Navbar;
























import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Config/Firebase/Firebase';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Header from '../header/Header';



//tshirt ===            abaya
// shirt ===            hijabs 
// Oversize T-Shirt === sandels 
// Minimal T-Shirt ===  pumps
//Bottomwear ===        slipers
// causal ===           perfumes


const pages = [
  { name: 'Home', route: '/' },
  { name: 'Abaya', route: '/T-shirtsProducts' },
  { name: 'Hijabs', route: '/ShirtsProducts' },
  { name: 'Sandels', route: '/OversizeTshirts' },
  { name: 'Pumps', route: '/MinimalTshirt' },
  { name: 'Asoseries', route: '/Bottomwear' },
  { name: 'Perfumes', route: '/Causal' }
];

const settings = ['Profile', 'Account', 'Dashboard'];

function Navbar() {
  const cartItems = useSelector((state) => state.cartItems.items);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowModal(true);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const cartItemsCount = cartItems ? cartItems.length : 0;

  const handleCartClick = () => {
    navigate('/CartProducts');
  };

  const handlePageClick = (route) => {
    navigate(route);
  };

  return (
    <>
      <div position="fixed">
        <Header />
        <AppBar sx={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
          <Toolbar>
            <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton
                size="large"
                aria-label="toggle navigation menu"
                onClick={handleToggleSidebar}
                color="inherit"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  marginRight: 'auto',
                  marginLeft: '2px',
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                component="div"
                sx={{
                  textAlign: 'center',
                  padding: '10px 0',
                  display: { xs: 'block', md: 'none' },
                  marginRight:'auto'  //logo ko move ker ne k lye
                }}
                onClick={()=>{ navigate('/')}}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/Untitled-2%20LOGO%20AL%20ZIYARAH.png?alt=media&token=c6cdfd72-1be7-4ce6-8de5-7cf941a9a833"
                  alt="AL-ziyarah"
                  style={{ height: '82px',cursor:'pointer' }}
                />
              </Box>

              <Box
                component="div"
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/Untitled-2%20LOGO%20AL%20ZIYARAH.png?alt=media&token=c6cdfd72-1be7-4ce6-8de5-7cf941a9a833"
                  alt="AlbariOutfit Logo"
                  style={{ height: '100px',cursor:'pointer' }}
                  onClick={()=>{ navigate('/')}}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button key={page.name} sx={{ mx: 1, color: 'black' }} onClick={() => handlePageClick(page.route)}>
                      {page.name}
                    </Button>
                  ))}
                </Box>

                <Tooltip title="Cart">
                  <IconButton color="inherit" sx={{ fontSize: '1.2rem', ml: 1 }} onClick={handleCartClick}>
                    <Badge badgeContent={cartItemsCount} color="black">
                      <LocalMallIcon fontSize="small" />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                    <Avatar alt="User Avatar" 
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" sx={{ width: 32, height: 32 }} />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user ? (
                    <>
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography variant="body1" textAlign="center" sx={{ textTransform: 'capitalize' }}>
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                      <MenuItem onClick={handleLogout}>
                        <Typography variant="body1" textAlign="center">
                          Logout
                        </Typography>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/Signin" className="text-black">
                        <Typography variant="body1" textAlign="center">
                          Login
                        </Typography>
                      </Link>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: '250px',
              backgroundColor: 'white',
              color: 'black',
              textAlign: 'center',
              paddingTop: '16px',
            },
          }}
        >
          <Box sx={{ width: '250px', padding: '16px' }}>
            <Box>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  fullWidth
                  sx={{
                    textTransform: 'capitalize',
                    marginBottom: '8px',
                    color: 'black',
                    justifyContent: 'start',
                  }}
                  onClick={() => handlePageClick(page.route)}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Drawer>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-50 absolute inset-0"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
              <h2 className="text-2xl font-bold mb-4">Logout Successful</h2>
              <p>You have been logged out successfully.</p>
              <button
                className="bg-[#555] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;








