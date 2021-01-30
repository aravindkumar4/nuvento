import React from "react";
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { withStyles } from '@material-ui/core/styles';
import ReactApexChart from "react-apexcharts";
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestHelper from "../../../common/RequestHelper";
import RequestMiddleware from "../../../common/RequestMiddleware";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import MessageBox from "../../../shared/Views/MessageBox";
import Loader from "../../../shared/Views/Loader";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import highchartsAccessibility from "highcharts/modules/accessibility";
import borderRadius from "highcharts-border-radius";
highchartsAccessibility(Highcharts);

borderRadius(Highcharts);
const styles = theme => ({
  barchart: {
    minHeight: '300px',
    overflow: 'auto',
    minWidth: '400px',
    maxWidth: '100%',
  },
  mixedChart: {
    height: '100%',
    width: '100%',
  },
});

let options1 = {
  colors: ['#27A088'],
  credits: {
    enabled: false
  },
  lang: {
    accessibility: {
      role: "application",
      chartContainerLabel: "",
    }
  },
  chart: {
    type: 'column',
    toolbar: {
      show: false
    },
    style: {
      fontFamily: 'proxima-nova'
    },
    zoom: {
      enabled: false
    },
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }],
  plotOptions: {
    column: {
      borderRadiusTopLeft: 4,
      borderRadiusTopRight: 4
    },
    series: {
      // borderRadius: 4,
      marker: {
        enabled: true,
        radius: 4
      },
      dataLabels: {
        color: 'black',
        style: {
          fontSize: '11px',
          fontFamily: 'Verdana, sans-serif'
        }
      },
      
    }
  },
  title: {
    text: '',
  },
  xAxis: {
    labels: {
      // rotation: -45,
      style: {
        color: '#222221',
        margin: "-20px",
        fontSize: '11px',
      }
    },
    type: "category",
    name: 'Count',
    title: {
      style: {
        color: '#222221',
        fontWeight: 'bold',
        fontSize: '3px'
      }
    }
  },
  yAxis: {
    min: 0,
    maxPadding: 0.09,
    title: {
      text: "$(Dollars)",
      style: {
        color: '#222221',
        fontSize: '11px'
      },
    },
    labels: {
      formatter: function () {
        return this.value;
      },
      style: {
        color: '#222221',
        fontSize: '11px'
      }
    }
  },
  series: [{
    data: [],
    name: '',
    type: 'column',
    showInLegend: false
  }],
  tooltip: {
    useHTML: true,
    formatter: function () {

      let readingDatesRange = '<div style="font-weight:bold;background:#ECEFF1;color:#222221;margin:-8px;text-align:left;padding:8px;font-size:12px;font-family:proxima-nova">' + moment(this.point.options.readingFrom).zone(0).format("MMM DD") + ' - ' + moment(this.point.options.readingTo).zone(0).format("MMM DD") + '</div>'
      const currentValue = this.point.options.displayValue

      const diffTime = Math.abs(new Date(this.point.options.readingTo) - new Date(this.point.options.readingFrom));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const billingDaysValue = 'Billing Days: ' + diffDays;

      readingDatesRange += '<div style="font-size:11pt;color:#222221;padding-top:15px;padding-bottom:5px;text-align:left; font-family:proxima-nova" class="arrow_box">' + currentValue + '</div>'
      readingDatesRange += '<div style="font-size:11pt;color:#222221; padding-left:25px;text-align:left; font-family:proxima-nova" >' + billingDaysValue + '</div>'

      return (readingDatesRange);
    }
  }
}
class GasUsageChartMonthly extends React.Component {
  constructor(props) {
    super(props);
   

    this.getUsageRange = this.getUsageRange.bind(this);
    this.getBillingDays = this.getBillingDays.bind(this);
    this.callbackGetUsageData = this.callbackGetUsageData.bind(this);
    // getGasUsage(params, this.callbackGetUsageData);
    this.messageRef = React.createRef();

    this.state = {
      minGraphDataLength: 13,
      loading: false,
      showNext: false,
      showPrevious: false,
      option: options1,
      currentUnit: "Dollar",
      currentSelectedMeterData: {
        AccountId: "",
        MeterId: ""
      },
      series: [{
        data: [],
        name: '',
        type: 'column'
      }
       
      ],
      json: [],
      completeJson: []
    }
  }

  //componentDidMount() {
  //}

