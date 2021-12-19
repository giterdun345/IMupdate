import { useState, useEffect } from "react";
import Header from "./Header";
import Searchbar from "./Searchbar";

import Loader from "./Loader";
import AlertFound from "./AlertFound";
import ResultList from "./ResultList";
import PreSearch from "./Presearch";

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [clicked, setClicked] = useState();

  const getContacts = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_WRIKE_API_TOKEN}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://www.wrike.com/api/v4/contacts", requestOptions)
      .then((response) => response.text())
      .then((result) => setContacts(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
    setLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // CHANGE USERS TO contacts
    let result = contacts.filter(
      (contact) =>
        contact.firstName?.toLowerCase().indexOf(searchInput.toLowerCase()) >
          -1 ||
        contact.lastName?.toLowerCase().indexOf(searchInput.toLowerCase()) >
          -1 ||
        contact.profiles[0].email
          ?.toLowerCase()
          .indexOf(searchInput.toLowerCase()) > -1
    );

    if (result.length === 0) {
      setNotFound(true);
    }

    //  filters out deleted contacts
    result = result.filter((contact) => contact.deleted === false);
    setSearchResults([...result]);
    setClicked(!clicked);
  };

  const removeOthers = (id) => {
    // CHANGE USERS TO contacts
    let primaryUser = contacts.find((obj) => obj.id === id);
    setSearchResults([primaryUser]);
    setConfirmed(true);
  };

  useEffect(() => {
    setConfirmed(false);
  }, [searchInput, clicked]);

  return (
    <>
      <Header />
      <h1>Update Request For Personal Information</h1>
      <Searchbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <Loader loading={loading} />
      <AlertFound notFound={notFound} />
      {searchResults ? (
        searchResults.map((result) => (
          <ResultList
            result={result}
            removeOthers={removeOthers}
            confirmed={confirmed}
          />
        ))
      ) : (
        <PreSearch />
      )}
    </>
  );
};

export default Main;
