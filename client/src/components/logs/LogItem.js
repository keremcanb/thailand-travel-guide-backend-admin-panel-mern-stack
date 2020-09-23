/* eslint-disable import/extensions */
import React from 'react';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLog, setCurrent } from '../../actions/logActions';

const LogItem = ({ deleteLog, setCurrent, log }) => {
  const classes = useStyles();

  const onDelete = () => {
    deleteLog(log.id);

    M.toast({ html: 'Log Deleted' });
  };

  return (
    <Grid className={classes.gridMain}>
      <div>
        <img src={log.thumbnail} alt={log.title} width={150} height={75} />
      </div>
      <div>
        <h6 style={{ textAlign: 'center' }}>{log.title}</h6>
      </div>
      <br />
      <div>
        <a
          href='#edit-log-modal'
          onClick={() => setCurrent(log)}
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}
        >
          <i className='material-icons blue-text'>edit</i>
        </a>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons red-text'>delete</i>
        </a>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  gridMain: {
    justifyContent: 'center',
  },
  gridFab: {
    float: 'right',
  },
}));

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrent })(LogItem);