  componentWillReceiveProps(propItems) {
    if (propItems != undefined && propItems.currentUnit != undefined) {
      if ((this.state.completeJson == [] || this.state.completeJson.length == 0) && this.state.currentUnit != propItems.currentUnit) {
        toast.error("Usage data is not available for this period.");
      }
      this.bindGraphData(propItems.currentUnit);
    }
    if (propItems != undefined && propItems.isMeterChanged == true && propItems.currentMeterData != undefined) {
      if (!(this.state.currentSelectedMeterData.AccountId == propItems.currentMeterData.AccountId
        && this.state.currentSelectedMeterData.MeterId == propItems.currentMeterData.MeterId)) {

        this.state.currentSelectedMeterData.AccountId = propItems.currentMeterData.AccountId;
        this.state.currentSelectedMeterData.MeterId = propItems.currentMeterData.MeterId;
        this.setState({ currentSelectedMeterData: this.state.currentSelectedMeterData });
        this.handleClickGetUsageData(propItems.currentMeterData.AccountNumber, propItems.currentMeterData.MeterNumber, propItems.currentMeterData.AccountId, propItems.currentMeterData.MeterId)
      }
    } else {

    }
  }

  handleClickGetUsageData(AccountNumber, MeterNumber, AccountId, MeterId) {
    var params = {
      AccountNumber: AccountNumber,
      MeterNumber: MeterNumber,
      FromDate: moment().subtract(13, 'months').format("YYYY-MM-DD"),
      ToDate: moment().format("YYYY-MM-DD"),
      Periodicity: "MO",
      Uom: ""
    }

    this.getGasUsage(params, this.callbackGetUsageData)
  };

  getGasUsage = (params, callback) => {
    this.setState({ loading: true });

    const url = "Gas";
    let param = "";

    if (RequestMiddleware.getConfigData(APIURLTypeEnum.UseMockData) === "true") {
      param = "?AccountNumber=910000005082&MeterNumber=N587835&From=2018-10-11&To=2020-09-11&Uom=&Periodicity=MO";
    } else {
      param = "?AccountNumber=" + params.AccountNumber
        + "&MeterNumber=" + params.MeterNumber
        + "&From=" + params.FromDate
        + "&To=" + params.ToDate
        + "&Uom=" + params.Uom
        + "&Periodicity=" + params.Periodicity;
    }

    RequestHelper.GET(url, APIURLTypeEnum.Usage, param, (res) => {
      const { status, data, statusText } = res;
      if (res.Result) {

        if (res.StatusCode === 200) {
          var resp = {
            data: {
              Result: res.Result
            }
          }
          

          callback(resp, true, params.status);
        }
        else {

        }
      } else {
        if (res.response && res.response.data) {

        }
      }
    });
  }

  getFormattedDate = (date, format) => {
    if (format == undefined) {
      return moment(date).zone(0).format("MMM 'YY");
    }
    else {
      return moment(date).zone(0).format(format);
    }
  }

  callbackGetUsageData(resp, isSuccess) {
    if (isSuccess) {
      this.setState({ showNext: false, showPrevious: false });
      if (resp != null && resp.data != null && resp.data.Result != null
        && resp.data.Result.gasUsages != null && resp.data.Result.gasUsages.length > 0) {
        var usageSeries = resp.data.Result.gasUsages;
        if (usageSeries.length > this.state.minGraphDataLength) {
          this.setState({ json: usageSeries.slice(usageSeries.length - this.state.minGraphDataLength, usageSeries.length) });
          this.setState({ completeJson: usageSeries });
          this.setState({ showNext: false, showPrevious: true });
        } else {
          this.setState({ json: usageSeries });
          this.setState({ completeJson: usageSeries });
        }
        this.props.handleChange(true);
        this.bindGraphData(this.state.currentUnit);
      } else {
        this.setState({ json: [], completeJson: [] });
        this.setState({ showNext: false, showPrevious: false });
        this.bindGraphData(this.state.currentUnit);
        this.messageRef.current.showMessage("Usage data is not available for this period.", NotificationMessageTypeEnum.Error);
        // toast.error("Usage data is not available for this period.");
        this.props.handleChange(false);
      }
    } else {
      this.setState({ json: [], completeJson: [] });
      this.setState({ showNext: false, showPrevious: false });
      this.bindGraphData(this.state.currentUnit);
      toast.error("Usage data is not available for this period.");
      this.props.handleChange(false);
    }
    this.setState({ loading: false });
  }

