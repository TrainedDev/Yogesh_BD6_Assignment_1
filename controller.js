let shows = [
    { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
    { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
    { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
    { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' }
  ];


const getAllShows = async () => {
  return shows;
};


const getShowById = async (id) => {
  return shows.find(show => show.showId === Number(id)) || null;
};

const addNewShow =async (data) => {
 
const addingShow = { ...data , showId: shows.length + 1}
  
  const newShow = shows.push(addingShow);

  return newShow;
};

module.exports = {
  getAllShows,
  getShowById,
  addNewShow
};
