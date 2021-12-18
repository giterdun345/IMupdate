const Searchbar = ({ searchInput, setSearchInput, handleSearch }) => {
  return (
    <div className="container">
      <br />
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <form className="card card-sm" onSubmit={handleSearch}>
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <svg width="1rem" height="1rem">
                  <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                </svg>{" "}
              </div>
              <div className="col">
                <input
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="form-control form-control-lg form-control-borderless"
                  type="text"
                  placeholder="Search by using email or name"
                  aria-label="Searching with email or name"
                  aria-describedby="basic-addon2"
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-lg btn-outline-success"
                  type="submit"
                  style={{ color: "#50ae3a" }}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
