import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Showknowledge from "./view/showknowledge/showknowledge";

function App(): JSX.Element {
  return (
    <div>
      <Container>
  
          <Showknowledge></Showknowledge>
      </Container>
    </div>
  );
}

export default App;
