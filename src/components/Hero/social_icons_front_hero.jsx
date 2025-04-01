import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';



export const SocialIconsRow = () => {
    return (
      <div className="flex space-x-3 mt-3 items-center" id='front_icons'> 
        <a href="https://github.com/Vivekachooz" target="_blank" rel="noopener noreferrer">
          <GitHubIcon  /> 
        </a>
        <a href="https://t.me/vivekachooz" target="_blank" rel="noopener noreferrer">
          <TelegramIcon  />
                  </a>
        <a href="https://paypal.me/vvkachoooz" target="_blank" rel="noopener noreferrer">
          <img src="/assets/paypal.png" alt="" className="w-6 bg-gray-800 p-1 rounded" />
        </a>
        <a href="https://twitter.com/Achooz6" target="_blank" rel="noopener noreferrer">
          <XIcon  />
        </a>
        <a href="https://www.instagram.com/vivekachooz/" target="_blank" rel="noopener noreferrer">
          <InstagramIcon  />
        </a>
        <a href="https://www.facebook.com/vivek.achooz/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon  />

        </a>
      </div>
    );
  };