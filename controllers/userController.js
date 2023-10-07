const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.getUserById = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId).exec()

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const newUser = new User({ name, email })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.updateUser = async (req, res) => {
  const userId = req.params.id
  const { name, email } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    ).exec()

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.deleteUser = async (req, res) => {
  const userId = req.params.id

  try {
    const deletedUser = await User.findByIdAndRemove(userId).exec()

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
