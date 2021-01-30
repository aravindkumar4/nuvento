import React from 'react';
//import { handleChangeEvent } from '../../common/dynamicForms/dynamicHandler';
import { FormControl, InputLabel, Select, FilledInput,FormHelperText } from '@material-ui/core';

const months = [
    { value: "", label: '' },
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
];
function adjustDays(month, year) {
    //get the last day, so the number of days in that month
    var daysDate = new Date(year, parseInt(month), 0).getDate();
    //If month is feb, there should be 29 days
    if (month === "2")
        daysDate = 29;
    //lets create the days of that month
    var dys = [];
    dys.push({ value: "", label: "" });
    for (var d = 1; d <= daysDate; d++) {
        dys.push({ value: d, label: d });
    }
    return dys;
}
var daysVal = adjustDays(new Date().getDate(), new Date().getFullYear());
var years = [];

function getFullYear() {
    years.push("");
    for (var i = 1901; i <= new Date().getFullYear(); i++)years.push(i);
}

export default class DateOfBirth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: "",
            day: "",
            year: "",
            days: daysVal
        }
        getFullYear();
        adjustDays(new Date().getDate(), new Date().getFullYear());
    }

    monthHandleChange = event => {
        this.setState({ month: event.target.value });
        this.setState({ days: adjustDays(event.target.value, this.state.year) });
        this.props.monthChange(event.target.value);
        //handleChangeEvent(event, this.props.CareProgramPayload)
    };
    dayHandleChange = event => {
        this.setState({ day: event.target.value });
        this.props.dayChange(event.target.value);
        //handleChangeEvent(event, this.props.CareProgramPayload)
    };
    yearHandleChange = event => {
        this.setState({ year: event.target.value });
        this.setState({ days: adjustDays(this.state.month, event.target.value) });
        this.props.yearChange(event.target.value);
        //handleChangeEvent(event, this.props.CareProgramPayload)
    };
    render() {
        return (
            <React.Fragment>
                {this.props.isLabelVisible &&
                    <h4 className="mt-3 dob-title">Date Of Birth</h4>
                }
                <div className="row w-100 no-gutters date-of-birth">
                    <div className="col-sm-4 ">
                        <FormControl variant="filled" className="editFields">
                            <InputLabel htmlFor="month">Month</InputLabel>
                            <Select 
                                native
                                id="month"
                                error={this.props.errorMonth}
                                name="month"
                                input={<FilledInput name="month" id="month" />}
                                //value={this.props.CareProgramPayload.CareProgramPayload.month}
                                onChange={this.monthHandleChange}
                                inputProps={{
                                    invaliderrormessage: "Please select Month",
                                    'aria-label': "Please select Month",
                                    validatemessage: "Please select Month",
                                    mandatory: '1'
                                }}
                            >
                                {months.map(option => (
                                    <option value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            {/* {this.props.errorMonth && <FormHelperText style={{color:"red"}}>Please select Month</FormHelperText>} */}
                        </FormControl>

                    </div>
                    <div className="col-sm-4 pl-sm-2">
                        <FormControl variant="filled" className="editFields">
                            <InputLabel htmlFor="month">Day</InputLabel>
                            <Select 
                                native
                                id="day"
                                error={this.props.errorDay}
                                name="day"
                                input={<FilledInput name="Day" id="Day" />}
                                //value={this.props.CareProgramPayload.CareProgramPayload.day}
                                onChange={this.dayHandleChange}
                                inputProps={{
                                    invaliderrormessage: "Please select Day",
                                    'aria-label': "Please select Day",
                                    validatemessage: "Please select Day",
                                    mandatory: '1'
                                }}
                            >
                                {this.state.days.map(option => (
                                    <option value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            {/* {this.props.errorDay && <FormHelperText style={{color:"red"}}>Please select Day</FormHelperText>} */}
                        </FormControl>
                    </div>
                    <div className="col-sm-4 pl-sm-2">
                        <FormControl variant="filled" className="editFields">
                            <InputLabel htmlFor="month">Year</InputLabel>
                            <Select 
                                native
                                name="year"
                                id="year"
                                error={this.props.errorYear}
                                input={<FilledInput name="year" id="year" />}
                                //value={this.props.CareProgramPayload.CareProgramPayload.year}
                                onChange={this.yearHandleChange}
                                // inputProps={{
                                //     invaliderrormessage: "Please select Year",
                                //     'aria-label': "Please select Year",
                                //     validatemessage: "Please select Year",
                                //     mandatory: '1'
                                // }}
                            >
                                {years.map(value => (
                                    <option value={value}>
                                        {value}
                                    </option>
                                ))}
                            </Select>
                            {/* {this.props.errorYear && <FormHelperText style={{color:"red"}}>Please select Year</FormHelperText>} */}
                        </FormControl>
                    </div>
                    {(this.props.errorMonth || this.props.errorDay || this.props.errorYear) && 
                        <FormHelperText style={{color:"red"}}>Please enter Date of Birth.</FormHelperText>
                    }
                </div>
            </React.Fragment>
        )
    }
}


