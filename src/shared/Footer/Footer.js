import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import Term1 from './../../components/termPage/Term';
import PrivacyPolicy from './../../components/privacyPolicyPage/PrivacyPolicy';

function Footer() {
   const [open,setOpen] = React.useState(false);
   const [openPrivacyPolicy, setOpenPrivacyPolicy] = React.useState(false);
   const handleTermOpen = () =>{
      setOpen(true)
   }
   const handleTermClose = () =>{
      setOpen(false)
   }
   const handlePrivacyClose = () => {
      setOpenPrivacyPolicy(false)
   }
   const handlePrivacyOpen = () => {
      setOpenPrivacyPolicy(true)
   }
   return (
      <footer className="FooterMain" role="region" aria-label="footer">
         <section className="skinny-footer">
            <MDBContainer>
               <MDBRow className="iPadReverse">
                  <MDBCol lg="12" sm="12" xs="12">
                     <div className="copyright">
                        <p className="mb-3">12A-002 Agency Assistance | P.O. Box 1498 | Victorville, CA 92393-1498 <a style={{verticalAlign:'1px'}} href="mailto:sca-swgagencies@swgas.com">sca-swgagencies@swgas.com</a> | 877-967-9427</p>
                        <p>©2021 Southwest Gas Corporation. All rights reserved | <a aria-label="navigate to privacy policy" target="_blank"  href="https://www.swgas.com/en/privacy-policy">Privacy Policy <i className="material-icons" style={{fontSize:'13px',verticalAlign:'-3px'}}>open_in_new</i></a> | <Link to="/Term" target="_blank">Terms & Conditions</Link></p>
                     </div>
                  </MDBCol>
               </MDBRow>
            </MDBContainer>
         </section>
         {/* <Term1 closeTerm={handleTermClose} openTerm={open}/> */}
         <PrivacyPolicy closePrivacy={handlePrivacyClose} openPrivacy={openPrivacyPolicy} />
      </footer>
   );
}

export default Footer;