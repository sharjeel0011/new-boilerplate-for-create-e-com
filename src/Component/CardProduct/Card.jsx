





import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../../Config/Firebase/Firebase';
import { useNavigate, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Card = () => {
  const [productsArray, setProductsArray] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, "Product"));
      const products = [];
      querySnapshot.forEach((doc) => {
        const obj = {
          docId: doc.id,
          ...doc.data()
        };
        products.push(obj);
      });
      setProductsArray(products);
    }

    getProducts();
  }, []);

  const handleBuyNow = async (index) => {
    try {
      const selectedProduct = productsArray[index];
      const docRef = await addDoc(collection(db, "ProductDetails"), {
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageUrl: selectedProduct.imageUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  function productDetailPage(id) {
    navigate(`/Product/${id}`);
  }

  return (
    <div className='cardProduct justify-around flex gap-4 flex-wrap p-10'>
      {productsArray.length > 0 ? (
        productsArray.map((item, index) => (
          <div
            onClick={() => {
              productDetailPage(item.docId)
            }}
            key={index}
            className="card cursor-pointer card-compact w-60 bg-base-100 shadow-xl mt-20"
            data-aos="fade-up"
          >
            <figure className="overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </figure>
            <div className="card-body">
              {item.name.length > 20 ? `${item.name.substring(0, 24)}...` : item.name}
              <div className="flex justify-center items-center flex-col">
                <p className='strikethrough text-gray-400 inline-block font-normal'>
                 {item.productFullPrice+'00'} <sub>PKR</sub>
                </p>
                <br />
                <h1 className="inline-block text-green-600 font-extrabold">
                 RS. {item.price + '.00'}
                </h1>
                <div className="rating rating-xs">
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='justify-around flex gap-4 flex-wrap p-10'>
          {[...Array(25)].map((_, index) => (
            <div key={index} className="flex flex-col gap-4 w-52">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
