const UserService = require("../service/user");

class UserController {
  static async register(req, res, next) {
    const { email, gender, password, role } = req.body;
    try {
      const user = await UserService.register({
        email,
        gender,
        password,
        role,
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await UserService.login({
        email,
        password,
      });

      return res.status(200).json({
        message: "Login Success",
        user,
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
      const data = await UserService.get({
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
    const { email, gender, password, role } = req.body;
    try {
      const user = await UserService.updateOne({
        id,
        email,
        gender,
        password,
        role
      });

      return res.status(200).json({
        message: "success updating data",
        user,
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
      const user = await UserService.getOne(id);

      return res.status(200).json({
        message: "success retrieving data",
        user,
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
      const data = await UserService.deleteID(id);

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

module.exports = UserController;
