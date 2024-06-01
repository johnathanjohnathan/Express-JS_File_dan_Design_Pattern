const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user");

class UserService {
  static async register(data) {
    const { email, gender, password, role } = data;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await UserRepository.register({
      email,
      gender,
      hashedPassword,
      role,
    });

    return user;
  }

  static async login(data) {
    const { email, password } = data;
    const user = await UserRepository.findUserEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid Credential");
    }
    return user;
  }

  static async get(pagination) {
    const { limit, offset } = pagination;
    const data = await UserRepository.findAndPagination(limit, offset);
    return data;
  }

  static async updateOne(data) {
    const { id, email, gender, password, role } = data;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await UserRepository.updateOne({
      id,
      email,
      gender,
      hashedPassword,
      role
    });
    return user;
  }

  static async getOne(id) {
    const user = await UserRepository.findUser(id);
    if (!user) {
      throw new Error("no user with id= " + id + " not found!");
    }
    return user;
  }

  static async deleteID(id) {
    const data = await UserRepository.deleteID(id);
  }
}

module.exports = UserService;
