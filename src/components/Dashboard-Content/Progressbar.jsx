import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5,
    marginBottom: '10',
  },
  mybar: {
    height: '30px',
    backgroundColor: '#ffffff'
    ,
  },
  tippa: {
    backgroundColor: '#7fbfff',
  }
}));

export default function Progressbar() {
  const [completed, setCompleted] = React.useState(0);
  const [completed2, setCompleted2] = React.useState(0);
  const [completed3, setCompleted3] = React.useState(0);

  const timer = setInterval(progress, 400);
  const diff = Math.random();
  function progress() {
    setCompleted(completed => {
      return Math.min(completed + diff, 28);
    });
    setCompleted2(completed2 => {
      return Math.min(completed2 + diff, 37);
    });
    setCompleted3(completed3 => {
      return Math.min(completed3 + diff, 41);
    })
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className='tableheading'>
        <label>15 Day Pledges: $12,438.99(28%)</label>
        <LinearProgress classes={{ bar1Determinate: classes.tippa, determinate: classes.mybar }} color="secondary" variant="determinate" value={completed} />
        <label>30 Day Pledges: $15,438.99(37%)</label>
        <LinearProgress classes={{ bar1Determinate: classes.tippa, determinate: classes.mybar }} color="secondary" variant="determinate" value={completed2} />
        <label>45 Day Pledges: $18,438.99(41%)</label>
        <LinearProgress classes={{ bar1Determinate: classes.tippa, determinate: classes.mybar }} color="secondary" variant="determinate" value={completed3} />
      </div>
    </div>
  );
}