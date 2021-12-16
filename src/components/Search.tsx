import { SearchBox } from "@fluentui/react/lib/SearchBox";

const Search = () => {
  return (
    <SearchBox
      style={{ minWidth: 800 }}
      placeholder="Search"
      onSearch={(newValue) => console.log("value is " + newValue)}
    />
  );
};

export default Search;
