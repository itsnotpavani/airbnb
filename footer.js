import React from'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './footer.css';
function Footer()
{return(
  <div className="footer">
  <div className="FollowUs">
  <h9> Follow us :</h9>
   <TwitterIcon/>
   <InstagramIcon/>
   <FacebookIcon/>
   </div>
   <div className="copyright">
    <CopyrightIcon/>
    <h9>2022 Airbnb All Rights Reserved</h9>
   </div>

  </div>
);}

export default Footer;
