import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3',
  3.5: '3.5',
  4: '4',
  4.5: '4.5',
  5: '5',
};

const useStyles = makeStyles({
  root: {
    width: 500,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function HoverRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className= { classes.root }>
      <Rating
        size="large"
        name="hover-feedback"
        value= { value }
        precision= { 0.5 }
        onChange= { (event, newValue) => {
          setValue(newValue);
        } }
        onChangeActive= { (event, newHover) => {
          setHover(newHover);
        } }
      />
      {value !== null && <Box ml={ 2 } fontWeight={ 900 }>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
}