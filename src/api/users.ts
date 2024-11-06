import express from 'express';
import db from '../../models';
import JWT from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  // RTEMPORARY add validation
  const user = await db.User.create(req.body);
  res.json({ message: 'User created successfully', user });
});

userRouter.post('/login', async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email } });
  const { password, ...userWithoutPassword } = user.dataValues;
  const isSame = await bcrypt.compare(req.body.password, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  } else if (!isSame) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.json({
    message: 'User logged in successfully',
    user: userWithoutPassword,
    token,
  });
});

userRouter.post('/verifyToken', async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
    if (!decoded || typeof decoded !== 'object') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded?.exp && decoded.exp < currentTime) {
      return res.status(401).json({
        message: 'Token expired',
      });
    }
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user.dataValues;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

userRouter.get('/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password, ...userWithoutPassword } = user.dataValues;
  res.json({ user: userWithoutPassword });
});

export default userRouter;
