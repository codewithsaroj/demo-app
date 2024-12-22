import Button from "@mui/material/Button";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const Search = ({ setSearchQuery, handlePrint }) => {
  const [selectedValue, setSelectedValue] = useState("barCodeNumber");
  const [inputText, setInputText] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery({
      searchField: selectedValue,
      searchQuery: inputText,
    });
  };

  const clearSearch = () => {
    setSearchQuery({
      searchField: "",
      searchQuery: "",
    });
    // setSelectedValue("");
    setInputText("");
  };


  
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: "740px", // Adjusting the width of the container
            margin: "8px auto", // Centering the div horizontally
            display: "flex",
            flexDirection: "row", // Ensuring items are arranged in a row

            alignItems: "center", // Aligns items vertically in the center
          }}
        >
          {/* Select Dropdown */}
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="select-label">Select Option</InputLabel>
            <Select
              labelId="select-label"
              value={selectedValue}
              onChange={handleChange}
              label="Select Option"
            >
              <MenuItem value="barCodeNumber">Bar Code</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </Select>
          </FormControl>

          {/* Input Field for Typing */}
          <TextField
            label="Search"
            variant="outlined"
            aria-level={true}
            value={inputText}
            onChange={handleTextChange}
            style={{ marginLeft: "20px", width: "300px" }}
          />

          {/* Search Button */}
          <div className="button" style={{ marginLeft: "20px" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button variant="contained" color="error" onClick={clearSearch}>
                Clear
              </Button>

              {/* <Button variant="contained" color="primary" onClick={handlePrint}>
                Print
              </Button> */}
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Search;
