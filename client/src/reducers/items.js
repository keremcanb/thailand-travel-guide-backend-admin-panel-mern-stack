export const songsReducer = () => {
  function onSearch(e) {
    setSearch(e.target.value);
  }

  const filterSearch = items.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
};
