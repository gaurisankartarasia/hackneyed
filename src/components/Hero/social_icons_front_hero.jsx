import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import { useMeConfig } from "../../hooks/useFetchMeConfig";


  




export const SocialIconsRow = () => {

  const { data} = useMeConfig();

  if (!data) return null

    return (
      <div className="flex space-x-3 mt-3 items-center" id='front_icons'> 
        <a href={data.social_links.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon  /> 
        </a>
        <a href={data.social_links.telegram} target="_blank" rel="noopener noreferrer">
          <TelegramIcon  />
                  </a>
        <a href={data.social_links.paypal} target="_blank" rel="noopener noreferrer">
          <img src="/assets/paypal.png" alt="" className="w-6 bg-gray-800 p-1 rounded" />
        </a>
        <a href={data.social_links.x} target="_blank" rel="noopener noreferrer">
          <XIcon  />
        </a>
        <a href={data.social_links.instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon  />
        </a>
        <a href={data.social_links.facebook} target="_blank" rel="noopener noreferrer">
          <FacebookIcon  />

        </a>
      </div>
    );
  };