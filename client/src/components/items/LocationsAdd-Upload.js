import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Message from '../layout/Message';

const AddItem = ({ addItem }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [item, setItem] = useState(initialFormState);
  const [itemAdded, setItemAdded] = useState(false);

  // const [file, setFile] = useState('');
  // const [uploadedFile, setUploadedFile] = useState({});
  // const [message, setMessage] = useState('');

  const [file, setFile] = useState(''); // storing the uploaded file
  const [data, getFile] = useState({ name: '', path: '' }); // storing the recived file from backend
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file); // appending file
    axios
      .post('/upload', formData, {
        // onUploadProgress: (ProgressEvent) => {
        //   let progress =
        //     Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
        //     '%';
        //   setProgess(progress);
        // },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: 'http://localhost:5000' + res.data.path,
        });
      })
      .catch((err) => console.log(err));

    addItem(item);
    setItemAdded(true);
    setItem(initialFormState);

    // const formData = new FormData();
    // formData.append('file', file);
    // try {
    //   const res = await post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   const { fileName, filePath } = res.data;
    //   setUploadedFile({ fileName, filePath });
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     setMessage('There was a problem with the server');
    //   } else {
    //     setMessage(err.response.data.msg);
    //   }
    // }
  }

  // function onChangeFile(e) {
  //   setFile(e.target.files[0]);
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setFile(file); // storing file
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            name='title'
            placeholder='Title *'
            value={item.title}
            onChange={onChange}
            type='text'
            required
          />
          <Form.Control.Feedback type='invalid'>
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        <div className='file-upload'>
          <input
            type='file'
            ref={el}
            onChange={handleChange}
            name='thumbnail'
          />
          {/* <div className='progessBar' style={{ width: progress }}>
            {progress}
          </div>
          <button onClick={uploadFile} className='upbutton'>
            {' '}
            Upload
          </button> */}
          <hr />
          {/* displaying received image */}
          {data.path && <img src={data.path} alt={data.name} />}
        </div>
        {/* <>
          {message && <Message msg={message} />}
          <Form.Group>
            <Form.File
              name='thumbnail'
              className='position-relative'
              onChange={onChangeFile}
              required
            />
          </Form.Group>
        </> */}
        <Container className='text-center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Container>
      </Form>
      {/* {uploadedFile && (
        <Container className='text-center mt-1'>
          <h5>{uploadedFile.fileName}</h5>
          <img
            style={{ width: '50%' }}
            src={uploadedFile.filePath}
            alt={uploadedFile.filePath}
          />
        </Container>
      )} */}
      {itemAdded && (
        <Container className='d-flex justify-content-center mt-2'>
          <h5>Location added</h5>
        </Container>
      )}
    </>
  );
};

export default AddItem;
