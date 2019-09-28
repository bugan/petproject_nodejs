const mongoClientDB = require('../infra/database');

class UserRepository {
  static async build() {
    const [client, con] = await mongoClientDB;
    const collection = await client.collection('users');
    return new UserRepository(collection, con);
  }

  constructor(collection, connection) {
    this.collection = collection;
    this.connection = connection;
  }

  async findAll() {
    const usuarios = await this.collection.find({}).toArray();
    return { found: usuarios };
  }

  async findOne(email) {
    // eslint-disable-next-line quote-props
    const usuarios = await this.collection.find({ 'email': email }).toArray();
    return { found: usuarios };
  }

  async create(UserModel) {
    try {
      const user = await this.collection.insertOne(UserModel);
      return user.insertedId;
    } catch (err) {
      console.log(err);
      return 404;
    }
  }

  async update(UserModel) {
    try {
      const user = await this.collection.updateOne({ email: UserModel.email }, { $set: UserModel });
      return { atualizado: user };
    } catch (err) {
      console.log(err);
      return 404;
    }
  }

  async delete(email) {
    try {
    // eslint-disable-next-line quote-props
      const user = await this.collection.deleteOne({ 'email': email });
      return user;
    } catch (err) {
      console.log(err);
      return 404;
    }
  }
}


module.exports = UserRepository;
