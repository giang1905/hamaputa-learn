import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Toast from "react-bootstrap/Toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import UpdatePostModal from "../posts/UpdatePostModal"
import addIcon from "../../assets/plus-circle-fill.svg";

const Dashboard = () => {
  const {
    authState: {
      user: { tenkpp },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, postLoading },
    getPosts,
    showUpdatePostModal,
    setShowAddPostModal,
    showToast,
    setShowToast,
  } = useContext(PostContext);

  useEffect(() => getPosts(), []);

  let body = null;
  const { show, message, type } = showToast;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (post.length === 0) {
    body = (
      <Card className="text-center mx-5 my-5">
        <Card.Header as="h1">Hi {tenkpp}</Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn
          </Card.Text>
          <Button
            variant="primary"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            LearnIt
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {post.map((item) => (
            <Col key={item._id} className="my-2">
              <SinglePost post={item} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
        <Button
          className="btn-floating"
          onClick={setShowAddPostModal.bind(this, true)}
        >
          <img src={addIcon} alt="add-icon" width="60" height="60" />
        </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {showUpdatePostModal && <UpdatePostModal />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
