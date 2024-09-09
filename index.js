const express = require("express");
const { getAllShows, getShowById, addNewShow } = require("./controller");
const app = express();

app.use(express.json());

app.get("/shows", async (req, res) => {
    const data = await getAllShows();
    if (!data) return res.send("Not Found");
    res.status(200).json(data);
  });
  
  app.get("/shows/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getShowById(id);
    if (!data || data.length === 0) return res.status(404).json("Not Found");
    res.status(200).json(data);
  });

  const validshow = (show) => {
     if( !show || typeof show.title !== 'string') return 'Provide title and should be string'
     if( !show || typeof show.theatreId !== 'number')  return 'Provide theaterId and should be integer'
     if( !show || typeof show.time !== 'string')  return 'Provide time and should be string'

     return null;
  }
  
  app.post("/shows", async (req, res) => {
    const newAuthor = req.body;
    const error = validshow(newAuthor);

    if(error) return error;

    const data = await addNewShow(newAuthor);
    if (!data) return res.json("Not Found");
    res.status(200).json(data);
  });

  app.get("/", (req, res) => res.send("Server Is Live"));

  module.exports = { app, validshow };
  