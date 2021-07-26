const useGenre = ({selecterGenres}) => {
    if (selecterGenres.length < 1) return "";
    console.log(selecterGenres)

    const GenreIds = selecterGenres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);

  };
  export default useGenre;