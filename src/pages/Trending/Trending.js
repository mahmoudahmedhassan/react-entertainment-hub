import { React, useEffect, useState } from "react";

// import Axios
import axios from "axios";

// import Compoents
import SingleItem from "../../Compoents/SingleItem/SingleItem";
import CustomPagination from "../../Compoents/Pagination/CustomPagination";

// import responsive from react bootstrap
import { Container, Row, Col } from "react-bootstrap";

// import file css
import "./Trending.css";

function Trending() {
  const [trendingData, setTrendingData] = useState();
  const [page, setPage] = useState(1);

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/trending/all/day?api_key=8ec65a9de686234cda5ca905a69e7c70`
  //       )
  //       .then((res) => {
  //         setMoviesData(res.data);
  //       })
  //       .catch(error => {console.log(error)});
  //   }, []);

  // fetch data

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=8ec65a9de686234cda5ca905a69e7c70&page=${page}`
    );
    setTrendingData(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <div>
        <h1 className="trending_today">TRENDING TODAY</h1>
           <Container fluid>
            <Row>
              {trendingData &&
                trendingData.map((el) => (
                  <Col xs={12} sm={6} md={4} lg={3}>
                    
                    <SingleItem
                      key={el.id}
                      id={el.id}
                      title={el.title || el.name}
                      poster={el.poster_path}
                      vote={el.vote_average}
                      data={el.release_date}
                      move_type={el.media_type}
                    />
                  </Col>
                ))}
            </Row>
          </Container>
       </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
