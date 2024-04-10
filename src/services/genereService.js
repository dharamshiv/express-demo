const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

getGenres = async () => {
  return genres;
};

getGenre = async (id) => {
  const genre = genres.find((c) => c.id === id);
  if (!genre) {
    throw new Error("The Genre with givem id was not found");
  }
  return genre;
};

addGenre = async (name) => {
  const genre = {
    id: genres.length + 1,
    name: name,
  };
  genres.push(genre);
  return genre;
};

updateGenre = async (id, name) => {
  const genre = genres.find((c) => c.id === id);
  if (!genre) {
    throw new Error("The Genre with givem id was not found");
  }
  genre.name = name;
  return genre;
};

deleteGenre = async (id) => {
  const genre = genres.find((c) => c.id === id);
  if (!genre) {
    throw new Error("The Genre with givem id was not found");
  }
  const index = genres.findIndex((c) => c.id === id);
  genres.splice(index, 1);
  return genre;
};

module.exports = {
  getGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre
}
