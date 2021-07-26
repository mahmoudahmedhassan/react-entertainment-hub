import React from "react";

// import pagintion and dark theme from material
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// import file styleing
import './customPagination.css'

export default function CustomPagination({ setPage , numberPage= 10 }) {
  
const darkTheme = createMuiTheme({
  palette: {
    type:'dark'
   },
});
 
  const handleChange = (e) => {
    setPage(e.target.textContent);
    window.scroll(0, 0);
  };

  return (
    <div className='pagination'>
      <ThemeProvider theme={darkTheme}>
        <Pagination
           count={numberPage}
           color="primary"
           onChange={handleChange}
           hideNextButton
           hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
}
