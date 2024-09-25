

// import React, { useRef, useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, app, db } from '../../Config/Firebase/Firebase';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const SignupCard = () => {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);
//   const [showErr, setErr] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showMsg, setShowMsg] = useState('');
//   const navigate = useNavigate();

//   const signupUser = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setErr('');
//     setShowMsg('');

//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;
//     const confirmPassword = confirmPasswordRef.current.value;

//     if (password !== confirmPassword) {
//       setErr("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     const auth = getAuth();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         uid: user.uid,
//         createdAt: new Date(),
//       });

//       setShowMsg("You successfully signed up");
//       console.log('User signed up:', user);
//       setLoading(false);
//       navigate('/');
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(`Error [${errorCode}]: ${errorMessage}`);
//       setErr(errorMessage);
//       setLoading(false);
//     }

//     emailRef.current.value = "";
//     confirmPasswordRef.current.value = "";
//     passwordRef.current.value = '';
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
//         <p className="mb-4 text-center text-green-600">{showMsg}</p>
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
//   type="submit"
//   className="bg-[#555] hover:bg-[#4CAF50] w-full  text-white py-2 px-4 rounded-lg  transition duration-300 flex justify-center items-center"
// >
//   {loading ? (
//     <span className="loading loading-spinner loading-sm"></span>
//   ) : (
//     "Create Account"
//   )}
// </button>

//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-700">
//             Already have an account?
//             <Link to={"/Signin"} className="text-indigo-500 hover:underline ml-1">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupCard;

















import React, { useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, app, db } from '../../Config/Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupCard = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showErr, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState('');
  const navigate = useNavigate();

  const signupUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErr('');
    setShowMsg('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      setShowMsg("You successfully signed up");
      // console.log('User signed up:', user);
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
    confirmPasswordRef.current.value = "";
    passwordRef.current.value = '';
  };

  // const signupWithGoogle = async () => {
  //   const auth = getAuth();
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const userCredential = await signInWithPopup(auth, provider);
  //     const user = userCredential.user;
      
  //     // Check if the user is new or existing
  //     if (userCredential.additionalUserInfo.isNewUser) {
  //       // Save user data to Firestore for new users
  //       await setDoc(doc(db, "users", user.uid), {
  //         email: user.email,
  //         uid: user.uid,
  //         createdAt: new Date(),
  //       });
  //     }

  //     setShowMsg("You successfully signed up with Google");
  //     console.log('User signed up with Google:', user);
  //     setLoading(false);
  //     navigate('/');
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.error(`Error [${errorCode}]: ${errorMessage}`);
  //     setErr(errorMessage);
  //     setLoading(false);
  //   }
  // };



  const signupWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if additional user info exists
      if (userCredential.additionalUserInfo) {
        // Check if the user is new or existing
        if (userCredential.additionalUserInfo.isNewUser) {
          // Save user data to Firestore for new users
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            createdAt: new Date(),
          });
        }
      }
  
      setShowMsg("You successfully signed up with Google");
      console.log('User signed up with Google:', user);
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <p className="mb-4 text-center text-green-600">{showMsg}</p>
        {showErr && <p className="mb-4 text-center text-red-600">{showErr}</p>}
        <form onSubmit={signupUser}>
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
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#555] hover:bg-[#4CAF50] w-full text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?
            <Link to={"/Signin"} className="text-indigo-500 hover:underline ml-1">Login</Link>
          </p>
        </div> */}
        <div className="mt-4 text-center">
          <p>signup With Google to click</p>
          <button
            onClick={signupWithGoogle}
            className="bg-[#4285F4] hover:bg-[#357AE8] w-full text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign up with Google"
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?
            <Link to={"/Signin"} className="text-indigo-500 hover:underline ml-1">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupCard;
