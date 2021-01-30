import React from "react";
import PropTypes from 'prop-types';
import { MDBContainer } from "mdbreact";
import { withStyles } from '@material-ui/core/styles';
import ReactApexChart from "react-apexcharts";

const styles = theme => ({
  barchart: {
    minHeight: '300px',
    overflow: 'auto',
    minWidth: '100%',
    maxWidth: '100%',
  },
  mixedChart: {
    height: '100%',
    width: '100%',
  },

});

class PaymentHistoryChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#7fbfff', '#7fbfff'],
        chart: {
          width: '100%',
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth',
          width: [0, 0]
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '25',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['#7fbfff']
        },
        xaxis: {
          categories: ['Jan,19', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan,20'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "Total Gas Usage " + val + " Kwh"
            }
          }
        },
        responsive: [
          {
            breakpoint: 1024,
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '25%',
                  horizontal: false
                }
              },
            }
          }
        ]
      },
      series: [{
        name: 'Gas Usage',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }],
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MDBContainer className={classes.barchart} >
        <div className="mixedChart" id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350"
          />
        </div>
      </MDBContainer>
    );
  }
}

PaymentHistoryChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentHistoryChart);