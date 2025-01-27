import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import SideBar from "../sidebar/SideBar";
import "./workerHome.css";

function WorkerHome() {
  const [allRequests, setAllRequests] = useState();
  const [requests, setRequests] = useState();
  const [show, setShow] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [offerStatus, setOfferStatus] = useState();
  const [postId, setPostId] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const worker = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelOffer = (id) => {
    setPostId(id);
    setOfferStatus("pending");
  };
  const offerData = {
    offer: {
      offer_price: offerPrice,
      offer_status: offerStatus,
    },
    worker_id: worker.id,
    post_id: postId,
  };

  const sendOfferToUser = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("http://localhost:8080/offer", offerData, config)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("http://localhost:8080/posts", config)
      .then((response) => {
        setRequests(response.data);
        setAllRequests(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showAll = () => {
    if (allRequests !== undefined) {
      setRequests(allRequests);
    }
  };

  const filterHomeRequests = () => {
    const homeRequests = allRequests.filter((element) => {
      return element.category.category_name === "Home Services";
    });
    if (homeRequests !== undefined) {
      setRequests(homeRequests);
    }
  };

  const filterCarRequests = () => {
    const carRequests = allRequests.filter((element) => {
      return element.category.category_name === "Car Services";
    });
    if (carRequests !== undefined) {
      setRequests(carRequests);
    }
  };

  const filterPhoneRequests = () => {
    const phoneRequests = allRequests.filter((element) => {
      return element.category.category_name === "Phone Services";
    });
    if (phoneRequests !== undefined) {
      setRequests(phoneRequests);
    }
  };

  return (
    <div className="home-container">
      <div className="sidbar">
        <SideBar />
      </div>
      <div className="worker-main">
        <div className="worker-home-header">
          <h1>
            Users Requests
            <hr />
          </h1>
        </div>
        <div className="filter-requests-btn-group">
          <ButtonGroup aria-label="Basic example" size="sm">
            <Button
              className="requests-btn-group"
              variant="secondary"
              onClick={showAll}
            >
              All
            </Button>
            <Button
              className="requests-btn-group"
              variant="secondary"
              onClick={filterHomeRequests}
            >
              Home services Requests
            </Button>
            <Button
              className="requests-btn-group"
              variant="secondary"
              onClick={filterCarRequests}
            >
              Car services Requests
            </Button>
            <Button
              className="requests-btn-group"
              variant="secondary"
              onClick={filterPhoneRequests}
            >
              Phone services Requests
            </Button>
          </ButtonGroup>
        </div>
        <div className="request-cards">
          {requests !== undefined ? (
            <>
              {requests.map((element, index) => {
                return (
                  <Card key={index} className="card" style={{ width: "22rem" }}>
                    <Card.Header className="card-category">
                      {element.category.category_name}
                    </Card.Header>
                    <Card.Img variant="top" src={element.image} />
                    <Card.Body>
                      <Card.Title className="card-title">
                        {element.title}
                      </Card.Title>
                      <Card.Text>
                        <span className="card-span">
                          <small>Request details</small>
                          <br />
                        </span>
                        {element.description}
                      </Card.Text>
                      <div className="offer-btn">
                        <Button
                          className="send-offer-btn"
                          variant="warning"
                          onClick={() => {
                            handleShow();
                            handelOffer(element.post_id);
                          }}
                        >
                          send offer
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Send Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="offer-label">Offer price</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setOfferPrice(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter price"
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClose();
                      sendOfferToUser();
                    }}
                  >
                    Send
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerHome;
