import React from "react";
import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyComponent from "./view/knowledge/know";
import { Container } from "react-bootstrap";

function App(): JSX.Element {
  return (
    <div>
      <Container>
        <MyComponent></MyComponent>
      </Container>
    </div>
  );
}

export default App;
