// import { useContext } from "react";
// import { cartContext } from "../CartContext/CartContext";
// import { CircleLoader } from "react-spinners";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { product, totalPrice, isLoad, numOfItems, updateCount, clearItem, clearCart } =
//     useContext(cartContext);

//   if (isLoad) {
//     return (
//       <div className="h-screen flex flex-wrap justify-center items-center bg-white dark:bg-gray-900">
//         <CircleLoader color="#fff" size={50} speedMultiplier={2} />
//       </div>
//     );
//   }

//   return (
//     <div className="py-5 mx-auto md:w-[85%] mt-16 shadow-lg shadow-gray-500 dark:bg-gray-900 px-4 sm:px-6 min-h-screen">
//       {product?.length === 0 ? (
//         <>
//           <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
//             <div>
//               <h1 className="font-medium text-2xl sm:text-3xl mt-5 dark:text-white">Cart Shop</h1>
//               <h2 className="font-medium text-lg sm:text-xl mt-4 dark:text-gray-300">
//                 Total price: <span className="font-medium text-blue-500">{totalPrice} EGP</span>
//               </h2>
//             </div>
//             <div className="mt-5 w-full sm:w-auto flex flex-col items-center sm:items-end">
//               <Link
//                 to="/payment"
//                 className="bg-blue-600 text-white font-normal hover:bg-blue-700 rounded-lg w-[50%] sm:w-[50%] text-lg p-3 transition duration-300"
//               >
//                 Check Out
//               </Link>
//               <h2 className="font-medium text-lg sm:text-xl mt-4 dark:text-gray-300">
//                 Total number of items: <span className="font-medium text-blue-500">{numOfItems}</span>
//               </h2>
//             </div>
//           </div>

//           {/* Clear Cart Button */}
//           <div className="flex justify-center mt-5">
//             <button
//               onClick={clearCart}
//               className="border border-red-600 text-red-600 dark:text-red-400 font-normal hover:bg-red-600 dark:hover:bg-red-500 hover:text-white rounded-lg w-[50%] sm:w-[20%] h-10 flex items-center justify-center text-lg transition duration-500"
//             >
//               Clear Your Cart
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
//             <div>
//               <h1 className="font-medium text-2xl sm:text-3xl mt-5 dark:text-white">Cart Shop</h1>
//               <h2 className="font-medium text-lg sm:text-xl mt-4 dark:text-gray-300">
//                 Total price: <span className="font-medium text-blue-500">{totalPrice} EGP</span>
//               </h2>
//             </div>
//             <div className="mt-5 w-full sm:w-auto flex flex-col items-center sm:items-end">
//               <Link
//                 to="/payment"
//                 className="bg-red-600 text-white font-normal hover:bg-red-700 rounded-lg w-[50%] sm:w-[50%] text-lg p-3 transition duration-300"
//               >
//                 Check Out
//               </Link>
//               <h2 className="font-medium text-lg sm:text-xl mt-4 dark:text-gray-300">
//                 Total number of items: <span className="font-medium text-blue-500">{numOfItems}</span>
//               </h2>
//             </div>
//           </div>

//           {/* Cart Items */}
//           <div className="mt-5">
//             {product?.map((products, idx) => (
//               <div
//                 key={idx}
//                 className="flex flex-col sm:flex-row items-center border-b border-gray-200 dark:border-gray-700 pb-5 mb-5"
//               >
//                 {/* Product Image */}
//                 <div className="w-full sm:w-1/6 p-4 flex justify-center">
//                   <img
//                     src={products.product.imageCover}
//                     alt=""
//                     className="w-28 sm:w-32 rounded-lg"
//                   />
//                 </div>

//                 {/* Product Details */}
//                 <div className="w-full sm:w-1/2 p-4 text-center sm:text-left">
//                   <h3 className="text-lg sm:text-xl font-medium dark:text-white">
//                     {products.product.title}
//                   </h3>
//                   <h3 className="text-md sm:text-lg font-medium mt-1 dark:text-gray-300">
//                     {products.price} EGP
//                   </h3>

