import { Card, Button } from "react-bootstrap";
import ControlForm from "./ControlForm";

const ResultList = ({ result, removeOthers, confirmed }) => {
 
  return (
    <div className="container mt-5" key={result?.id}>
      <div className="row justify-content-center">
        <Card style={{ width: "50%", minWidth: "20rem" }}>
          <Card.Body>
            <Card.Title>
              <img
                className="card-image"
                src={result?.avatarUrl}
                alt={`${result?.firstName + " " + result?.lastName}`}
              />
              {result?.firstName + " " + result?.lastName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {result?.title}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Type: &nbsp; {result?.type} <br /> Location: &nbsp;{" "}
              {result?.location} <br />
              Time Zone: &nbsp;{result?.timezone}
            </Card.Subtitle>

            {confirmed ? (
              ""
            ) : (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={(e) => removeOthers(result?.id)}
              >
                Confirm This Is Me
              </Button>
            )}

            {confirmed ? <ControlForm result={result} /> : ""}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ResultList;
