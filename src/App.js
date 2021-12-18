import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Searchbar from "./Components/Searchbar";
import Loader from "./Components/Loader";
import AlertFound from "./Components/AlertFound";
import ResultList from "./Components/ResultList";
import PreSearch from "./Components/Presearch";



function App() {
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [confirmed, setConfirmed] = useState(false)
  const [clicked, setClicked] = useState()

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
    let result = contacts.filter(contact => contact.firstName?.toLowerCase().indexOf(searchInput.toLowerCase()) > -1 || contact.lastName?.toLowerCase().indexOf(searchInput.toLowerCase()) > -1 || contact.profiles[0].email?.toLowerCase().indexOf(searchInput.toLowerCase()) > -1)
  
     if(result.length === 0){
         setNotFound(true)
     }

    //  filters out deleted contacts 
     result= result.filter(contact => contact.deleted === false)
     setSearchResults([...result]);
     setClicked(!clicked)
  };


  const removeOthers = (id)=>{
      // CHANGE USERS TO contacts
    let primaryUser = contacts.find(obj => obj.id === id)
    setSearchResults([primaryUser])
    setConfirmed(true)
 }

 useEffect(()=>{
    setConfirmed(false)
 }, [searchInput, clicked])

  return (
    <div className="App">
      <Header />
      <h1>Update Request For Personal Information</h1>
      <Searchbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <Loader loading={loading} />
      <AlertFound notFound={notFound} />
      { searchResults ? searchResults.map(result => <ResultList  result={result} removeOthers={removeOthers} confirmed={confirmed} />): <PreSearch/>}
    </div>
  );
}

export default App;


// const users = [
//   {
//     "id": "KUAKZYRX",
//     "firstName": "(gmail) Jenessa",
//     "lastName": "Peterson",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KX7Z6DFF",
//     "firstName": "6-12 Curriculum Dev Employees",
//     "lastName": "",
//     "type": "Group",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//B7/13/Circle_fff06292_54-67_v1.png",
//     "timezone": "Z",
//     "locale": "en",
//     "deleted": false,
//     "memberIds": [
//         "KUACHZUQ",
//         "KUAHECXB",
//         "KUACH2DQ",
//         "KUACHUKV",
//         "KUAEPOHQ",
//         "KUACHSTI",
//         "KUACCB5O"
//     ]
// },
// {
//     "id": "KX7Z6DE5",
//     "firstName": "Active Curriculum Dev Contractors",
//     "lastName": "",
//     "type": "Group",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//CC/8A/Circle_ff80deea_65-67_v1.png",
//     "timezone": "Z",
//     "locale": "en",
//     "deleted": false,
//     "memberIds": [
//         "KUAEQ4RJ",
//         "KUAFBSYH",
//         "KUAFBM6K",
//         "KUAJHIZZ",
//         "KUACHTJ6",
//         "KUACHTA4"
//     ]
// },
// {
//     "id": "KUAERAJJ",
//     "firstName": "Alexandra",
//     "lastName": "Clayton",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "email": "ajubb@illustrativemathematics.org",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//9E/85/QqKzRpkpUOJ2.png",
//     "timezone": "America/New_York",
//     "locale": "en",
//     "deleted": false,
//     "title": "ES Kindergarten Lead",
//     "companyName": "Illustrative Mathematics",
//     "phone": "+1 6097078628",
//     "location": "Morgantown, WV"
// },
// {
//     "id": "KUADF62F",
//     "firstName": "Alicia",
//     "lastName": "Chiasson",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUADTXZP",
//     "firstName": "Alissa",
//     "lastName": "Leamon",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KX74Q5AG",
//     "firstName": "Alt Text Team",
//     "lastName": "",
//     "type": "Group",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//32/45/Circle_ff00897b_65-84_v1.png",
//     "timezone": "Z",
//     "locale": "en",
//     "deleted": false,
//     "memberIds": [
//         "KUAEHFOW",
//         "KUACCB5O",
//         "KUAFGKRK",
//         "KUAEOFBC"
//     ]
// },
// {
//     "id": "KUAKZYTR",
//     "firstName": "Amy",
//     "lastName": "LeHew",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAKZYTQ",
//     "firstName": "Amy",
//     "lastName": "Weber-Salgo",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAKZYT2",
//     "firstName": "Andrea",
//     "lastName": "Kelly",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAKZYT7",
//     "firstName": "Andrew",
//     "lastName": "Gael",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAGVWJ2",
//     "firstName": "Angel",
//     "lastName": "Kuo",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAKZYT4",
//     "firstName": "Angela",
//     "lastName": "Harris",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAKZYTT",
//     "firstName": "Angela",
//     "lastName": "Leavitt",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUALBV3B",
//     "firstName": "Angela",
//     "lastName": "Sincere",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "email": "asincere@illustrativemathematics.org",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//F7/90/xnJd7XZ5DxvX.png",
//     "timezone": "America/New_York",
//     "locale": "en",
//     "deleted": false,
//     "title": "Marketing Manager"
// },
//   {
//     id: "KX7Z6DE5",
//     firstName: "Active Curriculum Dev Contractors",
//     lastName: "",
//     type: "Group",
//     profiles: [
//       {
//         accountId: "IEABAVGP",
//         role: "User",
//         external: false,
//         admin: false,
//         owner: false,
//       },
//     ],
//     avatarUrl:
//       "https://www.wrike.com/avatars//CC/8A/Circle_ff80deea_65-67_v1.png",
//     timezone: "Z",
//     locale: "en",
//     deleted: false,
//     memberIds: [
//       "KUAEQ4RJ",
//       "KUAFBSYH",
//       "KUAFBM6K",
//       "KUAJHIZZ",
//       "KUACHTJ6",
//       "KUACHTA4",
//     ],
//   },
//   {
//     "id": "KUAHDIPB",
//     "firstName": "Latrenda",
//     "lastName": "Knighten",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAHSE6A",
//     "firstName": "Lauren",
//     "lastName": "Baucom",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAH6OL3",
//     "firstName": "Lauren",
//     "lastName": "Giordano",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "email": "lgiordano@illustrativemathematics.org",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//5C/CB/dWjBc4FCy4SI.png",
//     "timezone": "US/Eastern",
//     "locale": "en",
//     "deleted": false,
//     "title": "Contractor/Facilitator"
// },
// {
//     "id": "KUAKZYQH",
//     "firstName": "Lauren",
//     "lastName": "Lamb",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// {
//     "id": "KUAK246E",
//     "firstName": "Leah",
//     "lastName": "Niu",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP",
//             "email": "lniu@illustrativemathematics.org",
//             "role": "User",
//             "external": false,
//             "admin": false,
//             "owner": false
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars//9E/8E/Box_ffafb42b_76-78_v1.png",
//     "timezone": "US/Mountain",
//     "locale": "en",
//     "deleted": false,
//     "title": "Director"
// },
//   {
//     "id": "KUAKZYTB",
//     "firstName": "Cynthia",
//     "lastName": "Santos",
//     "type": "Person",
//     "profiles": [
//         {
//             "accountId": "IEABAVGP"
//         }
//     ],
//     "avatarUrl": "https://www.wrike.com/avatars/default/deleted.png",
//     "timezone": "US/Pacific",
//     "locale": "en",
//     "deleted": true
// },
// ];
