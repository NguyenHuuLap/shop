import React from 'react';
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img src={require('../../../assets/images/logo/logo.png')} width={300} height={300} />
      <Typography variant="h1" component="h1" className={classes.title}>
        404 - Trang không tồn tại
      </Typography>
      <Typography variant="body1" className={classes.description}>
        Trang bạn đang tìm kiếm không tồn tại.
      </Typography>
    </Box>
  );
};

export default NotFound;