import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Chip } from "@material-ui/core";

function Genres({
  genres,
  setGenres,
  selecterGenres,
  setSelecterGenres,
  type,
  setpage,
}) {

    const handelAdd = (genre) => {
        setSelecterGenres([...selecterGenres, genre]);
        setGenres(genres.filter((el) => el.id !== genre.id));
        setpage(1);
      };
     
      const handelDelete = (select) => {
        setSelecterGenres(selecterGenres.filter((el) => el.id !== select.id));
        setGenres([...genres, select]);
        setpage(1);
      };
    
       
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=8ec65a9de686234cda5ca905a69e7c70&pagelanguage=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
  }, []);

 const genresData =
    genres &&
    genres.map((genre) => (
         <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="medium"
          onClick={() => handelAdd(genre)}
        />
     ));

  const selecterGenresData =
    selecterGenres &&
    selecterGenres.map((select) => (
      <div  style={{ padding: "6px 0" }}>
        <Chip
          style={{ margin: 2 }}
          label={select.name}
          key={select.id}
          clickable
          size="medium"
          onDelete={() => handelDelete(select)}
        />
      </div>
    ));

  return (
    <div style={{ marginBottom: "30px" }}>
      {selecterGenresData}
      {genresData}
    </div>
  );
}

export default Genres;
