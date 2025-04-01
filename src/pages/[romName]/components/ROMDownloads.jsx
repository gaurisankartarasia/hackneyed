// ROMDownloads.jsx
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import PropTypes from 'prop-types';

const ROMDownloads = ({ downloads}) => (
  <>
    <h2 className="text-xl lg:text-2xl font-semibold  my-4 flex items-center">Downloads</h2>
    <ul className="space-y-2">
      {downloads.map(download => (
        <li key={download.name}>
          <a
            href={download.url}
            target='_blank'
            className="text-indigo-500 font-semibold flex items-center hover:text-indigo-600 hover:underline w-fit"
          >
            {download.name} &nbsp; <OpenInNewOutlinedIcon sx={{ fontSize: '1rem' }} />
          </a>
        </li>
      ))}
    </ul>
    
    
  </>
);

ROMDownloads.propTypes = {
  downloads: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired
};

export default ROMDownloads;