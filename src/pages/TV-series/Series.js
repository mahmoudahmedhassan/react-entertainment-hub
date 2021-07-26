import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleItem from "../../Compoents/SingleItem/SingleItem";
import { Container, Row, Col } from "react-bootstrap";
import CustomPagination from "../../Compoents/Pagination/CustomPagination";
import Genres from "../../Compoents/genres/Genres";

function Series() {
  const [movieData, setMoviesData] = useState([]);
  const [page, setPage] = useState();
  const [numberPage, setNumberPage] = useState();
  // const [genres, setGenres] = useState();
  // const [selecterGenres, setSelecterGenres] = useState();

  //   const genreforURL = useGenre(selecterGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=8ec65a9de686234cda5ca905a69e7c70&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setMoviesData(data.results);
    setNumberPage(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div>
      <h3 className="discover_movies"> DISCOVER SERIES </h3>
      {/* <Genres
        genres={genres}
        setGenres={setGenres}
        selecterGenres={selecterGenres}
        setSelecterGenres={setSelecterGenres}
        type="movie"
        setPage={setPage}
      /> */}

      <div>
        {movieData.length < 1 ? (
          <div className="loading">loading...</div>
        ) : (
          <Container fluid>
            <Row>
              {movieData.map((el) => (
                <Col xs={12} sm={6} md={4} lg={3}>
                  <SingleItem
                    key={el.id}
                    id={el.id}
                    title={el.title || el.name}
                    poster={el.poster_path}
                    vote={el.vote_average}
                    data={el.first_air_date || el.release_date}
                    move_type="tv"
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}

        <CustomPagination setPage={setPage} numberPage={numberPage} />
      </div>
    </div>
  );
}
export default Series;
