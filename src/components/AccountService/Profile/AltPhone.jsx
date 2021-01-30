import React from 'react'
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  });

class PrimaryPhoneModule extends React.Component{
	state = {
		CountryCodes: '',
		PhoneType:'',
		PrimaryPhoneNumber:'323 444 9912',
    };
    
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    
	render(){
		const { classes } = this.props;
		return(
			<div class="profileEditbox row">      
				<MDBCol lg="4" sm="6" xs="12">
			  <FormControl variant="filled" className="editFields">
          <InputLabel htmlFor="PhoneType">Type*</InputLabel>
          <Select
            value={this.state.PhoneType}
            onChange={this.handleChange}
            input={<FilledInput name="PhoneType" id="PhoneType" />}
            inputProps={{
              'aria-label':'enter alternate phone number'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Mobile/Cell</MenuItem>
            <MenuItem value={20}>Phone Number</MenuItem>
          </Select>
        </FormControl>
				</MDBCol>
				<MDBCol lg="4" sm="6" xs="12">
        <FormControl variant="filled" className="editFields">
          <InputLabel htmlFor="CountryCodes">Country Code*</InputLabel>
          <Select
            value={this.state.CountryCodes}
            onChange={this.handleChange}
            input={<FilledInput name="CountryCodes" id="CountryCodes" />}
            inputProps={{
              'aria-label':'enter country code'
            }}
          >
            <MenuItem value=""> <em>None</em> </MenuItem>
            <MenuItem value={5}>+1 (USA) </MenuItem>
            <MenuItem value={10}>+91 (India)</MenuItem>
            <MenuItem value={20}>+44 (UK)</MenuItem>
          </Select>
        </FormControl>
				</MDBCol>				
					<MDBCol lg="4" sm="6" xs="12">
            <TextField className="editFields"
            id="PrimaryPhoneNumber"
            label="Phone*"
            value={this.state.PrimaryPhoneNumber}
            onChange={this.handleChange}
            margin="normal" variant="filled"
            inputProps={{
              'aria-label':'Enter Phone number'
            }}
            />    
    </MDBCol>
		</div>
		);
	}
}
PrimaryPhoneModule.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(PrimaryPhoneModule);