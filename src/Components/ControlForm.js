import { useState, useEffect } from "react";
import { Accordion, Button, InputGroup, Form } from "react-bootstrap";

const ControlForm = ({ result }) => {

    return (
    <>
      <h6 className="mt-3">Select the type of changes being made</h6>
      <div className="d-flex justify-content-around mb-5">
        <Form.Check
          inline
          type="radio"
          name="typeof"
          label="Permanent Changes"
          className="pr-3"
          value="Permanent"
          defaultChecked
        />

        <Form.Check
          inline
          type="radio"
          name="typeof"
          label="Temporary Changes"
          className="pl-3"
          value="Temporary"
        />
      </div>
      <h6>Select the type of asset you are</h6>
      <div className="d-flex justify-content-around">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Contractor" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Facilitator" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Employee" />
        </Form.Group>
      </div>
      <Accordion className="mt-5">
        <Accordion.Item eventKey="1">
          {/* PHONE NUMBER  */}
          <Accordion.Header>Change Phone Number</Accordion.Header>
          <Accordion.Body>Current Phone Number: {result?.phone}</Accordion.Body>
          <Accordion.Body>
            Enter new phone number: &nbsp;
            <InputGroup>
              <input type="text" style={{ width: "16rem" }} />
              <Button size="sm" variant="outline-success">
                Submit Change
              </Button>
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          {/* CHANGE NAME  */}
          <Accordion.Header>Change Name</Accordion.Header>
          <Accordion.Body>
            Current Name: {result?.firstName + " " + result?.lastName}
          </Accordion.Body>
          <Accordion.Body>
            Enter new Name: &nbsp;
            <InputGroup>
              <input type="text" style={{ width: "18rem" }} />
              <Button size="sm" variant="outline-success">
                Submit Change
              </Button>
            </InputGroup>
            <Form.Group controlId="formFile" className="mt-3">
              <Form.Label>
                Upload your{" "}
                <a href="/files/fw9.pdf" download>
                  W9 form
                </a>{" "}
                if you are a facilitator or contractor
              </Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          {/* CHANGE EMAIL  */}
          <Accordion.Header>Change Email</Accordion.Header>
          <Accordion.Body>
            Current Email: {result?.profiles[0].email}
          </Accordion.Body>
          <Accordion.Body>
            Enter new email: &nbsp;
            <InputGroup>
              <input
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                style={{ width: "20rem" }}
              />
              <Button size="sm" variant="outline-success">
                Submit Change
              </Button>
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          {/* CHANGE ADDRESS  */}
          <Accordion.Header>Change Address</Accordion.Header>
          <Accordion.Body>
            Enter new address: &nbsp; <br />
            <input
              type="text"
              placeholder="Street"
              style={{ width: "20rem" }}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="City"
              className="mt-3"
              style={{ width: "20rem" }}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="State"
              className="mt-3"
              style={{ width: "16rem" }}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Zip Code"
              className="mt-3"
              style={{ width: "16rem" }}
            />{" "}
            <br />
            <br />
            For international address, please see 'Change Other'
            <Button
              size="sm"
              variant="outline-success"
              className="mt-3"
              style={{ width: "16rem" }}
            >
              Submit Change
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          {/* CHANGE OTHER  */}
          <Accordion.Header>Change Other</Accordion.Header>
          <Accordion.Body>What would you like to change? &nbsp;</Accordion.Body>
          <Accordion.Body>
            <input type="text" placeholder="Other field" className="mb-3"  style={{ width: "20rem" }}/>{" "}
            <br />
            <input type="text" placeholder="International Address"  style={{ width: "20rem" }} /> <br />
            <Button size="sm" variant="outline-success" className="mt-3">
              Submit Change
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ControlForm;
