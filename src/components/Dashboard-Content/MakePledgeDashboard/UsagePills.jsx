import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ElectricUsageChart from './ElectricUsageChart';
import GasUsageChartMonthly from './GasUsageChartMonthly';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RequestHelper from "../../../common/RequestHelper";
import RequestMiddleware from "../../../common/RequestMiddleware";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import MessageBox from "../../../shared/Views/MessageBox";
import Loader from "../../../shared/Views/Loader";

const styles = theme => ({
    selectWidth: {
        width: '40%',
    },
    root: {
        backgroundColor: theme.palette.primary,
    },
    tabRoot: {
        textTransform: 'initial',
        fontSize: '15px',
        minWidth: '78px',
        '&:hover': {
            color: '#005984',
            opacity: 1,
        },
        '&$tabSelected': {
            backgroundColor: '#dbdbdb',
            border:'none !important'
        },
        '&:focus': {
            backgroundColor: '#dbdbdb',
        },
    },
    tabSelected: {},
    TabbsAlignment: { display: 'flex', justifyContent: 'flex-end' },
    GridRooter: { display: 'flex' }
});

class UsageButtonPills extends React.Component {
    state = {
        value: 0,

        year: '',
        Currency: '',
        currentUnit: 'Dollar',
        meterData: [],
        currentMeterData: {},
        //meter: "0",
        isMeterChanged: false,
        loading: true,
    };

    constructor(props) {
        super(props);
        this.setState({ currentSelectedAccount: localStorage.getItem("AccountNumber") });
        this.getGasMeter = this.getGasMeter.bind(this);
        this.callbackGetGasMeter = this.callbackGetGasMeter.bind(this);
        this.handleExportButtonVisibility = this.handleExportButtonVisibility.bind(this);

        //this.getGasMeter(this.callbackGetGasMeter);

        this.state = {
            year: '',
            Currency: '',
            currentUnit: 'Dollar',
            meterData: [],
            currentMeterData: {},
            //meter: "0",
            isMeterChanged: false,
            loading: true,
        };

        this.messageRef = React.createRef();
    }

    componentDidMount() {
        // for applying css style for the default selection
        document.getElementById("tabbingusageDashboardDollarOption").click();
    }

    componentWillReceiveProps(propItems) {
        let self = this;
        if (propItems != undefined && propItems.accountChanged) {
            const accNum = propItems.accountChanged;//localStorage.getItem("AccountNumber");

            if (this.state.currentSelectedAccount != accNum) {
                this.setState({ currentSelectedAccount: accNum }, ()=>
                    self.getGasMeter(this.callbackGetGasMeter)
                );
            }
        }else{
            this.setState({ loading: false });
        }
    }

    callbackGetGasMeter(resp, isSuccess, self) {
        if (isSuccess) {
            if (resp != null && resp.data != null && resp.data.data != null
                && resp.data.data.length > 0) {
                self.setState({ meterData: resp.data.data });

                self.setState({ meter: resp.data.data[0].meterId });

                var currentSelectedItem = {
                    AccountId: resp.data.data[0].accountId,
                    MeterId: resp.data.data[0].meterId,
                    AccountNumber: resp.data.data[0].accountNumber,
                    MeterNumber: resp.data.data[0].meterNumber,
                };
                if (!(self.state.currentMeterData.MeterId == currentSelectedItem.MeterId
                    && self.state.currentMeterData.AccountId == currentSelectedItem.AccountId)) {
                    self.setState({ currentMeterData: currentSelectedItem, isMeterChanged: true });
                }
            } else {
                self.setState({ currentMeterData: {}, isMeterChanged: false, isDownload: false })
                toast.error("Usage data is not available for this period.");
            }
        } else {
            self.setState({ currentMeterData: {}, isMeterChanged: false, isDownload: false })
            toast.error("Usage data is not available for this period.");
        }
        self.setState({ loading: false });
    }

