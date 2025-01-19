import jwt from 'jsonwebtoken';

export const generateTokenAndSandCode = (res, userId) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Set the token as an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevent client-side JS access
    secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
    sameSite: 'lax', // Adjust depending on use case
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return token;
};
