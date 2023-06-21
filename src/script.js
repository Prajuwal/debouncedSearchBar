/*
 * https://frontendeval.com/questions/debounce
 *
 * Implement a barebones debounce function
 */
const { useState, useEffect } = React;
  const debounce = (callback,interval)=>{
    let timerId;
    return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, interval);
  };
}
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dealyedFetchData();
  }, [searchInput]);
  
  

  
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  
 const fetchData = async () => {
   console.log('hi')
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const titles = data.map((item) => item.title);
  // console.log(data)
    //  const titles = data.title
   setSuggestions(titles);
 }
    const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchInput.toLowerCase())
  );
  const dealyedFetchData = debounce(fetchData,5000)
  return (
    <>
      <input type="text" value={searchInput} onChange={handleInputChange} />
     <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  return <SearchBar />;
};

ReactDOM.render(<App />, document.getElementById("app"));
