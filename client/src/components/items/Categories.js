import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AddItem from './CategoriesAdd';
import EditItem from './CategoriesEdit';
import ItemsList from './ItemsList';

const Items = () => {
  const [items, setItems] = useState([]);
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [editingItem, setEditingItem] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getItems() {
      const result = await axios.get('/api/categories');
      setItems(result.data);
    }
    getItems();
  }, []);

  function addItem(item) {
    async function postItem() {
      try {
        await axios.post('/api/categories', item);
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
      location: item.location,
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
        await axios.delete(`/api/categories/${id}`);
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
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                currentItem={currentItem}
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
