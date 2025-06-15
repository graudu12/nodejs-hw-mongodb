import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  reqResetPass,
  resetPass,
} from '../services/auth.js';

export const registerCtrl = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(200).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
export const loginCtrl = async (req, res) => {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const refreshCtrl = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Refresh completed successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const logoutCtrl = async (req, res) => {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};
export const reqResetPassCtrl = async (req, res) => {
  const { email } = req.body;

  await reqResetPass(email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
  });
};
export const resetPassCtrl = async (req, res) => {
  const { password, token } = req.body;

  await resetPass(password, token);

  res.send({ status: 200, message: 'Password has been successfully reset.' });
};