  bindGraphData(currentUnit) {

    this.setState({ currentUnit: currentUnit })
    var yAxisData = [];
    this.state.series = [{
      data: [],
      name: ''
    }];

    options1 = this.state.option;
    this.setState({ option: {} });

    var yAxisTitleNode = [{
      title: {
        text: currentUnit == 'Dollar' ? "$(Dollars)" : "Therms",
      },
    }];
    options1.yaxis = yAxisTitleNode;

    this.state.json.map((item, index) => {
      
      var formattedDate = this.getFormattedDate(item.readingDate);

      var categoryData = {
        name: formattedDate,
        y: currentUnit == 'Dollar' ? item.usageCost : item.usageValue,
        readingFrom: item.readingFrom,
        readingTo: item.readingTo,
        readingDate: item.readingDate,
        usageValue: item.usageValue,
        usageCost: item.usageCost,
        displayValue: "$" + parseFloat(item.usageCost).toFixed(2) + " (" + parseInt(item.usageValue) + " Therms)"
      };
     
        yAxisData.push(categoryData);
      
    });
    options1.yAxis.title.text = currentUnit === "Dollar" ? "Dollars" : "Therms"

    options1.plotOptions.series.dataLabels = {
      // align: 'center',
      rotation: -90,
      y: -20,
      enabled: true,
      style: {
        fontWeight: "bold"
      },
      formatter: function () {
        if (this.y === 0) {
          return null;
        }
        if (this.y > 0) {
          const num = this.y % 1 != 0 ? this.y.toFixed(2) : this.y
          return `${currentUnit === "Dollar" ? "$" : ""}${num} ${currentUnit === "Usage" ? "" : ""}`; 
        }
      },
    }

   
    options1.series = [{
      name: '',
      type: "column",
      data: yAxisData,
      dataSorting: {
        enabled: true,
        sortKey: 'custom'
      },
      showInLegend: false
    }];


    this.state.series = [{
      data: yAxisData
    }];

    this.setState({ option: options1, series: this.state.series });

    if (this.refs.myUsageChart != undefined) {
      
      const chart = this.refs.myUsageChart.chart;
      chart.update({
        series: this.state.option.series,
        yAxis: this.state.option.yAxis
      });
    }
  }

  getUsageRange(date, usage, currentUnit) {

    var filteredRecord = this.state.completeJson.filter(x => this.getFormattedDate(x.readingDate) == date)[0];
    // && (currentUnit=="Dollar"? Number(x.usageCost)==usage : Number(x.usageValue) == usage))[0];

    if (filteredRecord != undefined) {
      return '<div style="font-weight: bold" class="arrow_box">' + this.getFormattedDate(filteredRecord.readingFrom, "MMM DD") + ' - ' + this.getFormattedDate(filteredRecord.readingTo, "MMM DD") + '</div>';
    }
  }

  getBillingDays(date, usage, currentUnit) {
    
    var filteredRecord = this.state.completeJson.filter(x => this.getFormattedDate(x.readingDate) == date)[0];

    if (filteredRecord != undefined) {

      const diffTime = Math.abs(new Date(filteredRecord.readingTo) - new Date(filteredRecord.readingFrom));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    }
  }

  handleNextPrevious = (event) => {
    if (event.currentTarget.id == "Next") {
      this.setState({ showNext: false, showPrevious: true });
      var completeJson = this.state.completeJson;
      this.state.json = completeJson.slice(completeJson.length - this.state.minGraphDataLength, completeJson.length);
      this.setState({ json: this.state.json });
      this.bindGraphData(this.state.currentUnit);
    } else if (event.currentTarget.id == "Previous") {
      this.setState({ showNext: true, showPrevious: false });
      var completeJson = this.state.completeJson;
      this.state.json = completeJson.slice(0, completeJson.length - this.state.minGraphDataLength);
      this.setState({ json: this.state.json });
      this.bindGraphData(this.state.currentUnit);
    }

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.loading && <Loader />}
        <ToastContainer />
        <MDBContainer className={classes.barchart} id="ChartContainer">
          <div className="mixedChart" id="chart">

            <HighchartsReact
              ref="myUsageChart"
              highcharts={Highcharts}
              options={this.state.option}
              constructorType='chart'
              allowChartUpdate={true}
              immutable={false}
              updateArgs={[true, true, true]}
            />

          </div>
          <Grid className="UsageDisclaimerSection">
            <p style={{ "margin-left": "45%", "font-size": "11px" }}>Months</p>
          </Grid>
          <Grid className="UsageDisclaimerSection">
            <p>Beginning May 2021, graph will exclude showing any additional charges, and only show usage costs with taxes, this amount may differ from the billed amount on your statement.</p>
          </Grid>
          <MessageBox ref={this.messageRef} />
        </MDBContainer>
      </>
    );
  }
}

GasUsageChartMonthly.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GasUsageChartMonthly);