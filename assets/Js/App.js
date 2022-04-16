import React from "react";
import Row from "./Row";
import requests from "./requests";
import Nav from "./Nav";
import Banner from "./Banner";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORGINALS"
        fetchUrl={requests.fetchNetflixOrginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchTActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchTComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchTHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchTRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchTDocumentaries} />
    </div>
  );
}

export default App;
