import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import RequestHelper from "../../../common/RequestHelper";
import { StatusCodeEnum } from "../../../core/Enum";
import Loader from "../../../shared/Views/Loader";
import MessageBox from "../../../shared/Views/MessageBox";
import ElectricUsageChart from './ElectricUsageChart';

import GasUsageChartMonthly from '../../Dashboard-Content/MakePledgeDashboard/GasUsageChartMonthly';

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
            backgroundColor: '#ffffff',
            border:'none !important'
        },
        '&:focus': {
            backgroundColor: '#ffffff',
        },
    },
    tabSelected: {},
    TabbsAlignment: { display: 'flex', justifyContent: 'flex-end' },
    GridRooter: { display: 'flex' }
});

class UsageButtonPillsCustom extends React.Component {
    state = {
        value: 0,
        year: '',
        Currency: '',
        currentUnit: 'Dollar',
        meterData: [],
        currentMeterData: {},
        isMeterChanged: false,
        loading: true,
    };

    constructor(props) {
        super(props);
        this.setState({ currentSelectedAccount: localStorage.getItem("AccountNumber") });
        this.getGasMeter = this.getGasMeter.bind(this);
        this.callbackGetGasMeter = this.callbackGetGasMeter.bind(this);
        this.handleExportButtonVisibility = this.handleExportButtonVisibility.bind(this);

        this.state = {
            year: '',
            Currency: '',
            currentUnit: 'Dollar',
            meterData: [],
            currentMeterData: {},
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
        //if (propItems != undefined && propItems.accountChanged) {
        const accNum = localStorage.getItem("AccountNumber");
        if (this.state.currentSelectedAccount != accNum) {
            this.setState({ currentSelectedAccount: accNum });
            this.getGasMeter(this.callbackGetGasMeter);
        }
        //}
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
        var params = "?UserId=" + localStorage.getItem("UserId")
            + "&AccountNumber=" + localStorage.getItem("AccountNumber");
        var self = this;
        let url = "https://d2.smartcmobile.net/SCM-ACCOUNTMANAGEMENT-DEV-API/api/1/Accounts/GetMeter?UserId=121&AccountNumber=910000005082";
        //const url ="https://d2.smartcmobile.net/SCM-ACCOUNTMANAGEMENT-DEV-API/api/1/Accounts/GetMeter" + params;

        self.setState({ loading: true });

        RequestHelper.GET1(url, (res) => {
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
                <Grid item lg={5} sm={5} size={12} className={classes.TabbsAlignment}>
                    <Tabs className="tabbingusage"
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <Tab id="tabbingusageDashboardDollarOption" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Dollar" />
                        <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Usage" />
                    </Tabs>
                </Grid>
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
UsageButtonPillsCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsageButtonPillsCustom);

