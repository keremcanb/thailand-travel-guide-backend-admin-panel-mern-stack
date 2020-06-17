import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Message from '../layout/Message';
// import AddForm from '../layout/AddForm';

const AddItem = ({ addItem }) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [item, setItem] = useState(initialFormState);
  // const [validated, setValidated] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    // setValidated(true);
    addItem(item);
    setItemAdded(true);
    setItem(initialFormState);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  function onChangeFile(e) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Form
        // noValidate
        // validated={validated}
        onSubmit={onSubmit}
      >
        <Form.Group>
          <Form.Control
            name='title'
            placeholder='Title *'
            value={item.title}
            onChange={onChange}
            type='text'
            required
          />
          {/* <Form.Control.Feedback type='invalid'>
            Please provide a valid title.
          </Form.Control.Feedback> */}
        </Form.Group>
        <>
          {message ? <Message msg={message} /> : null}
          <Form.Group className='custom-file mb-4'>
            <Form.File
              name='thumbnail'
              id='custom-file'
              label={filename}
              onChange={onChangeFile}
              value={item.thumbnail}
              custom
              // required
            />
          </Form.Group>
          {/* <Form.Control.Feedback type='invalid'>
            Please choose an image.
          </Form.Control.Feedback> */}
        </>
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
      {uploadedFile && (
        <Container className='text-center mt-1'>
          <h5>{uploadedFile.fileName}</h5>
          <img
            style={{ width: '50%' }}
            src={uploadedFile.filePath}
            alt={uploadedFile.filePath}
          />
        </Container>
      )}
      {itemAdded && (
        <Container className='d-flex justify-content-center mt-2'>
          <h5>Location added</h5>
        </Container>
      )}
    </>
    //   <AddItemForm
    //   selectedItem={item}
    //   submit={onSubmit}
    //   change={onChange}
    // />
  );
};

export default AddItem;
