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
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
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
  const loginFirstStep = JSON.parse(localStorage.getItem("loginFirstStep"));
  const [checked, setChecked] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  

  const handleChange = event => {
    
    setChecked(event.target.checked);
    localStorage.removeItem("IsTermCondiChecked");
    localStorage.setItem("IsTermCondiChecked",event.target.checked);
  };
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange"
  });
  const hasError = inputName => !!(errors && errors[inputName]);
  const onSubmit = data => {
    console.log("onSubmit data", data);
    setIsOpen(!isOpen);
  }
  const classes = useStyles();
  return (
    <div className='rows'>
      <div class="steptwo">
        <div className='accountareastep2'>
          <div className="grouppay registerstep3">
            <div className={'registerstep3'}>
              <List className={classes.root}>

               
                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">account_circle</i>
                  </Avatar>
                  <ListItemText primary="Username" secondary= {loginFirstStep.Username} />
                  
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} />

                <ListItem classes={{ root: classes.listitems }}>
                  <Avatar className={classes.removebg}>
                    <i class="material-icons home_ico">vpn_key</i>
                  </Avatar>
                  <ListItemText primary="Password" secondary="**********" />
                 
                </ListItem>
                <Divider variant="inset" component="li" className={classes.dividerCom} />
              </List>
            </div>
            <div class="checkboxlist">
            <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="secondary" checked={checked} onChange={handleChange} value="" />}
                  label={<span name="TextType1" id="">I agree to the 
                  <a aria-label="Navigate to terms of use" target="_blank" href="https://agency.swgas.com/agency/content/terms" className="tncclass ml-2">Terms of Use 
                  {/* <i style={{verticalAlign:'-3px'}} className="material-icons">open_in_new</i>  */}
                  </a>
                  {/* <a aria-label="Navigate to privacy policy" target="_blank" href="https://www.swgas.com/en/privacy-policy" className="tncclass">Privacy Policy</a> and  
                   <Link to="/Term" aria-label="navigate to terms & conditions" target="_blank" className="tncclass"> Terms & Conditions</Link> */}
                  {/* <a aria-label="navigate to terms & conditions" href="" className="tncclass"> Terms & Conditions</a> */}
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