const bcrypt = require("bcrypt");
const MovieRepository = require("../repository/movie");

class MovieService {
  static async register(data) {
    const { title, genres, year } = data;

    const movie = await MovieRepository.register({
      title,
      genres,
      year,
    });

    return movie;
  }

  static async upload(data) {
    const { id, file } = data;
    const new_movie = await MovieRepository.updateImageUrl({
      id,
      file,
    });
    if (!new_movie) {
      throw new Error("no movie with id= " + id + " not found!");
    }
    if (!file) {
      throw new Error("no file found!");
    }
    return new_movie;
  }

  static async get(pagination) {
    const { limit, offset } = pagination;
    const data = await MovieRepository.findAndPagination(limit, offset);
    return data;
  }

  static async updateOne(data) {
    const { id, title, genres, year } = data;
    const movie = await MovieRepository.updateOne({
      id,
      title,
      genres,
      year,
    });
    return movie;
  }

  static async getOne(id) {
    const movie = await MovieRepository.findMovie(id);
    if (!movie) {
      throw new Error("no movie with id= " + id + " not found!");
    }
    return movie;
  }

  static async deleteID(id) {
    const data = await MovieRepository.deleteID(id);
  }
}

module.exports = MovieService;
