import React, { useState } from 'react';
import axios from 'axios';
// import { Container, Form } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import ImageUploader from 'react-images-upload';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
// import Message from '../layout/Message';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddItem = (props) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [item, setItem] = useState(initialFormState);
  const [itemAdded, setItemAdded] = useState(false);

  // vanilla img ul
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  const [form] = Form.useForm();

  async function onSubmit(e) {
    // e.preventDefault();
    props.addItem(item);
    // setItemAdded(true);
    // setItem(initialFormState);

    // const formData = new FormData();
    // formData.append('file', file);
    // try {
    //   const res = await axios.post('/upload', formData, {
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
  //   setFilename(e.target.files[0].name);
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // }

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name='control-hooks'
      // initialValues={{
      //   remember: true,
      // }}
      onSubmit={onSubmit}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='title'
        label='Title'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input value={item.title} onChange={onChange} />
      </Form.Item>

      {/* <Form.Item label='Thumbnail'>
        <Form.Item
          name='dragger'
          valuePropName='fileList'
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name='files' action='/upload.do'>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item> */}

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button htmlType='button' onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>

    // <>
    //   <Form onSubmit={onSubmit}>
    //     <Form.Group>
    //       <Form.Control
    //         name='title'
    //         placeholder='Title *'
    //         value={item.title}
    //         onChange={onChange}
    //         type='text'
    //         required
    //       />
    //     </Form.Group>
    //     <Form.Group>
    //       <Form.Control
    //         name='thumbnail'
    //         placeholder='Thumbnail *'
    //         value={item.thumbnail}
    //         onChange={onChange}
    //         type='text'
    //         required
    //       />
    //     </Form.Group>
    //     <>
    //       {message ? <Message msg={message} /> : null}
    //       <Form.Group className='custom-file mb-4'>
    //         <Form.File
    //           name='thumbnail'
    //           id='custom-file'
    //           label={filename}
    //           onChange={onChangeFile}
    //           custom
    //         />
    //       </Form.Group>
    //     </>
    //     <Container className='text-center'>
    //       <Button
    //         type='submit'
    //         variant='contained'
    //         color='primary'
    //         startIcon={<AddIcon />}
    //       >
    //         Add
    //       </Button>
    //     </Container>
    //   </Form>
    //   {uploadedFile && (
    //     <Container className='text-center mt-1'>
    //       <h5>{uploadedFile.fileName}</h5>
    //       <img
    //         style={{ width: '50%' }}
    //         src={uploadedFile.filePath}
    //         alt={uploadedFile.filePath}
    //       />
    //     </Container>
    //   )}
    //   {itemAdded && (
    //     <Container className='d-flex justify-content-center mt-2'>
    //       <h5>Location added</h5>
    //     </Container>
    //   )}
    // </>
  );
};

export default AddItem;
