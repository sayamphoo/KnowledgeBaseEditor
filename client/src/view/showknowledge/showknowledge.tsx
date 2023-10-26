import "./showknowledge.css";
import { Condition, Knowledge } from "../model/model";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

function ShowKnowledge(): JSX.Element {
  interface ModalState {
    show: boolean;
    selectedIndex: number;
  }

  const [knowledgeData, setKnowledgeData] = useState<Knowledge[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    selectedIndex: 0,
  });
  const [searchValue, setSearchValue] = useState("");
  const [filteredKnowledgeData, setFilteredKnowledgeData] = useState<
    Knowledge[]
  >([]);

  const closeModal = () => {
     setModalState({ show: false, selectedIndex: modalState.selectedIndex });
  }
   

  const handleShow = (index: number) =>
    setModalState({ show: true, selectedIndex: index });

  useEffect(() => {
    (async () => {
      try {
        const response: AxiosResponse = await axios.get(
          "http://10.32.99.194:5000/"
        );
        console.log(response.data);
        setKnowledgeData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchValue(searchText);

    if (searchText.trim() === "") {
      setFilteredKnowledgeData([]);
    } else {
      const filteredData = knowledgeData.filter((knowledge) =>
        knowledge.NameRule.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredKnowledgeData(filteredData);
    }
  };

  function renderKnowledgeList(): JSX.Element[] {
    const dataToRender =
      searchValue.trim() !== "" ? filteredKnowledgeData : knowledgeData;

    return dataToRender.map((knowledge, index) => (
      <ListGroup.Item
        key={index}
        onClick={() => handleShow(index)}
        className="text-left"
        action
      >
        {knowledge.NameRule}
      </ListGroup.Item>
    ));
  }

  function addKnowledge() {
    const conditions: Condition[] = [];

    for (let i = 1; i <= 5; i++) {
      conditions.push({
        Id: i,
        Symptom: "",
        Description: "",
      });
    }
    const knowledge: Knowledge = {
      Id: Math.random(),
      NameRule: "",
      Conditions: conditions, // ใช้อาร์เรย์ของ Conditions ที่สร้างขึ้นข้างต้น
    };
    setKnowledgeData((prevKnowledgeData) => [...prevKnowledgeData, knowledge]);
    handleShow(knowledgeData.length);
  }

  function renderConditions(): JSX.Element[] {
    if (
      !knowledgeData ||
      !knowledgeData[modalState.selectedIndex] ||
      !knowledgeData[modalState.selectedIndex].Conditions
    ) {
      return [];
    }

    return knowledgeData[modalState.selectedIndex].Conditions.map(
      (condition, index) => (
        <Container key={index}>
          <Row className="mt-3">
            <Col>
              <input
                className="input-rule mt-1"
                value={
                  knowledgeData[modalState.selectedIndex].Conditions[index]
                    .Symptom
                }
                onChange={(event) => {
                  const newValue = event.target.value;
                  setKnowledgeData((prevKnowledgeData) => {
                    const updatedData = [...prevKnowledgeData];
                    updatedData[modalState.selectedIndex].Conditions[
                      index
                    ].Symptom = newValue;
                    return updatedData;
                  });
                }}
                name="myInput"
                placeholder="IF OR THEN"
              />
            </Col>
            <Col className="col-auto">{"==>"}</Col>
            <Col>
              <input
                className="input-rule mt-1"
                value={
                  knowledgeData[modalState.selectedIndex].Conditions[index]
                    .Description
                }
                onChange={(event) => {
                  const newValue = event.target.value;
                  setKnowledgeData((prevKnowledgeData) => {
                    const updatedData = [...prevKnowledgeData];
                    updatedData[modalState.selectedIndex].Conditions[
                      index
                    ].Description = newValue;
                    return updatedData;
                  });
                }}
                name="myInput"
                placeholder="Description"
              />
            </Col>
          </Row>
        </Container>
      )
    );
  }

  async function deleteKnow() {
    closeModal();
    const newData = [...knowledgeData];
    const selectedIndex = modalState.selectedIndex; 
    newData.splice(selectedIndex, 1);

    setKnowledgeData(newData);
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
    setModalState({ show: false, selectedIndex: newIndex });
    
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(newData)
    axios.put("http://10.32.99.194:5000/save",newData)
  }
  
   function SaveData() {
    const data = [...knowledgeData]
    axios.put("http://10.32.99.194:5000/save",data)
  }

  return (
    <>
      <div className="mt-5">
        <input
          type="text"
          className="form-control mw-75"
          id="search-input"
          placeholder="Search for Knowledge"
          value={searchValue}
          onChange={handleSearch}
        />
        <ListGroup className="mt-5 mb-5">{renderKnowledgeList()}</ListGroup>

        <Modal
          show={modalState.show}
          backdrop="static"
          keyboard={false}
          onHide={closeModal}
        >
          <div className="p-4">
            <input
              className="input-header mt-3 mb-3 "
              value={knowledgeData[modalState?.selectedIndex]?.NameRule} // ใช้ค่าจาก state
              onChange={(event) => {
                const newValue = event.target.value;
                setKnowledgeData((prevKnowledgeData) => {
                  const updatedData = [...prevKnowledgeData];
                  updatedData[modalState.selectedIndex].NameRule = newValue;
                  return updatedData;
                });
              }}
              name="myInput"
              placeholder="New Knowledge"
            />

            {renderConditions()}
          </div>

          <Modal.Footer className="m-f">
            <Button variant="danger" onClick={deleteKnow}>
              Delete
            </Button>
            <Button variant="primary" onClick={() => {
              closeModal()
              SaveData()
            }}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="footer pt-3 pb-3">
          <Container>
            <button
              onClick={() => addKnowledge()}
              type="button"
              className="btn btn-success"
            >
              Add Knowledge
            </button>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ShowKnowledge;
