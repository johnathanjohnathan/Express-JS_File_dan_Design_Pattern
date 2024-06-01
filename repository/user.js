const { users } = require("../models");

class UserRepository {
  static async register(data) {
    const { email, gender, hashedPassword, role } = data;
    const user = await users.create({
      email,
      gender,
      password: hashedPassword,
      role,
    });

    return user;
  }

  static async findUser(id) {
    const user = await users.findByPk(id);
    return user;
  }

  static async findUserEmail(email) {
    const user = await users.findOne({
      where: { email },
    });
    return user;
  }

  static async findAndPagination(limit, offset) {
    const data = await users.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return data;
  }

  static async updateOne(data) {
    const {id, email, gender, hashedPassword, role} = data
    let user = await users.update(
      {
        email: email,
        gender: gender,
        password: hashedPassword,
        role: role
      },
      { where: { id: id } }
    );
    user = await this.findUser(id);
    return user;
  }

  static async deleteID(id) {
    const data = await users.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = UserRepository;
