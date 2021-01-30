'use strict'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import OrganizationName from '../../../../assets/images/Organization_Name.svg'

const useStyles = makeStyles(theme => ({
  TypoBox: {
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  optionlabel: {
    marginBottom: '0',
  },
  expandcontent: {
    backgroundColor: '#f5fcfd',
    boxShadow: 'none !important',
    marginTop: '0 !important',
    '&:before': {
      backgroundColor: '#f5fcfd',
    },
  },
  expandbuttonarea: {
    paddingLeft: '0',
    width: '50%',
    fontSize: '15px',
    minHeight: '48px !important',
  },

  expanddetails: {
    padding: '0',
  },

  removebg: {
    background: '#ffffff',
    display: 'inline-flex',
    alignItems: 'flex-start',
  },
  dividerCom: {
    flex: '1',
    marginLeft: '57px',
    display: 'none'
  },
  listitems: {
    paddingTop: 20,
    flexWrap: 'wrap'
  }

}));

export default function StepFour() {
  const [checked, setChecked] = React.useState(false);
  let data = JSON.parse(localStorage.getItem("AARegistrationStep2"));
  let step1 = JSON.parse(localStorage.getItem("AARegistrationStep1"));
  data = data ? data : {
    PCName: "",
    PCJobTitle: "",
    PCEmailAddress: "",
    PCPhone: "",
    PCFax: "",
    SCName: "",
    SCJobTitle: "",
    SCEmailAddress: "",
    SCPhone: "",
    SCFax: ""
  };
  const handleChange = event => {
    setChecked(event.target.checked);
  };



  const classes = useStyles();
  return (
    <div className='rows'>
      <div class="steptwo">
        <div className='accountareastep2'>
          <div className="grouppay registerstep3 Resregisterstep3">
            <div className={'registerstep3'}>
              <List className={classes.root}>

              <h3>Organization Information</h3>

<ListItem classes={{ root: classes.listitems }}>
  <Avatar className={classes.removebg}>
    <img src={OrganizationName} alt=""/>
    </Avatar>
  <ListItemText primary="Organization Name" secondary={step1.OrgName || ""} />
    {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
</ListItem>
<Divider variant="inset" component="li" className={classes.dividerCom} />

{/* <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">account_circle</i>
                  </Avatar>
                  <ListItemText primary="Tax ID Number" secondary={step1.TaxIDNumber || ""} />
                    {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} /> */}

                <h3>Primary Contact Information</h3>

                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">account_circle</i>
                  </Avatar>
                  <ListItemText primary="Primary Contact Name" secondary={data.PCName ? data.PCName : ""} />
                    {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} />

                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">admin_panel_settings</i>
                  </Avatar>
                  <ListItemText primary="Primary Contact Job Title" secondary={data.PCJobTitle ? data.PCJobTitle : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} />

                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">send</i>
                  </Avatar>
                  <ListItemText primary="Primary Contact Email" secondary={data.PCEmailAddress ? data.PCEmailAddress : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} />

                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">phone</i>
                  </Avatar>
                  <ListItemText primary="Primary Contact Phone" secondary={data.PCPhone ? data.PCPhone : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} />

                { data.PCMobile && 
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">phone</i>
                  </Avatar>
                  <ListItemText primary="Primary Contact Mobile" secondary={data.PCMobile ? data.PCMobile : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                }
                <Divider variant="inset" component="li" className={classes.dividerCom} />
                
                { data.PCFax && 
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">phone</i>
                  </Avatar>
                  <ListItemText primary="Primary Contact Fax" secondary={data.PCFax ? data.PCFax : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                }
                <Divider variant="inset" component="li" className={classes.dividerCom} />


                {(data.SCName || data.SCJobTitle || data.SCEmailAddress || data.SCPhone || data.SCFax)
                    &&   (<div>   
                <h3>Secondary Contact Information</h3>

                {data.SCName &&
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">account_circle</i>
                  </Avatar>
                  <ListItemText primary="Secondary Contact Name" secondary={data.SCName ? data.SCName : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                }
                <Divider variant="inset" component="li" className={classes.dividerCom} />
                {data.SCJobTitle &&
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">admin_panel_settings</i>
                  </Avatar>
                  <ListItemText primary="Secondary Contact Job Title" secondary={data.SCJobTitle ? data.SCJobTitle : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                }
                <Divider variant="inset" component="li" className={classes.dividerCom} />
                {data.SCEmailAddress &&
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">send</i>
                  </Avatar>
                  <ListItemText primary="Secondary Contact Email " secondary={data.SCEmailAddress ? data.SCEmailAddress : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                }
                <Divider variant="inset" component="li" className={classes.dividerCom} />
                {data.SCPhone &&
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">phone</i>
                  </Avatar>
                  <ListItemText primary="Secondary Contact Phone" secondary={data.SCPhone ? data.SCPhone : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                  }

<Divider variant="inset" component="li" className={classes.dividerCom} />
                {data.SCMobile &&
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">phone</i>
                  </Avatar>
                  <ListItemText primary="Secondary Contact Mobile" secondary={data.SCMobile ? data.SCMobile : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                  }

                <Divider variant="inset" component="li" className={classes.dividerCom} />

                {data.SCFax &&
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">phone</i>
                  </Avatar>
                  <ListItemText primary="Secondary Contact Fax" secondary={data.SCFax ? data.SCFax : ""} />
                                  {/*<Button aria-label="click here to cancel" color="primary">Edit</Button>*/}
                </ListItem>
                }
                <Divider variant="inset" component="li" className={classes.dividerCom} />


                </div>)}

              </List>
            </div>
            <div class="checkboxlist">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox id="chkRegistrationAgree" color="secondary" checked={checked} onChange={handleChange} value="" />}
                  label={<span name="TextType1" id="">I agree to the
                  <a className="ml-2" target="_blank" href="https://agency.swgas.com/agency/content/terms" 
                  aria-label="navigate to terms of use">Terms of Use 
                  {/* <i style={{verticalAlign:'-3px'}} className="material-icons">open_in_new</i>  */}
                  </a>
                  {/* <a target="blank" href="https://www.swgas.com/en/privacy-policy" 
                  aria-label="navigate to Privacy Policy"> Privacy Policy <i style={{verticalAlign:'-3px'}} className="material-icons">open_in_new</i> </a>
                  and
                  <Link to="/Term" target="_blank" aria-label="navigate to terms & conditions" className="tncclass"> Terms &amp; Conditions </Link> */}
                  </span>
                  }
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}