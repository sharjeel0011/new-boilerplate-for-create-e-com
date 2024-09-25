// import React, { useRef, useState } from 'react';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { auth,app } from '../../Config/Firebase/Firebase';
// import { useNavigate,Link } from 'react-router-dom';
// const SigninCard = () => {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);
//   const [showErr, setErr] = useState('');
//  const [loading , setLoading ]=useState(false)
// const [Shomeg,setShomeg]=useState()
// const Navigate = useNavigate()
//   const signupUser = (event) => {
//     event.preventDefault();
//     setLoading(true)
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;
//     const confirmPassword = confirmPasswordRef.current.value;
   
//     if (password !== confirmPassword) {
//       setErr("Passwords do not match");
//       setLoading(false)
//       return;
//     }


    
//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed up 
//          const user = userCredential.user;
//         setShomeg("You successfuly SingUp",user)
//         console.log('User signed up:', user);
//         setLoading(false)
//         Navigate('/')
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(`Error [${errorCode}]: ${errorMessage}`);
//         setErr(errorMessage);
//         setLoading(false)
//       });
//       emailRef.current.value=""
//       confirmPasswordRef.current.value=""
//       passwordRef.current.value=''
     
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         {/* <h2 className="text-2xl font-bold mb-6 text-center">Login</h2> */}
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

//         <p className="mb-4 text-center text-green-600">{Shomeg}</p>
//         {showErr && <p className="mb-4 text-center text-red-600">{showErr}</p>}
//         <form onSubmit={signupUser}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               ref={emailRef}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               ref={passwordRef}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               ref={confirmPasswordRef}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//               placeholder="Confirm your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-[#555] hover:bg-[#4CAF50] w-full  text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center"
//           >{
//             loading ? (
//                 <span className="loading loading-spinner loading-sm"></span>
//               ) :(
//                 "Login"
//               )
           
//           }</button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-700">
//             dont have an account? 
//             <Link to='/Singup' className="text-indigo-500 hover:underline ml-1">Create Account</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SigninCard;
















import React, { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth, app, db } from '../../Config/Firebase/Firebase';

const SigninCard = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showErr, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState('');
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErr('');
    setShowMsg('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowMsg("You successfully logged in");
      setLoading(false);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
      setErr(errorMessage);
      setLoading(false);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const loginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setShowMsg("You successfully logged in with Google");
      console.log('User signed in with Google:', user);
      setLoading(false);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
      setErr(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <p className="mb-4 text-center text-green-600">{showMsg}</p>
        {showErr && <p className="mb-4 text-center text-red-600">{showErr}</p>}
        <form onSubmit={loginUser}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              ref={emailRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              ref={passwordRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#555] hover:bg-[#4CAF50] w-full text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <Link to='/Signup' className="text-indigo-500 hover:underline">Create Account</Link>
        </div>
        <div className="mt-4 text-center">
          <p>or</p>
          <button
            onClick={loginWithGoogle}
            className="bg-[#4285F4] hover:bg-[#357AE8] w-full text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login with Google"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninCard;
