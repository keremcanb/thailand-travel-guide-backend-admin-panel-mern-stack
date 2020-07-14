import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AddItem from './LocationsAdd';
import EditItem from './LocationsEdit';
import ItemsList from './ItemsList';

const Items = () => {
  const [items, setItems] = useState([]);
  const initialFormState = { _id: null, title: '', thumbnail: '' };
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [editingItem, setEditingItem] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getItems() {
      const result = await axios.get('/api/locations');
      setItems(result.data);
    }
    getItems();
    // effect will only run once when the component mounts, and not on every re-render.
  }, []);

  function addItem(item) {
    async function postItem() {
      try {
        await axios.post('/api/locations', item);
      } catch (error) {
        console.log('error', error);
      }
    }
    postItem();
    setItems([...items, item]);
  }

  function editItem(item) {
    setEditingItem(true);
    setCurrentItem({
      id: item._id,
      title: item.title,
      thumbnail: item.thumbnail,
    });
  }

  function updateItem(id, updatedItem) {
    setEditingItem(false);
    setItems(items.map((item) => (item._id === id ? updatedItem : item)));
  }

  function deleteItem(id) {
    setEditingItem(false);
    async function handleDelete() {
      try {
        await axios.delete(`/api/locations/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
    handleDelete();
    setItems(items.filter((item) => item._id !== id));
  }

  function onSearch(e) {
    setSearch(e.target.value);
  }

  const filterSearch = items.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Container className='sticky-top shadow-sm p-3 rounded'>
            {!editingItem ? (
              <AddItem addItem={addItem} />
            ) : (
              <EditItem
                currentItem={currentItem}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                updateItem={updateItem}
              />
            )}
          </Container>
        </Col>
        <Col md={4}>
          <ItemsList
            selectedItem={filterSearch}
            editItem={editItem}
            deleteItem={deleteItem}
            onSearch={onSearch}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Items;
