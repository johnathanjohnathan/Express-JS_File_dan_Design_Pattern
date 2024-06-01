const MovieService = require("../service/movie");

class MovieController {
  static async create(req, res, next) {
    const { title, genres, year } = req.body;
    try {
      const movie = await MovieService.register({
        title,
        genres,
        year,
      });

      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async upload(req, res, next) {
    const { id } = req.params;
    const file = req.file;

    try {
      const movie = await MovieService.upload({
        id,
        file,
      });
      return res.status(200).json({
        message: "success updating image_url",
        movie,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async get(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const data = await MovieService.get({
        limit,
        offset,
      });

      res.status(200).json({
        totalItems: data.count,
        totalPages: Math.ceil(data.count / limit),
        currentPage: parseInt(page),
        users: data.rows,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async updateOne(req, res, next) {
    const { id } = req.params;
    const { title, genres, year } = req.body;
    try {
      const movie = await MovieService.updateOne({
        id,
        title,
        genres,
        year,
      });

      return res.status(200).json({
        message: "success updating data",
        movie,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const movie = await MovieService.getOne(id);

      return res.status(200).json({
        message: "success retrieving data",
        movie,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const data = await MovieService.deleteID(id);
      return res.status(200).json({
        message: "data deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }
}

module.exports = MovieController;
