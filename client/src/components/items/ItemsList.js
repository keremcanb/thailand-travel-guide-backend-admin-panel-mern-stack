import React, { useState } from 'react';
import { Media, Image, Modal, Container, Spinner } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import LazyLoad from 'react-lazy-load';
import SearchBar from '../layout/SearchBar';

const ListItems = ({ selectedItem, deleteItem, editItem, onSearch }) => {
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  return (
    <Container className='shadow-sm p-3 mb-5 bg-white rounded mt-5'>
      <SearchBar onSearch={onSearch} />
      {!selectedItem.length ? (
        <Container className='d-flex justify-content-center'>
          <Spinner animation='border' variant='primary' />
        </Container>
      ) : (
        selectedItem.map((item) => (
          <Container key={item._id}>
            <ul className='list-unstyled'>
              <Media as='li'>
                <LazyLoad>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    // className='mr-4'
                    thumbnail
                    width={120}
                    height={40}
                  />
                </LazyLoad>
                <Media.Body>
                  <h6 className='text-center mt-1 mb-4'>
                    <strong>{item.title}</strong>
                  </h6>
                  <Container className='d-flex justify-content-center'>
                    <IconButton
                      color='primary'
                      className='shadow-sm mr-4'
                      size='small'
                      onClick={() => {
                        editItem(item);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='secondary'
                      className='shadow-sm'
                      size='small'
                      onClick={handleShow}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Modal show={modal} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                      </Modal.Header>
                      <Modal.Footer>
                        <Button
                          type='submit'
                          variant='contained'
                          color='secondary'
                          size='small'
                          className='mr-2'
                          onClick={() => {
                            deleteItem(item._id);
                            handleClose();
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          type='submit'
                          variant='contained'
                          size='small'
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Container>
                </Media.Body>
              </Media>
            </ul>
            <hr />
          </Container>
        ))
      )}
    </Container>
  );
};

export default ListItems;
