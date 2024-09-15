

  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { Search } from 'lucide-react';
import Loader from '../../components/Loader';
  import { CSSTransition, TransitionGroup } from 'react-transition-group'; 

  const ProductCard = ({ build }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
      setLoading(false);
    };

    return (
      <div className="relative w-full h-96 bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-900">
            <Loader color="#ffffff" size={50} />
          </div>
        )}
        <div className={`relative w-full h-full overflow-hidden ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          <img 
            src={build.image} 
            alt={build.device} 
            className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-110"  
            onLoad={handleImageLoad}
          />
          {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-70"></div> */}
        </div>

        <div className="absolute bottom-0 left-0 p-4 rounded bg-opacity-50 bg-gray-900 shadow-t-xl right-0 backdrop-filter backdrop-blur-xl">


          <p className="text-md font-bold text-gray-100 mb-1">{build.codename}</p>
          <h2 className="text-2xl font-semibold text-white mb-4">{build.device}</h2>

          <Link
            to={`/products/${build.codename}`}
            className="inline-block bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-[#393f44] hover:text-white active:scale-95 transition-all duration-500"
          >
            Get Build
          </Link>
        </div>
      </div>
    );
  };

  const CustomROMProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [romBuilds, setRomBuilds] = useState([]);
    const [filteredBuilds, setFilteredBuilds] = useState([]);

    useEffect(() => {
      fetch('/roms.json')
        .then(response => response.json())
        .then(data => {
          setRomBuilds(data);
          setFilteredBuilds(data);
        })
        .catch(error => console.error('Error fetching ROM data:', error));
    }, []);

    useEffect(() => {
      const results = romBuilds.filter(build =>
        build.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
        build.codename.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBuilds(results);
    }, [searchTerm, romBuilds]);

    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-200 mb-8 text-center">Select Your Device</h2>
        <div className="mb-10 relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by device name or codename..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-base bg-gray-800 text-white rounded-full focus:outline-none"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" />
        </div>

        <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuilds.map(build => (
            <CSSTransition key={build.codename} timeout={500} classNames="fade">
              <ProductCard build={build} />
            </CSSTransition>
          ))}
        </TransitionGroup>

        {filteredBuilds.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No matching ROM builds found.</p>
        )}
      </div>
    );
  };

  export default CustomROMProductsPage;







