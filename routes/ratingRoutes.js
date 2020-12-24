const mongoose = require("mongoose");
const Movies = mongoose.model("movies");

module.exports = (app) => {
  app.get("/hey", (req, res) => {
    res.send("hey!!");
  });

  app.get("/api/movies", async (req, res) => {
    if (Object.keys(req.query).length === 0) {
      try {
        const moviesList = await Movies.find().select("movie_name");
        res.json(moviesList);
      } catch (error) {
        res.send(error);
      }
    } else {
      const movieName = req.query.movie_name;
      const movie = await Movies.find({ movie_name: movieName })
        .select("ratings")
        .select("ratings.user_rating ratings.user_comment ")
        .exec();

      res.send(movie);
    }
  });

  app.post("/api/movies", async (req, res) => {
    const movieName = req.body.movie_name;
    const existingMovie = await Movies.findOne({
      movie_name: req.body.movie_name,
    });

    if (existingMovie) {
      const users = existingMovie.ratings.map((rate) => {
        return rate.user;
      });
      console.log;
      if (users.indexOf(req.body.user) > -1) {
        console.log(users.indexOf(req.body.user));
        res.status(208).send("Not allowed!");
      } else {
        const newRating = {
          user: req.body.user,
          user_rating: req.body.user_rating,
          user_comment: req.body.user_comment,
        };
        existingMovie.ratings.push(newRating);
        try {
          const r1 = await existingMovie.save();
          res.json(r1);
        } catch (error) {
          res.send(error);
        }
      }
    } else {
      const newmovie = new Movies({
        movie_name: req.body.movie_name,
      });

      newmovie.ratings.push({
        user: req.body.user,
        user_rating: req.body.user_rating,
        user_comment: req.body.user_comment,
      });

      try {
        const m1 = await newmovie.save();
        res.json(m1);
      } catch (error) {
        res.send(error);
        console.log(error);
      }
    }
  });
};
