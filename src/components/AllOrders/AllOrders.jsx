import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery("allOrders", getAllOrders);

  async function getAllOrders() {
    return await axios.get(
      `https://beige-alligator-527710.hostingersite.com/public/api/order`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          "Content-Type": "application/json"
        },
      }
    );
  }

  async function cancelOrder(orderId) {
    try {
      await axios.post(
        `https://beige-alligator-527710.hostingersite.com/public/api/order/${orderId}/cancel`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        }
      );
      alert("Order cancelled successfully");
      queryClient.invalidateQueries("allOrders");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order");
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:w-[85%] mx-auto min-h-screen bg-white dark:bg-gray-900">
      {data?.data?.data?.length > 0 ? (
        data.data.data.map((order, idx) => (
          <div
            key={idx}
            className="p-5 mb-6 bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition duration-300"
          >
            {/* Header: Order number + Status */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white">
                Order Number:{" "}
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {order.number}
                </span>
              </h2>
              <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
                Status:{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {order.status}
                </span>
              </p>
            </div>

            {/* Total Price */}
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Total Price: {order.total_price} EGP
            </p>

            {/* Actions */}
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Link
                to={`/OrderDetails/${order.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </Link>

              <button
                onClick={() => cancelOrder(order.id)}
                disabled={order.status === "cancelled"}
                className={`px-4 py-2 rounded text-sm font-medium transition ${order.status === "cancelled"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
              >
                {order.status === "cancelled" ? "Cancelled" : "Cancel Order"}
              </button>
            </div>

            {/* Ordered Items */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex justify-center items-center rounded-md">
                    <p className="text-white text-sm text-center px-2 opacity-0 group-hover:opacity-100 transition">
                      {item.product_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-20 text-gray-700 dark:text-gray-300 text-lg">
          You don't have any orders yet.
        </div>
      )}
    </div>

  );
};
export default AllOrders;
