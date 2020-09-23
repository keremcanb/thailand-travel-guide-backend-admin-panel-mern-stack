import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { getLogs } from '../../actions/logActions';

const Logs = ({ getLogs, log: { logs, loading } }) => {
  const classes = useStyles();

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  return !(loading || logs === null) ? (
    <Container>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        <Grid className={classes.gridMain}>
          {logs.map((log) => (
            <LogItem key={log._id} log={log} />
          ))}
        </Grid>
      )}
    </Container>
  ) : (
    <Preloader />
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(10),
    justifyContent: 'center',
    marginTop: '100px',
  },
  gridFab: {
    float: 'right',
  },
}));

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
