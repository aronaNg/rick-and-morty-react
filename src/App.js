import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Search from "./components/search/Search";
import Card from "./components/card/Card";
import Pagination from "./components/pagination/Pagination";
import Navbar from "./components/navbar/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./pages/Episode";
import Location from "./pages/Location";
import CardDetails from "./components/card/CardDetails";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CardDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}

// const Home = () => {
//   let [pageNumber, updatePageNumber] = useState(1);
//   let [status, updateStatus] = useState("");
//   let [gender, updateGender] = useState("");
//   let [species, updateSpecies] = useState("");
//   let [fetchedData, updateFetchedData] = useState([]);
//   let [search, setSearch] = useState("");
//   let { info, results } = fetchedData;

//   let api = `https://rickandmortyapi.com/api/character`;

//   useEffect(() => {
//     (async function () {
//       let data = await fetch(api).then((res) => res.json());
//       updateFetchedData(data);
//     })();
//   }, [api]);

//   let randomCharacters = results
//   .sort(() => 0.5 - Math.random())
//   .slice(0, 5);
//   return (
//     <div className="App">
//       <h1 className="text-center mb-3">Personnages</h1>
//       <div className="container">
//             <div className="row">
//                 <Card page="/" results={randomCharacters} />
//             </div>
//       </div>
//       {/* <Pagination
//         info={info}
//         pageNumber={pageNumber}
//         updatePageNumber={updatePageNumber}
//       /> */}
//     </div>
//   );
// };

function Home() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(response => {
        const randomCharacters = response.data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setCharacters(randomCharacters);
      })
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-3">Personnages</h1>
      <div className="row">
      {characters.map(character => (
        <div key={character.id} className="col-sm-4">
          <div className="card">
            <Link to={`/character/${character.id}`}>
              <img src={character.image} className="card-img-top" alt={character.name} />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">Statut : {character.status}</p>
                <p className="card-text">Emplacement : {character.location.name}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}


export default App;
