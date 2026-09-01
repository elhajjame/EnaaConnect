import jwt from 'jsonwebtoken'
import { errorResponse } from '../respnses/respons.js';
import User from '../models/UserModel.js';

export const protect = async (req, res, next) => {
  let token, decoded;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return errorResponse(res, 401, 'you are not logged in! please log-in to get access')
    };

    decoded = jwt.verify(token, process.env.JWT_SECRET);

  } catch (error) {
    console.error(error)
    return errorResponse(res, 401, 'invalid token please log-in again')
  }

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return errorResponse(res, 401, 'the user belonging to token does no longer exist')
  }
  req.user = freshUser;
  console.log(req.user);
  next()
};

export default protect;