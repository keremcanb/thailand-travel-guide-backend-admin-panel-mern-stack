import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Preloader, Button, Icon } from 'react-materialize';
import { getCategories } from '../../actions/category';
import CategoryItem from './CategoryItem';
import CategoryFilter from './CategoryFilter';

const Categories = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);
  const { categories, loading, filtered } = category;

  useEffect(() => {
    dispatch(getCategories());
    document.title = 'Categories';
  }, [dispatch]);

  return (
    <>
      <CategoryFilter />

      {categories && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((item) => (
                  <CategoryItem key={item._id} category={item} />
                ))
              : categories.map((item) => (
                  <CategoryItem key={category._id} category={item} />
                ))}
          </Col>
        </Row>
      ) : (
        <Preloader
          className="loader"
          active
          color="blue"
          flashing={false}
          size="big"
        />
      )}
      <Link to="addcategory">
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          icon={<Icon>add</Icon>}
        />
      </Link>
    </>
  );
};

export default Categories;
