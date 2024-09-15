
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { RiShareBoxFill } from "react-icons/ri";
import Loader from '../../../../components/Loader';


const ROMDetailsPage = () => {
  const { codename, romName } = useParams();
  const navigate = useNavigate();
  const [romDetails, setROMDetails] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    setLoading(true);
  
    const fetchROMDetails = fetch('/rom-builds.json').then(response => response.json());
    const fetchDeviceInfo = fetch('/roms.json').then(response => response.json());
  
    Promise.all([fetchROMDetails, fetchDeviceInfo])
      .then(([romData, deviceData]) => {
        const deviceROMs = romData[codename] || [];
        const decodedRomName = decodeURIComponent(romName);
        
        const rom = deviceROMs.find(r => {
          const encodedName = encodeROMName(r.name, r.version, r.project_name);
          return encodedName === decodedRomName;
        });
  
        setROMDetails(rom);
  
        const device = deviceData.find(d => d.codename === codename);
        setDeviceInfo(device);
  
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [codename, romName]);
  
  // Add this helper function at the top of your file
  const encodeROMName = (name, version, projectName) => {
    return `${name}-${version}-${projectName}`
      .toLowerCase()
      .replace(/[\s()]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="#fff" />
      </div>
    );
  }

  if (!romDetails || !deviceInfo) {
    return (
      <div className="text-center mt-8">
        <p>No details available.</p>
        <button
        onClick={() => navigate(`/products`)}
        className="flex items-center text-gray-100 active:scale-95 transition-all duration-500 mb-4"
      >
        Go back
      </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:px-8 md:py-12 lg:py-16">
      <button
        onClick={() => navigate(`/products/${codename}`)}
        className="flex items-center text-gray-100 active:scale-95 transition-all duration-500 mb-4"
      >
        <IoIosArrowBack className="mr-2" size={20} />
        Back to Available ROMs
      </button>



      <div className="bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
        
        <div className="md:flex md:space-x-8 ">
          {/* Device Image */}
          <div className="flex-shrink-0 mr-6">
           <LazyImage src={romDetails.romLogo} alt={deviceInfo.codename} />
          </div>  

          {/* ROM Details */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-2 text-white">{romDetails.name} {romDetails.version}  {romDetails.project_name}</h1>
            <p className="text-gray-200 font-semibold text-lg mb-4">Codename: <b>{deviceInfo.codename}</b></p>
            <p className="text-gray-300 mb-4">Device: {deviceInfo.device}</p>
            <p className="text-gray-400 mb-6">Updated: {romDetails.date}</p>
            <p className="text-gray-400 mb-6">Android Version: {romDetails.android_version}</p>

            {/* Downloads Section */}
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4 flex items-center"> Downloads</h2>
            <ul className="space-y-2">
              {romDetails.downloads.map(download => (
                <li key={download.name}>
                  <a
                    href={download.url}
                    target='_blank'
                    className="text-indigo-400 flex items-center  hover:text-indigo-600 transition-colors duration-300"
                  >
                   {download.name} &nbsp;  <RiShareBoxFill/>
                  </a>
                </li>
              ))}
            </ul>
            {/* Links to read or wiki */}
            {romDetails.Links && (
            <div className="mt-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">Read</h2>
              <a
                className="text-blue-500 flex items-center underline hover:text-indigo-600 transition-colors duration-300"
                href={romDetails.Links}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Wiki here &nbsp;  <RiShareBoxFill/>
              </a>
            </div>
          )}

          </div>
        </div>
        

        {/* Changelog Section */}
        {romDetails.changelog && romDetails.changelog.length > 0 && (
          <div className="p-6 md:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">Changelog</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {romDetails.changelog.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes Section */}
        {romDetails.notes && romDetails.notes.length > 0 && (
          <div className="p-6 md:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">Notes <span className='text-red-500'>*</span> </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {romDetails.notes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Flashing Steps Section */}
        {romDetails.flashingSteps && romDetails.flashingSteps.length > 0 && (
          <div className="p-6 md:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">Flashing Steps</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {romDetails.flashingSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
   
    <div className="relative w-full h-48 md:h-64 lg:h-72">
      {/* Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-3xl">
          <Loader size={30} color="#fff" />
        </div>
      )}
      {/* Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover ml-3 mt-3 rounded-3xl transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default ROMDetailsPage;












