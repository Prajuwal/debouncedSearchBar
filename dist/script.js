/*
 * https://frontendeval.com/questions/debounce
 *
 * Implement a barebones debounce function
 */
const { useState, useEffect } = React;
const debounce = (callback, interval) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, interval);
  };
};
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dealyedFetchData();
  }, [searchInput]);




  const handleInputChange = event => {
    setSearchInput(event.target.value);
  };

  const fetchData = async () => {
    console.log('hi');
    const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();
    const titles = data.map(item => item.title);
    // console.log(data)
    //  const titles = data.title
    setSuggestions(titles);
  };
  const filteredSuggestions = suggestions.filter((suggestion) =>
  suggestion.toLowerCase().includes(searchInput.toLowerCase()));

  const dealyedFetchData = debounce(fetchData, 5000);
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("input", { type: "text", value: searchInput, onChange: handleInputChange }), /*#__PURE__*/
    React.createElement("ul", null,
    filteredSuggestions.map((suggestion, index) => /*#__PURE__*/
    React.createElement("li", { key: index }, suggestion)))));




};

const App = () => {
  return /*#__PURE__*/React.createElement(SearchBar, null);
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));