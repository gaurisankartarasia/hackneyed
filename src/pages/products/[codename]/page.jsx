

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Loader from '../../../components/Loader';

const AvailableROMsPage = () => {
  const { codename } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [availableROMs, setAvailableROMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchDeviceData = fetch('/roms.json').then(response => response.json());
    const fetchROMBuilds = fetch('/rom-builds.json').then(response => response.json());

    Promise.all([fetchDeviceData, fetchROMBuilds])
      .then(([romsData, romBuildsData]) => {
        const foundDevice = romsData.find(d => d.codename === codename);
        setDevice(foundDevice);

        const roms = romBuildsData[codename] || [];
        setAvailableROMs(roms);
        setLoading(false);

        if (roms.length === 0) {
          setIsModalOpen(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [codename]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} color="#fff" />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="text-center mt-8">
        <p>No device information found for the specified codename.</p>
      </div>
    );
  }
  const encodeROMName = (name, version, projectName) => {
    return `${name}-${version}-${projectName}`
      .toLowerCase()
      .replace(/[\s()]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-100 active:scale-95 transition-all duration-500 mb-4"
      >
        <IoIosArrowBack className="mr-2" size={20} />
        Back to Device List
      </button>

      <h1 className="text-3xl font-bold mb-6">Available ROMs for {device.device}</h1>

      {availableROMs.length === 0 ? (
        <p>No ROMs available for this device.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableROMs.map(rom => (
            <div key={rom.name} className="rounded-3xl bg-gray-900 shadow-sm overflow-hidden">
              <div className="p-4 relative">
                <LazyImage src={rom.romLogo} alt={rom.name} />
                <h2 className="text-xl font-semibold m-3">{rom.name} {rom.version} {rom.project_name}</h2>
                <p className="text-gray-300 m-3">Updated: {rom.date}</p>
                {/* <Link
                  to={`/products/${codename}/${(rom.name?.toLowerCase().replace(/[\s()]+/g, '-') || '')}-${(rom.version?.toLowerCase().replace(/[\s()]+/g, '-') || '')}-${(rom.project_name?.toLowerCase().replace(/[\s()]+/g, '-') || '')}`}
                  className="block w-full text-center bg-gray-100 text-black font-semibold py-2 px-4 rounded-3xl hover:bg-[#393f44] hover:text-white active:scale-95 transition-all duration-500"
                >
                  View Downloads
                </Link> */}

<Link
  to={`/products/${codename}/${encodeROMName(rom.name, rom.version, rom.project_name)}`}
  className="block w-full text-center bg-gray-100 text-black font-semibold py-2 px-4 rounded-3xl hover:bg-[#393f44] hover:text-white active:scale-95 transition-all duration-500"
>
  View Downloads
</Link>
              </div>
            </div>
          ))}
        </div>
      )}

  
    </div>
  );
};

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-48">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-t-3xl rounded-b">
          <Loader size={30} color="#fff" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-t-3xl rounded-b transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default AvailableROMsPage;
