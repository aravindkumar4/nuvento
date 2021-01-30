'use strict'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SelectedAccountData from '../DialogueContent';
import Slide from '@material-ui/core/Slide';
import AddPaymentMethod from '../../PaymentMethods/AddPaymentMethod';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { TextValidator } from 'react-material-ui-form-validator';
import { MDBCol } from "mdbreact";
import { useEffect } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%'
    }
}));

const fundinSourceArray = [
    'None',
    'ACAA - Arizona Community Action Association',
    'ACAA (HEAF) - Home Energy Assistance Fund',
    'ACAA (URRD) - Utility Repair Replacement and Deposit program',
    'CalWORKs - California Work Opportunity and Responsibility to Kids',
    'CSBG - Community Services Block Grant',
    'HUD - Dept. of Housing & Urban Development',
    'LIHEAP (EAP) - Energy Assistance Program',
    'LIHEAP (ECIP) - Energy Crisis Intervention Program',
    'LIHEAP (HEAP) - Home Energy Assistance Program',
    'LIHEAP - Low Income Home Energy Assistance Program',
    'LIHEAP Supplemental - Low Income Home Energy Assistance Program Supplemental',
    'STCS - Short Term Crisis Services',
    'SWG Energy Share',
    'SWG Low Income Bill Assistance',
    'TANF - Temporary Assistance for Needy Families',
    'UEC - Universal Energy Charge',
    'Veterans Affairs/Administration',
    'CARES ACT funding',
'LIHEAP supplemental COVID 19',
'SWG LIEC',
'SWG Energyshare (ESHARE)',
    'Other'].map(m => {
        return {
            value: m.includes('-')?m.split('-')[0]:m, 
            label: m
        }
    });

const appliedToSourceArray = [
    { value: 'UTILITY BILL', label: 'Utility Bill' },
    { value: 'DEPOSIT', label: 'Security Deposit' },
   
];


