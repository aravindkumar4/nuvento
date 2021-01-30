'use strict'
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { css } from 'glamor';

const commfiled = {
    marginTop: '20px !important',
    maxWidth: '50%',
    paddingRight: '4% !important',
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControlselect: {
        width: '100%',
        margin: '15px 0 10px',
    }
}));

export default function StepTwo() {
    const pledgeAmount = localStorage.getItem("PledgeAmtM");
    
    const FundingProgram = localStorage.getItem("FundingProgramM");
    const ApplyTo = localStorage.getItem("ApplyToM");
    const [FundingProgam, setFundingProgam] = useState(FundingProgram);
    const [dollerSign, setDollerSign] = useState(false);
    const [applyTo, setApplyTo] = useState(ApplyTo);
    const [PledgeAmount, setPledgeAmount] = useState({
        pledgeAmount: {
            value: pledgeAmount,
            error: false,
        }
    });

    React.useEffect(() => {
        if(pledgeAmount !=""){
            setDollerSign(true);
        }
      },[]);

    const handleChange = event => {
        
        setFundingProgam(event.target.value);
        localStorage.setItem("FundingProgramM", event.target.value);
    };

    const handleChangeApplyTo = event => {
        setApplyTo(event.target.value);
        localStorage.setItem("ApplyToM", event.target.value);
    };

    const handleValidataionChange = (event) => {
        let _error = event.target.value.length == 0;
        if (event.target.name == "pledgeAmount") {
            if (event.target.value.IsCurrency() || event.target.value == "") {
                setPledgeAmount({
                    pledgeAmount: {
                        value: event.target.value,
                        error: _error,
                    }
                })
                localStorage.setItem("PledgeAmtM", event.target.value);
            }
        }
    };

    const _onFocus = (event) => {
        setDollerSign(true);
    };
    const _onBlur = (event) => {
       if(PledgeAmount.pledgeAmount.value== ""){
        setDollerSign(false);
       }else{
        setDollerSign(true);
       } 
    };

    const validationMessage = (name, value) => {
        let message = "";
        switch (name) {
            case "pledgeAmount":
                message = "Enter the pledge amount";
                break;
            default:
                break;
        }
        return message;
    };

    const classes = useStyles();
    return (
        <div className='rows'>
            <div class="steptwo">
                <div className='accountarea accountareastep2'>
                    <div id="addPledgeSection2" class="grouppay mblfield removespacebottom mt-3">
                        <TextField
                            //error={PledgeAmount.pledgeAmount.error}
                            // helperText={
                            //     PledgeAmount.pledgeAmount.error
                            //         ? validationMessage("pledgeAmount", PledgeAmount.pledgeAmount.value)
                            //         : ""
                            // }
                            className={'commontextfield'}
                            id="pledgeAmount"
                            label="Pledge Amount"
                            autoComplete="off"
                            value={PledgeAmount.pledgeAmount.value}
                            name="pledgeAmount"
                            prefix="$"
                            onBlur={(e) =>
                                _onBlur(e)
                            }
                            onFocus={(e) =>
                                _onFocus(e)
                            }
                            onChange={(e) =>
                                handleValidataionChange(e)
                            }
                            margin="normal"
                            variant="filled"
                            inputProps={{
                                //'aria-label': 'Enter amount',
                                //invaliderrormessage: "Please enter pledge Amount",
                                validatemessage: "Please enter pledge Amount",
                                mandatory: '1'
                            }}
                            InputProps={
                                dollerSign? {
                                startAdornment: (
                                    <InputAdornment position="start"><i class="material-icons">attach_money</i></InputAdornment>
                                ),
                            }:''
                        }
                        />
                        <FormControl variant="filled" className={classes.formControlselect}>
                            <InputLabel htmlFor="filled-age-simple">Funding Source</InputLabel>
                            <Select classes={{ icon: 'DropIconStyle' }}
                                native
                                value={FundingProgam}
                                id="fundingSource"
                                name="fundingSource1"
                                input={<FilledInput name="fundingSource" id="filled-age-simple" />}
                                onChange={handleChange}
                                inputProps={{
                                    //invaliderrormessage: "Please select Funding Source.",
                                    //'aria-label': "Please select Funding Source.",
                                    validatemessage: "Please select Funding Source.",
                                    mandatory: '1'
                                }}
                            >
                                <option value=""></option>
                                <option value="None">None</option>
                                {
                                [  'ACAA - Arizona Community Action Association',
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
'Other'].map((m,i)=>
    <option value={m}>{m}</option>
)} 
                                {/* <option value="1">ACAA - Arizona Community Action Association</option>
                                <option value="2">ACAA (HEAF) - Home Energy Assistance Fund</option>
                                <option value="3">ACAA (URRD) - Utility Repair Replacement and Deposit program</option>
                                <option value="4">CalWORKs - California Work Opportunity and Responsibility to Kids</option>
                                <option value="5">CSBG - Community Services Block Grant</option>
                                <option value="6">HUD - Dept. of Housing & Urban Development</option>
                                <option value="7">LIHEAP (EAP) - Energy Assistance Program</option>
                                <option value="8">LIHEAP (ECIP) - Energy Crisis Intervention Program</option>
                                <option value="9">LIHEAP (HEAP)</option>
                                <option value="10">LIHEAP - Low</option>
                                <option value="11">LIHEAP Supplemental</option>
                                <option value="12">SWG Energy Share</option>
                                <option value="13">SWG Low Income Bill Assistance</option>
                                <option value="14">TANF</option>
                                <option value="15">UEC</option>
                                <option value="16">Veterans</option>
                                <option value="17">Other</option> */}
                            </Select>
                        </FormControl>

                        <FormControl variant="filled" className={classes.formControlselect}>
                            <InputLabel htmlFor="filled-age-simple">Apply To</InputLabel>
                            <Select classes={{ icon: 'DropIconStyle' }}
                                native
                                value={applyTo}
                                id="applyTo1"
                                name="applyTo1"
                                onChange={handleChangeApplyTo}
                                input={<FilledInput name="applyTo" id="filled-age-simple" />}
                                inputProps={{
                                    //invaliderrormessage: "Please select Apply To.",
                                    //'aria-label': "Select Apply To.",
                                    validatemessage: "Please select Apply To.",
                                    mandatory: '1'
                                }}
                            >
                                <option value=""></option>
                                <option value="UTILITY BILL">Utility Bill</option>
                                <option value="DEPOSIT">Security Deposit</option>
                               
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    )
}
