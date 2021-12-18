const AlertFound = ({notFound}) => {
  return (
    <div>
      {notFound ? (
        <div className="alert alert-danger mt-5">
          No results have been found, please check for the correct spelling
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AlertFound;
