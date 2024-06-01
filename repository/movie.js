const { movies } = require("../models");

class MovieRepository {
  static async register(data) {
    const { title, genres, year } = data;
    const movie = await movies.create({
      title,
      genres,
      year,
    });

    return movie;
  }

  static async findMovie(id) {
    const movie = await movies.findByPk(id);
    return movie;
  }

  static async updateImageUrl(data) {
    const { id, file } = data;
    const new_image_url = `http://localhost:3000/upload/${file.filename}`;
    let movie = await movies.update(
      {
        image_url: new_image_url,
      },
      { where: { id: id } }
    );
    movie = await this.findMovie(id);
    return movie;
  }

  static async findAndPagination(limit, offset) {
    const data = await movies.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return data;
  }

  static async updateOne(data) {
    const { id, title, genres, year } = data;
    let movie = await movies.update(
      {
        title: title,
        genres: genres,
        year: year,
      },
      { where: { id: id } }
    );
    movie = await this.findMovie(id);
    return movie;
  }

  static async deleteID(id) {
    const data = await movies.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = MovieRepository;
