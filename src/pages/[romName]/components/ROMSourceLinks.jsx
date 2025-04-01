// ROMSourceLinks.jsx
import React from 'react';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';


const ROMSourceLinks = ({ sourceLinks }) => {
  if (!sourceLinks || sourceLinks.length === 0) return null;

  return (
    <div className="pl-4">
      <h2 className="text-xl lg:text-2xl font-semibold mb-4 flex items-center">Links to device sources</h2>
      <ul className="space-y-2">
        {sourceLinks.map(sourcelink => (
          <li key={sourcelink.name}>
            <a
              href={sourcelink.url}
              target='_blank'
              className="text-indigo-500 hover:underline hover:text-indigo-600 w-fit flex items-center font-semibold"
            >
              {sourcelink.name} &nbsp; <OpenInNewOutlinedIcon sx={{ fontSize: '1rem' }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ROMSourceLinks;