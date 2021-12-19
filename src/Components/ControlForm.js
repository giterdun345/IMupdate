import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Button, InputGroup, Form } from "react-bootstrap";
import { addThreeDays, todaysDate } from "./utilityFunctions";

const ControlForm = ({ result }) => {
  const [file, setFile] = useState();

  const [typeOfChange, setTypeOfChange] = useState({
    typeOfChange: "Permanent",
    typeOfWork: "",
  });

  const [phoneChange, setPhoneChange] = useState({
    title: result.firstName + " " + result.lastName,
    newPhoneNumber: "",
  });

  const [nameChange, setNameChange] = useState({
    title: result.firstName + " " + result.lastName,
    currrentName: result.firstName + " " + result.lastName,
    newName: "",
  });

  const [emailChange, setEmailChange] = useState({
    title: result.firstName + " " + result.lastName,
    newEmail: "",
  });

  const [addressChange, setAddressChange] = useState({
    title: result.firstName + " " + result.lastName,
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  });

  const navigate = useNavigate();
  const responsibleId = "KUAK3ZXF";
  const threeDaysLater = addThreeDays(todaysDate);

  const handlePhoneChange = () => {
    let contactEmail = prompt(
      `Please enter an email address to confirm your change and in case we need to contact you regarding this change.`
    );

    let description = `${typeOfChange.typeOfChange} changes for ${typeOfChange.typeOfWork}; changes phone number to ${phoneChange.newPhoneNumber} ; can be reached at ${contactEmail}`;

    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_WRIKE_API_TOKEN}`
    );
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://www.wrike.com/api/v4/folders/IEABAVGPI4YG6G4E/tasks?title=${nameChange.title}
       &description=${description}
       &dates={\"due\":${threeDaysLater}}
       &responsibles=[${responsibleId}]
       &customFields=[{ \"id\": \"IEABAVGPJUAA56AT\",\"value\": \"${phoneChange.newPhoneNumber}\"},{ \"id\": \"IEABAVGPJUABOW5Q\",\"value\": \"${typeOfChange.typeOfChange}\"},{\"id\": \"IEABAVGPJUABOW5P\",\"value\": \"Phone Number\"}]
       &customStatus=IEABAVGPJMAAAAAA`,
      requestOptions
    ).catch((error) => console.log("error", error));

    navigate(`/completed-update`);
  };

  const handleNameChange = () => {
    let contactEmail = prompt(
      `Please enter an email address to confirm your change and in case we need to contact you regarding this change.`
    );

    let description = `${typeOfChange.typeOfChange} changes for ${typeOfChange.typeOfWork}; changes name ${nameChange.currrentName} to ${nameChange.newName}; can be reached at ${contactEmail}`;

    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_WRIKE_API_TOKEN}`
    );
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://www.wrike.com/api/v4/folders/IEABAVGPI4YG6G3T/tasks?title=${nameChange.title}
       &description=${description}
       &dates={\"due\":${threeDaysLater}}
       &responsibles=[${responsibleId}]
       &customFields=[{ \"id\": \"IEABAVGPJUABOW5Q\",\"value\": \"${phoneChange.newPhoneNumber}\"},{\"id\": \"IEABAVGPJUABOW5P\",\"value\": \"Name\"}]
       &customStatus=IEABAVGPJMAAAAAA`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!file) {
          return "Completed";
        } else {
          let attachmentHeaders = new Headers();
          attachmentHeaders.append(
            "Authorization",
            `Bearer ${process.env.REACT_APP_WRIKE_API_TOKEN}`
          );
          attachmentHeaders.append("Content-Type", "application/octet-stream");
          attachmentHeaders.append("X-Requested-With", "XMLHttpRequest");
          attachmentHeaders.append("X-File-Name", `${file.name}`);
          let attachmentOptions = {
            method: "POST",
            headers: attachmentHeaders,
            redirect: "follow",
            body: file,
          };
          fetch(
            `https://www.wrike.com/api/v4/tasks/${result.data[0].id}/attachments`,
            attachmentOptions
          )
            // .then((response) => response.text())
            // .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }
      })
      .catch((error) => console.log("error", error));
    navigate(`/completed-update`);
  };

  const handleEmailChange = () => {
    let contactEmail = prompt(
      `Please enter the same email address to confirm your change and in case we need to contact you regarding this change.`
    );

    let description = `${typeOfChange.typeOfChange} changes for ${typeOfChange.typeOfWork}; changes email address to ${emailChange.newEmail} ; can be reached at ${contactEmail}`;

    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_WRIKE_API_TOKEN}`
    );
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://www.wrike.com/api/v4/folders/IEABAVGPI4YG6G3F/tasks?title=${nameChange.title}
       &description=${description}
       &dates={\"due\":${threeDaysLater}}
       &responsibles=[${responsibleId}]
       &customFields=[{ \"id\": \"IEABAVGPJUAAZL5N\",\"value\": \"${emailChange.newEmail}\"},{ \"id\": \"IEABAVGPJUABOW5Q\",\"value\": \"${typeOfChange.typeOfChange}\"},{\"id\": \"IEABAVGPJUABOW5P\",\"value\": \"Email Address\"}]
       &customStatus=IEABAVGPJMAAAAAA`,
      requestOptions
    ).catch((error) => console.log("error", error));
    navigate(`/completed-update`);
  };

  const handleAddressChange = () => {
    let contactEmail = prompt(
      `Please enter the same email address to confirm your change and in case we need to contact you regarding this change.`
    );

    let description = `${typeOfChange.typeOfChange} changes for ${typeOfChange.typeOfWork}; changes address to ${addressChange.streetAddress}; ${addressChange.city}, ${addressChange.state}, ${addressChange.zip} can be reached at ${contactEmail}.`;

    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_WRIKE_API_TOKEN}`
    );
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://www.wrike.com/api/v4/folders/IEABAVGPI4YG6G27/tasks?title=${nameChange.title}
       &description=${description}
       &dates={\"due\":${threeDaysLater}}
       &responsibles=[${responsibleId}]
       &customFields=[
         { \"id\": \"IEABAVGPJUAA56PR\",\"value\": \"${addressChange.streetAddress}\"},
         { \"id\": \"IEABAVGPJUAAYT4Z\",\"value\": \"${addressChange.city}\"},
         { \"id\": \"IEABAVGPJUAAYT42\",\"value\": \"${addressChange.state}\"},
         { \"id\": \"IEABAVGPJUABM4CE\",\"value\": \"${addressChange.zip}\"},
         { \"id\": \"IEABAVGPJUABOW5Q\",\"value\": \"${typeOfChange.typeOfChange}\"},
         {\"id\": \"IEABAVGPJUABOW5P\",\"value\": \"Address\"}
        ]
       &customStatus=IEABAVGPJMAAAAAA`,
      requestOptions
    ).catch((error) => console.log("error", error));
    navigate(`/completed-update`);
  };

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
          onChange={(e) =>
            setTypeOfChange({ ...typeOfChange, typeOfChange: "Temporary" })
          }
        />
      </div>
      <h6>Select the type of asset you are</h6>
      <div className="d-flex justify-content-around">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Contractor"
            onChange={(e) =>
              setTypeOfChange({
                ...typeOfChange,
                typeOfWork: [...typeOfChange.typeOfWork, "Contractor"],
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Facilitator"
            onChange={(e) =>
              setTypeOfChange({
                ...typeOfChange,
                typeOfWork: [...typeOfChange.typeOfWork, "Facilitator"],
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Employee"
            onChange={(e) =>
              setTypeOfChange({
                ...typeOfChange,
                typeOfWork: [...typeOfChange.typeOfWork, "Employee"],
              })
            }
          />
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
              <input
                type="text"
                style={{ width: "16rem" }}
                onChange={(e) =>
                  setPhoneChange({
                    ...phoneChange,
                    newPhoneNumber: e.target.value,
                  })
                }
              />
              <Button
                size="sm"
                variant="outline-success"
                onClick={handlePhoneChange}
              >
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
              <input
                type="text"
                style={{ width: "18rem" }}
                onChange={(e) =>
                  setNameChange({ ...nameChange, newName: e.target.value })
                }
              />
              <Button
                size="sm"
                variant="outline-success"
                onClick={handleNameChange}
              >
                Submit Change
              </Button>
            </InputGroup>
            <Form.Group
              controlId="formFile"
              className="mt-3"
              onChange={(e) => setFile(e.target.files[0])}
            >
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
                onChange={(e) =>
                  setEmailChange({ ...emailChange, newEmail: e.target.value })
                }
              />
              <Button
                size="sm"
                variant="outline-success"
                onClick={handleEmailChange}
              >
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
              className="ml-2"
              type="text"
              placeholder="Street"
              style={{ width: "20rem" }}
              onChange={(e) =>
                setAddressChange({
                  ...addressChange,
                  streetAddress: e.target.value,
                })
              }
            />{" "}
            <br />
            <input
              className="ml-2"
              type="text"
              placeholder="City"
              style={{ width: "20rem" }}
              onChange={(e) =>
                setAddressChange({ ...addressChange, city: e.target.value })
              }
            />{" "}
            <br />
            <input
              className="ml-2"
              type="text"
              placeholder="State"
              style={{ width: "16rem" }}
              onChange={(e) =>
                setAddressChange({ ...addressChange, state: e.target.value })
              }
            />{" "}
            <br />
            <input
              className="ml-2"
              type="text"
              placeholder="Zip Code"
              style={{ width: "16rem" }}
              onChange={(e) =>
                setAddressChange({ ...addressChange, zip: e.target.value })
              }
            />{" "}
            <br />
            <Button
              size="sm"
              variant="outline-success"
              className="mt-3"
              style={{ width: "16rem" }}
              onClick={handleAddressChange}
            >
              Submit Change
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="5"> */}
        {/* CHANGE OTHER  */}
        {/* <Accordion.Header>Change Other</Accordion.Header>
          <Accordion.Body>What would you like to change? &nbsp;</Accordion.Body>
          <Accordion.Body>
            <input
              type="text"
              placeholder="Other field"
              className="mb-3"
              style={{ width: "20rem" }}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="International Address"
              style={{ width: "20rem" }}
            />{" "}
            <br />
            <Button size="sm" variant="outline-success" className="mt-3">
              Submit Change
            </Button>
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </>
  );
};

export default ControlForm;