    getGasMeter(callback, premiseNo) {
        //var params = "?UserId=" + localStorage.getItem("UserId")
        //    + "&AccountNumber=" + localStorage.getItem("AccountNumber");
        var self = this;
        //let url = "https://d2.smartcmobile.net/SCM-ACCOUNTMANAGEMENT-DEV-API/api/1/Accounts/GetMeter?UserId=121&AccountNumber=910000005082";
        //const url ="https://d2.smartcmobile.net/SCM-ACCOUNTMANAGEMENT-DEV-API/api/1/Accounts/GetMeter" + params;
        //const url = "Accounts/GetMeterByAccountNo";
         const url = "Accounts/GetMeter";
        let params = "";

        if (RequestMiddleware.getConfigData(APIURLTypeEnum.UseMockData) === "true") {
            //params = "?UserId=121&AccountNumber=910000005082";
            params = "?AccountNumber=910000005082" 
        } else {
            params = "?AccountNumber=" + this.state.currentSelectedAccount;
        }

        self.setState({ loading: true });
        //APIURLTypeEnum.AccountMgmt
        //RequestHelper.GET1(url, (res) => {
        // RequestHelper.GET(url, APIURLTypeEnum.AccountMgmt, params, (res) => {
        RequestHelper.GET(url, APIURLTypeEnum.EntAccount, params, (res) => {
            const { status, data, statusText } = res;
            if (status) {
                if (res.status == StatusCodeEnum.OK) {
                    callback(res, true, self, status);
                }
                else {
                    callback(res, false, status);
                }
            } else {
                if (res.response && res.response.data) {
                    callback(res, false, status);
                }
            }

            self.setState({ loading: false });
        });
    }

    handleExportButtonVisibility(isDownload) {
        //this.setState({ isDownload });
    }

    handleChange = (event, value) => {
        this.setState({ value });

        if (value === 1) {
            this.setState({ currentUnit: "Usage" });
        } else {
            this.setState({ currentUnit: "Dollar" });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={24}>
                <Grid item className={`w-100 pr-4 ${classes.TabbsAlignment}`}>
                    <Tabs className="tabbingusage"
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <Tab id="tabbingusageDashboardDollarOption" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Dollars" />
                        <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Usage" />
                    </Tabs>
                </Grid>
                {/* <Grid item lg={7} sm={7} size={12} className={classes.GridRooter}>
                    <ControlledOpenSelect />
                </Grid>*/}
                <GasUsageChartMonthly
                    isMeterChanged={this.state.isMeterChanged}
                    currentMeterData={this.state.currentMeterData}
                    handleChange={this.handleExportButtonVisibility}
                    currentUnit={this.state.currentUnit} />

                {this.state.loading && <Loader />}
                <MessageBox ref={this.messageRef} />
            </Grid>
        );
    }
}
UsageButtonPills.propTypes = {
    classes: PropTypes.object.isRequired,
};

//class ControlledOpenSelect extends React.Component {
//    state = {
//        year: '',
//        Currency: '',
//        currentUnit: 'Dollar',
//        meterData: [],
//        currentMeterData: {},
//        //meter: "0",
//        isMeterChanged: false,
//        loading: true,
//    };

//    constructor(props) {
//        super(props);
//    }

//    componentDidMount() {
//        // for applying css style for the default selection
//        document.getElementById("tabbingusageDashboardDollarOption").click();
//    }

//    handleChange = event => {
//        this.setState({ [event.target.name]: event.target.value });
//    };

//    render() {
//        const { classes } = this.props;
//        return (
//            <form autoComplete="off" className="UsageSelecters">
//                <FormControl variant="outlined" style={{ width: `120px`, margin: `0px 20px`, textAlign: `left` }} className="UsageDropsControlTwo">
//                    <InputLabel shrink htmlFor="selectYear"></InputLabel>
//                    <Select classes={{ outlined: 'paddingSelector' }}
//                        value={this.state.year}
//                        onChange={this.handleChange}
//                        input={<OutlinedInput disableUnderline name="year" id="selectYear" />}
//                        displayEmpty
//                        name="year"
//                    >
//                        <MenuItem value="">
//                            <em>2019</em>
//                        </MenuItem>
//                        <MenuItem value={10}>2018</MenuItem>
//                        <MenuItem value={20}>2017</MenuItem>
//                        <MenuItem value={30}>2016</MenuItem>
//                    </Select>
//                </FormControl>

//                <FormControl variant="outlined" style={{ width: `90px`, margin: `0px 20px`, textAlign: `left` }} className="UsageDropsControlTwo">
//                    <InputLabel shrink htmlFor="selectCurrency"></InputLabel>
//                    <Select classes={{ outlined: 'paddingSelector' }}
//                        value={this.state.Currency}
//                        onChange={this.handleChange}
//                        input={<OutlinedInput disableUnderline name="Currency" id="selectCurrency" />}
//                        displayEmpty

//                        name="Currency"
//                    >
//                        <MenuItem value="">
//                            <em>$</em>
//                        </MenuItem>
//                        <MenuItem value={20}>kWH</MenuItem>
//                    </Select>
//                </FormControl>

//            </form>
//        );
//    }
//}

export default withStyles(styles)(UsageButtonPills);

