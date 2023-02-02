import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Episode from "../../pages/Episode";

const CardDetails = () => {
  let { id } = useParams();

  let [fetchedData, updateFetchedData] = useState([]);
  let { name, location, origin, gender, image, status, species } = fetchedData;
  // let [info, setInfo] = useState([]);
  // let { air_date, episode } = info;
  let api = `https://rickandmortyapi.com/api/character/${id}`;
  // let api1 = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    (async function () {
      // let data1 = await fetch(api).then((res) => res.json());
      // setInfo(data1);
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="d-flex flex-column gap-3">
        <h1 className="text-center">{name}</h1>

        <img className="img-fluid" src={image} alt="" />
        {(() => {
          if (status === "Dead") {
            return <div className="badge bg-danger fs-5">{status}</div>;
          } else if (status === "Alive") {
            return <div className=" badge bg-success fs-5">{status}</div>;
          } else {
            return <div className="badge bg-secondary fs-5">{status}</div>;
          }
        })()}
        <div className="content">
          <div className="">
            <span className="fw-bold">Gender : </span>
            {gender}
          </div>
          <div className="">
            <span className="fw-bold">Location: </span>
            {location?.name}
          </div>
          <div className="">
            <span className="fw-bold">Origin: </span>
            {origin?.name}
          </div>
          <div className="">
            <span className="fw-bold">Species: </span>
            {species}
          </div>
        </div>
        {/* <h2 className="text-center mt-5">Episode Details</h2>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Code</th>
              <th>Nom</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{episode === "" ? "Unknown" : episode}</td>
                <td> {air_date === "" ? "Unknown" : air_date}</td>
              </tr>
          </tbody>
        </table> */}
        
      </div>
    </div>
  );
};

export default CardDetails;
