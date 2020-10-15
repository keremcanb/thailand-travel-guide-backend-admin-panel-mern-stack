import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import FadeIn from 'react-lazyload-fadein';
import {
  Col,
  Row,
  Icon,
  Card,
  CardTitle,
  Modal,
  Button
} from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deletePlace, setCurrent } from '../../actions/place';

const PlaceItem = ({ place }) => {
  const { thumbnail, title } = place;

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setCurrent(place));
  };

  const onDelete = () => {
    dispatch(deletePlace(place._id));
    M.toast({ html: `${title} deleted` });
  };

  return (
    <Row>
      <Col>
        <Card
          className="hoverable"
          header={
            <>
              {/* <FadeIn height={150}>
                {(onload) => ( */}
              <img
                src={thumbnail}
                alt={title}
                width="200"
                height="150"
                // onLoad={onload}
              />
              {/* )}
              </FadeIn> */}
              <CardTitle>{title}</CardTitle>
            </>
          }
        >
          <Row className="center">
            <Link to="editplace">
              <Button
                className="blue darken-2 mr"
                floating
                node="button"
                icon={<Icon>edit</Icon>}
                onClick={onClick}
              />
            </Link>
            <Modal
              actions={[
                <>
                  <Button
                    className="red"
                    modal="close"
                    node="button"
                    onClick={onDelete}
                    style={{ marginRight: '1rem' }}
                  >
                    Delete
                    <Icon right>delete</Icon>
                  </Button>
                  <Button modal="close" node="button" className="blue darken-2">
                    Close
                    <Icon right>close</Icon>
                  </Button>
                </>
              ]}
              header={`Delete ${title}?`}
              id="Modal-0"
              open={false}
              trigger={
                <Button className="red" node="button" floating>
                  <Icon right>delete</Icon>
                </Button>
              }
            />
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceItem;
