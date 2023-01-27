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
    <div>
      {characters.map(character => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <Link to={`/character/${character.id}`}>
            <img src={character.image} alt={character.name} />
          </Link>
          <p>Statut : {character.status}</p>
          <p>Emplacement : {character.location.name}</p>
        </div>
      ))}
    </div>
  );
}


export default App;
