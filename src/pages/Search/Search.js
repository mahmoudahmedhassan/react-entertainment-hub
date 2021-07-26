import { React, useState, useEffect } from "react";
import "./search.css";
import SingleItem from "../../Compoents/SingleItem/SingleItem";
import SearchIcon from "@material-ui/icons/Search";
import { Container, Row, Col } from "react-bootstrap";
import CustomPagination from "../../Compoents/Pagination/CustomPagination";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [numberPage, setNumberPage] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=8ec65a9de686234cda5ca905a69e7c70&
    &language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setSearchData(data.results);
      setNumberPage(data.total_pages);
    } catch (error) {
      console.error(error);
    }
 
  };
  
  useEffect(() => {
     fetchSearch();
    }, [page, type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="part_search">
          <div className="text_field">
            <TextField
              style={{ width: "100%" }}
              id="filled-basic"
              label="Search"
              variant="filled"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>

          <div>
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ height: "57px", marginLeft: "10px" }}
              className="search_btn"
            >
              <SearchIcon primary />
            </Button>
          </div>
        </div>

        <div className="tabs">
          <Tabs
            className="Tabs"
            value={type}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, newValue) => {
              setType(newValue);
            }}
          >
            <Tab
              className="tap_tap"
              style={{ width: "50%", color: "#fff", fontSize: "20px" }}
              label="Search Movies"
            />
            <Tab
              className="tap_2"
              style={{ width: "50%", color: "#fff", fontSize: "20px" }}
              label="Search TV Series"
            />
         
          </Tabs>
        </div>
      </ThemeProvider>

      <div>
        <Container fluid>
          <Row>
            {searchData.map((el) => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <SingleItem
                  key={el.id}
                  title={el.title || el.name}
                  poster={el.poster_path}
                  vote={el.vote_average || el.first_air_date}
                  data={el.release_date}
                  move_type={type ? "tv" : "movies"}
                />
               </Col>
            ))}
 
          </Row>
        </Container>
           {numberPage > 1 && (<CustomPagination setPage={setPage} numberPage={numberPage}/>)} 
           {/* <CustomPagination setPage={setPage} numberPage={numberPage}/> */}
       </div>
    </div>
  );
};
export default Search;
 