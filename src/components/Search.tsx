import { SearchBox } from "@fluentui/react/lib/SearchBox";

interface ISearchProps {
  onSearch: (value: string | undefined) => void;
}

const Search = (props: ISearchProps) => {
  return (
    <SearchBox
      placeholder="Search"
      onChange={(elem, newValue) => props.onSearch(newValue)}
    />
  );
};

export default Search;
