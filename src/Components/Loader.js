import { Spinner } from "react-bootstrap";

const Loader = ({loading}) => {
    return (
        <div className='container'>
      {loading ? (
        <div className="row justify-content-center mt-5">
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      ) : (
        " "
      )}
      </div>
      );
}
 
export default Loader;