import React, { useState } from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const AddItem = (props) => {
  const initialFormState = { title: '', thumbnail: '' };
  const [item, setItem] = useState(initialFormState);

  function onChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  const schema = yup.object({
    title: yup.string().required(),
    thumbnail: yup.string().required(),
  });

  return (
    <Formik
      onSubmit={() => {
        props.addItem(item);
      }}
      onChange={onChange}
      initialValues={item}
      validationSchema={schema}
      enableReinitialize
    >
      {({ handleSubmit, handleChange, errors, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md='6' controlId='validationFormik104'>
              <Form.Control
                type='text'
                placeholder='Title'
                name='title'
                value={values.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationFormik105'>
              <Form.Control
                type='text'
                placeholder='Thumbnail'
                name='thumbnail'
                value={values.thumbnail}
                onChange={handleChange}
                isInvalid={!!errors.thumbnail}
              />
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.thumbnail}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.File
              className='position-relative'
              name='file'
              onChange={handleChange}
              isInvalid={!!errors.file}
              feedback={errors.file}
              id='validationFormik107'
              feedbackTooltip
            />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddItem;
