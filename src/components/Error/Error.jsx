import { useNavigate } from 'react-router-dom';
const Error = () => {
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate('/');
  };

  return (

    <div className="sm:w-full md:w-3/4 lg:w-1/2 mx-auto px-4 flex flex-col justify-center items-center h-[530px] bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center text-gray-900 dark:text-white">
        404 Not Found
      </h1>

      <p className="pt-4 sm:pt-6 text-center text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
        The page you visited was not found. You can go back to the homepage.
      </p>

      <div className="pt-8 w-full flex justify-center">
        <button
          type="button"
          onClick={handleRedirectToHome}
          className="bg-[#004182] w-full sm:w-auto text-white font-medium mt-4 px-5 py-3 text-base text-center rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white transition duration-300"
        >
          Back to Home Page
        </button>
      </div>
    </div>

  );
};

export default Error;


