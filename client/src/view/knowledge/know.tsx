import { Button, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import "./know.css";
import { Knowledge } from "../model/model";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

function Know(): JSX.Element {
  const [data, setData] = useState<Knowledge[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response: AxiosResponse = await axios.get(
          "http://127.0.0.1:5000/"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  function knowList(): JSX.Element[] {
    return data.map((d,index) => (
      <ListGroup.Item key={index} className="p-3" action>
        {d.NameRule}
      </ListGroup.Item>
    ));
  }

  return (
    <>
      <Row className="mt-5">
        <Col>
          <InputGroup size="lg">
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </Col>
        <Col className="col-lg-2">
          <Button className="btn-light mb-3 p-2">Search</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <div className="overflow-list">
            <ListGroup>{knowList()}</ListGroup>
          </div>
        </Col>
        <Col className="col-lg-2">
          <Button className="btn-success mb-3 p-2">Add Knowledge</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>sasas</Col>
      </Row>
    </>
  );
}

export default Know;
