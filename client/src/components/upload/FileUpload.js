import { useState } from 'react';
import { Button, Icon, TextInput } from 'react-materialize';
import api from '../../utils/api';
import Message from './Message';

const FileUpload = ({ updateFileNameToParent }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Thumbnail *');
  const [message, setMessage] = useState('');

  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  updateFileNameToParent(filename);

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <TextInput id="add-cat-thumb" name="thumbnail" type="file" label={filename} onChange={onChangeHandler} s={12} />
        {message && <Message msg={message} />}
        <Button variant="contained" className="blue darken-2 mb" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      </form>
    </>
  );
};

export default FileUpload;