//                   {/* Remove Button */}
//                   <div className="flex items-center justify-center sm:justify-start mt-2">
//                     <i className="fa-solid fa-trash text-red-600 dark:text-red-400 cursor-pointer"></i>
//                     <button
//                       onClick={() => clearItem(products.product._id)}
//                       className="text-red-600 dark:text-red-400 font-normal ml-2 hover:underline transition duration-1000"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div className="w-full sm:w-1/3 md:w-2/6 flex items-center justify-center gap-2 mt-4 sm:mt-0">
//                   <button
//                     onClick={() => updateCount(products.product._id, products.count + 1)}
//                     className="border border-blue-600 dark:border-blue-400 text-black dark:text-white font-normal hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg transition duration-500"
//                   >
//                     +
//                   </button>
//                   <h3 className="text-lg dark:text-white">{products.count}</h3>
//                   <button
//                     onClick={() => updateCount(products.product._id, products.count - 1)}
//                     className="border border-blue-600 dark:border-blue-400 text-black dark:text-white font-normal hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg transition duration-500"
//                   >
//                     -
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Clear Cart Button */}
//             <div className="flex justify-center mt-5">
//               <button
//                 onClick={clearCart}
//                 className="border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 font-normal hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white hover:text-white rounded-lg w-[50%] sm:w-[20%] h-10 flex items-center justify-center text-lg transition duration-500"
//               >
//                 Clear Your Cart
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Cart = () => {
  const { product, totalPrice, isLoad, numOfItems, updateCount, clearItem, clearCart } =
    useContext(cartContext);

  if (isLoad) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  return (
    // <div className="py-5 mx-auto md:w-[85%] mt-16 lg:mb-12 mb-28 shadow-lg shadow-gray-500 dark:shadow-gray-800 dark:bg-gray-900 bg-white px-4 sm:px-6 rounded-lg">
    //   {product?.length === 0 ? (
    //     <div className="text-center flex items-center justify-center h-[50vh] bg-gray-50 dark:bg-gray-900 shadow-md text-gray-500 dark:text-gray-300 mt-2 text-2xl font-semibold rounded-lg">
    //       <h1>Your cart is empty.</h1>
    //     </div>
    //   ) : (
    //     <>
    //       {/* Header */}
    //       <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
    //         <div>
    //           <h1 className="font-medium text-2xl sm:text-3xl mt-5 dark:text-white text-gray-800">Cart Shop</h1>
    //           <h2 className="font-medium text-lg sm:text-xl mt-4 text-gray-700 dark:text-gray-300">
    //             Total price: <span className="font-medium text-blue-500">{totalPrice} EGP</span>
    //           </h2>
    //         </div>
    //         <div className="mt-5 w-full sm:w-auto flex flex-col items-center sm:items-end">
    //           <Link
    //             to="/payment"
    //             className="bg-red-600 text-white font-normal hover:bg-red-700 rounded-lg w-[70%] sm:w-[50%] md:w-[40%] text-lg p-3 transition duration-300"
    //           >
    //             Check Out
    //           </Link>
    //           <h2 className="font-medium text-lg sm:text-xl mt-4 text-gray-700 dark:text-gray-300">
    //             Total items: <span className="font-medium text-blue-500">{numOfItems}</span>
    //           </h2>
    //         </div>
    //       </div>

    //       {/* Cart Items */}
    //       <div className="mt-5">
    //         {product.map((products, idx) => (
    //           <div
    //             key={idx}
    //             className="flex flex-col sm:flex-row items-center border-b border-gray-200 dark:border-gray-700 pb-5 mb-5"
    //           >
    //             {/* Image */}
    //             <div className="w-full sm:w-1/6 p-4 flex justify-center">
    //               <img
    //                 src={products.product.image}
    //                 alt={products.product.name}
    //                 className="w-28 sm:w-32 rounded-lg object-contain"
    //               />
    //             </div>

    //             {/* Product Info */}
    //             <div className="w-full sm:w-1/2 p-4 text-center sm:text-left">
    //               <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">
    //                 {products.product.name}
    //               </h3>
    //               <h3 className="text-md sm:text-lg font-medium mt-1 text-gray-600 dark:text-gray-300">
    //                 {products.product.price} EGP
    //               </h3>

    //               <div className="flex items-center justify-center sm:justify-start mt-2">
    //                 <i className="fa-solid fa-trash text-red-600 dark:text-red-400 cursor-pointer"></i>
    //                 <button
    //                   onClick={() => clearItem(products.product.id)}
    //                   className="text-red-600 dark:text-red-400 font-normal ml-2 hover:underline transition duration-300"
    //                 >
    //                   Remove
    //                 </button>
    //               </div>
    //             </div>

    //             {/* Quantity Controls */}
    //             <div className="w-full sm:w-1/3 md:w-2/6 flex items-center justify-center gap-2 mt-4 sm:mt-0">
    //               {/* Increase */}
    //               <button
    //                 onClick={() => updateCount(products.product.id, products.quantity + 1)}
    //                 className="border border-blue-600 dark:border-blue-400 text-black dark:text-white hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg transition duration-500"
    //               >
    //                 +
    //               </button>

    //               {/* Quantity */}
    //               <h3 className="text-lg text-gray-800 dark:text-white">{products.quantity}</h3>

    //               {/* Decrease */}
    //               <button
    //                 onClick={() => {
    //                   if (products.quantity > 1) {
    //                     updateCount(products.product.id, products.quantity - 1);
    //                   }
    //                 }}
    //                 disabled={products.quantity === 1}
    //                 className={`border border-blue-600 dark:border-blue-400 text-black dark:text-white hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg transition duration-500 ${products.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
    //                   }`}
    //               >
    //                 -
    //               </button>
    //             </div>
    //           </div>
    //         ))}

    //         {/* Clear Cart */}
    //         <div className="flex justify-center mt-5">
    //           <button
    //             onClick={clearCart}
    //             className="border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 font-normal hover:bg-red-600 dark:hover:bg-red-500 hover:text-white dark:hover:text-white rounded-lg w-[60%] sm:w-[30%] md:w-[20%] h-10 flex items-center justify-center text-lg transition duration-500"
    //           >
    //             Clear Your Cart
    //           </button>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className="py-5 mx-auto w-full max-w-[1300px] mt-16 mb-28 lg:mb-12 shadow-lg shadow-gray-500 dark:shadow-gray-800 dark:bg-gray-900 bg-white px-4 sm:px-6 rounded-lg">
  {product?.length === 0 ? (
    <div className="text-center flex items-center justify-center h-[50vh] bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-300 text-2xl font-semibold rounded-lg">
      <h1>Your cart is empty.</h1>
    </div>
  ) : (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
        <div>
          <h1 className="font-medium text-2xl sm:text-3xl dark:text-white text-gray-800">Cart Shop</h1>
          <h2 className="font-medium text-lg sm:text-xl mt-2 text-gray-700 dark:text-gray-300">
            Total price: <span className="text-blue-500">{totalPrice} EGP</span>
          </h2>
        </div>
        <div className="w-full sm:w-auto flex flex-col items-center md:items-end gap-2">
          <Link
            to="/payment"
            className="bg-red-600 text-white hover:bg-red-700 rounded-lg w-full sm:w-[150px] text-lg py-2 px-4 transition duration-300 text-center"
          >
            Check Out
          </Link>
          <h2 className="font-medium text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            Total items: <span className="text-blue-500">{numOfItems}</span>
          </h2>
        </div>
      </div>

      {/* Cart Items */}
      <div className="mt-8 space-y-6">
        {product.map((products, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6"
          >
            {/* Image */}
            <div className="w-full sm:w-1/6 flex justify-center">
              <img
                src={products.product.image}
                alt={products.product.name}
                className="w-28 sm:w-32 rounded-lg object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="w-full sm:w-1/2 text-center sm:text-left space-y-2">
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">
                {products.product.name}
              </h3>
              <p className="text-md sm:text-lg font-medium text-gray-600 dark:text-gray-300">
                {products.product.price} EGP
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <i className="fa-solid fa-trash text-red-600 dark:text-red-400 cursor-pointer"></i>
                <button
                  onClick={() => clearItem(products.product.id)}
                  className="text-red-600 dark:text-red-400 hover:underline transition"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="w-full sm:w-1/3 md:w-2/6 flex items-center justify-center gap-3 mt-2 sm:mt-0">
              <button
                onClick={() => updateCount(products.product.id, products.quantity + 1)}
                className="border border-blue-600 dark:border-blue-400 text-black dark:text-white hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg"
              >
                +
              </button>

              <span className="text-lg text-gray-800 dark:text-white">{products.quantity}</span>

              <button
                onClick={() =>
                  products.quantity > 1 && updateCount(products.product.id, products.quantity - 1)
                }
                disabled={products.quantity === 1}
                className={`border border-blue-600 dark:border-blue-400 text-black dark:text-white hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg ${
                  products.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Cart */}
      <div className="flex justify-center mt-8">
        <button
          onClick={clearCart}
          className="border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white rounded-lg w-2/3 sm:w-1/3 md:w-1/4 h-10 flex items-center justify-center text-lg transition"
        >
          Clear Your Cart
        </button>
      </div>
    </>
  )}
</div>


  );
};

export default Cart;