export default function StepOne(props) {
    
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //     age: '',
    //     name: '',
    // });
    
    const editData = JSON.parse(localStorage.getItem('EditData'));
    
    const [FundingProgam, setFundingProgam] = useState(editData.FundingSource.toString().trim());
    const [dollerSign, setDollerSign] = useState(false);
    const verifyAppliedTo = appliedToSourceArray.find(e => e.value === editData.AppliedTo);
    //Handle for invalid Applied To values in DB
    if (!verifyAppliedTo) {
       // appliedToSourceArray.push({ value: editData.AppliedTo, label: editData.AppliedTo});
    }
    
    const appliedKey= editData.AppliedTo == 'Security Deposit'? "DEPOSIT":'UTILITY BILL';

    const [applyTo, setapplyTo] = useState(appliedKey);
    if (editData.PledgeValue) {
        editData.PledgeValue = editData.PledgeValue.replace("$", "");
        // _localEditData.PledgeValue = _localEditData.PledgeValue.replace(",", "");
    }
    const [amount, handleChangeAmount] = useState(editData.PledgeValue);    
    
    useEffect(() => {
        if(localStorage.getItem('FundingSource')){
            setFundingProgam(localStorage.getItem('FundingSource'));
            setDollerSign(true);
        }
        if(localStorage.getItem('AppliedTo')){
            const applied= (localStorage.getItem('AppliedTo') == 'Security Deposit' || localStorage.getItem('AppliedTo') == 'DEPOSIT') ? "DEPOSIT":'UTILITY BILL';
            setapplyTo(applied);
        }
        if(localStorage.getItem('EditAmount')){
            handleChangeAmount(localStorage.getItem('EditAmount').replace(/,/g, ''));
        }
    },[FundingProgam,applyTo, amount]);

    const handleOnChangeAmount = event => {
        if (event.target.value.IsCurrency() || event.target.value == "") {
            handleChangeAmount(event.target.value);
            editData.PledgeValue = event.target.value;
            localStorage.setItem("EditAmount", event.target.value.replace(/,/g, ''));
        }
    };
    const _onFocus = event => {
        
        setDollerSign(true);
    }
    const _onBlur = event => {
        if(amount== ""){
            setDollerSign(false);
           }else{
            setDollerSign(true);
           } 
    }

    const handleChangeApplyTo = event => {
        setapplyTo(event.target.value);
        editData.AppliedTo = event.target.value;
        localStorage.setItem("AppliedTo", event.target.value);
    };

    const handleChangeFunding = event => {
        editData.FundingSource = event.target.value;
        // localStorage.setItem("EditData", editData);
        localStorage.setItem("FundingSource", event.target.value);
        setFundingProgam(event.target.value);
    };

    return (
        <div className='rows'>
            <div class="stepone">
                <div className='accountarea'>
                    <div className="grouppay">
                        <form id="editPledgeSection1" variant="filled" className={classes.Fcontainer} noValidate autoComplete="off">
                            {/*<TextField required id="filled-required1" className={'TextFieldWrapper'}
                                label="Customer Holder Name"
                                defaultValue=""
                                variant="filled"
                                readonly
                                value={_localEditData.Customer}
                            />*/}
                            <FormControl variant="filled" className={classes.formControl + ' formSel'}>
                                <InputLabel htmlFor="BankAccountSelect">Funding Source</InputLabel>
                                <Select classes={{ icon: 'DropIconStyle' }}
                                    value={FundingProgam}
                                    onChange={handleChangeFunding}
                                    input={<FilledInput name="BankAccount" id="BankAccountSelect" />}
                                    inputProps={{
                                        'aria-label':'select Funding Source'
                                    }}
                                >
                                    {/* <MenuItem value={_localEditData.FundingSource}>
                                        {_localEditData.FundingSource}
                                    </MenuItem>*/}

                                    {fundinSourceArray.map((item, index) => {
                                        return (
                                            <MenuItem value={item.value.trim()}>{item.label}</MenuItem>
                                        )
                                    }
                                    )}

                                </Select>
                            </FormControl>

                            <FormControl variant="filled" className={classes.formControl + ' formSel'}>
                                <InputLabel htmlFor="filled-age-simple">Apply To</InputLabel>
                                <Select
                                    classes={{ icon: 'DropIconStyle' }}
                                    value={applyTo}
                                  
                                    onChange={handleChangeApplyTo}
                                    input={<FilledInput name="age" id="filled-age-simple" />}
                                    inputProps={{
                                        'aria-label':'select item'
                                    }}
                                >
                                    {appliedToSourceArray.map((item, index) => {
                                        return (
                                            <MenuItem value={item.value.trim()}>{item.label}</MenuItem>
                                        )
                                    }
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className={classes.formControl + ' formSel '}>
                                <TextField
                                    id="txtAmount"
                                    className={'m-0'}
                                    label="Pledge Amount"
                                    autoComplete="off"
                                    prefix="$"
                                    margin="normal"
                                    variant="filled"
                                    onBlur={_onBlur}
                                    onFocus={_onFocus}
                                    onChange={handleOnChangeAmount}
                                    value={amount}
                                    inputProps={{
                                        'aria-label': 'Enter amount',
                                        invaliderrormessage: "Please enter a valid pledge amount",
                                        validatemessage: "Please enter a valid pledge amount",
                                        mandatory: '1',
                                    }}
                                    InputProps={
                                        dollerSign? {
                                        startAdornment: (
                                            <InputAdornment position="start"><i class="material-icons">attach_money</i></InputAdornment>
                                        ),
                                    }:''
                                   }
                                />
                                {/* <InputLabel htmlFor="BankAccountSelect">Apply To</InputLabel>
                  <Select classes={{ icon: 'DropIconStyle' }}
                     value={_localEditData.AppliedTo}
                    onChange={handleChangeApplyTo}
                    input={<FilledInput name="BankAccount" id="BankAccountSelect" />}
                  >
                    <MenuItem value={_localEditData.AppliedTo}>
                      {_localEditData.AppliedTo}
                    </MenuItem>
                    {/* <MenuItem value={101}>Utility Bill</MenuItem>
                    <MenuItem value={201}>Utility Bill</MenuItem>
                    <MenuItem value={301}>Utility Bill</MenuItem>
                    <MenuItem value={302}>Utility Bill</MenuItem> 
                  </Select> */}
                            </FormControl>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
