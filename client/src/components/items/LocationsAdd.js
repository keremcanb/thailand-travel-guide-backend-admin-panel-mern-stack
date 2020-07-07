import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// import ImageUploader from 'react-images-upload';
import Message from '../layout/Message';

const AddItem = (props) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [item, setItem] = useState(initialFormState);
  const [itemAdded, setItemAdded] = useState(false);

  // vanilla img ul
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  // react-images-upload
  // const [pictures, setPictures] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();
    props.addItem(item);
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
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  // function onDrop(picture) {
  //   setPictures([...pictures, picture]);
  // }

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
        </Form.Group>
        {/* <Form.Group>
          <Form.Control
            name='thumbnail'
            placeholder='Thumbnail *'
            value={item.thumbnail}
            onChange={onChange}
            type='text'
            required
          />
        </Form.Group> */}
        <>
          {message ? <Message msg={message} /> : null}
          <Form.Group className='custom-file mb-4'>
            <Form.File
              name='thumbnail'
              id='custom-file'
              label={filename}
              onChange={onChangeFile}
              custom
            />
          </Form.Group>
        </>
        {/* <ImageUploader
          {...props}
          // name='thumbnail'
          // value={item.thumbnail}
          onChange={onDrop}
          withIcon={false}
          withLabel={false}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview
          singleImage
        /> */}
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
  );
};

export default AddItem;
