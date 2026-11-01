import jwt from "jsonwebtoken";

export const generateToken = (_id) => {
  const maxAge = 3 * 24 * 60 * 60 * 1000;
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
