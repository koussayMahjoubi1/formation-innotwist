// Temporary in-memory storage for users
class UserStorage {
  constructor() {
    this.users = [];
  }

  // Create a new user
  createUser(email, hashedPassword) {
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    this.users.push(newUser);
    return { success: true, user: { id: newUser.id, email: newUser.email } };
  }

  // Find user by email
  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  // Find user by ID
  findById(id) {
    return this.users.find(user => user.id === id);
  }

  // Get all users (for debugging)
  getAllUsers() {
    return this.users.map(user => ({ id: user.id, email: user.email }));
  }
}

module.exports = new UserStorage();

