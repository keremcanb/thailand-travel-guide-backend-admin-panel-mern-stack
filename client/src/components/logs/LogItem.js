/* eslint-disable import/extensions */
import React from 'react';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLog, setCurrent } from '../../actions/logActions';

const LogItem = ({ deleteLog, setCurrent, log }) => {
  const onDelete = () => {
    deleteLog(log.id);

    M.toast({ html: 'Log Deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
        <div>
          <img
            src={log.thumbnail}
            alt={log.title}
            thumbnail
            width={150}
            height={75}
          />
        </div>
        <br />
        <div>
          <h5>{log.title}</h5>
        </div>
        <br />
        {/* <span className='grey-text'>
          <span className='black-text'>ID #{log._id}</span> last updated by{' '}
          <span className='black-text'>{log.title}</span> on{' '}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment>
        </span> */}
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
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrent })(LogItem);
