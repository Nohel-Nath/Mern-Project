import React from 'react';
import './footer.css'
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin , FaPhone,FaMapMarker} from 'react-icons/fa';

function Footer_file() {

        
    const handleSocialMediaClick = (url) => {
        window.open(url, '_blank');
      };


      /*const handleAddressClick = () => {
        const location = "https://www.google.com/maps/@22.3362482,91.8301955,16z";
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        window.open(googleMapsUrl, '_blank');
      };*/
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-media">
          <FaFacebook className="social-icon" onClick={() => handleSocialMediaClick('https://www.facebook.com/powerboy.nohel/')} />
          <FaTwitter className="social-icon" onClick={() => handleSocialMediaClick('https://twitter.com/nath_nohel')} />
          <FaGithub className="social-icon" onClick={() => handleSocialMediaClick('https://github.com/Nohel-Nath')} />
          <FaLinkedin className="social-icon" onClick={() => handleSocialMediaClick('https://www.linkedin.com/in/nohel-nath-7b2157261/')} />
        </div>
        <h2 className="built-by">Built By Nohel Kumar Nath</h2>
        <div className="contact-info">
          <p>
            <FaPhone className="icon" /> <a href="tel:+8801835621465">+8801835621465</a>
          </p>
          <p>
          <FaMapMarker className="icon" /> <a className="address-link" href="https://www.google.com/maps/@22.3295799,91.8301955,16z" target="_blank" rel="noopener noreferrer">Sadharghat,Chittagong</a>
          </p>
        </div>
      </div>
    </footer>

  )
}

export default Footer_file
