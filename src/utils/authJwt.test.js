import { verifyToken } from '@utils/authJwt.js';
import { User } from '@models/user.js';

const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const _id = '6091bb23d631ee088c07eaf5';

const tokenPositive = jwt.sign({ _id }, process.env.JWT_SECRET, {
  expiresIn: '1d',
});
const tokenNegative = jwt.sign({ _id }, process.env.JWT_SECRET, {
  expiresIn: '1',
});
const req = {
  cookies: {
    token: tokenPositive,
  },
};
const reqExp = {
  cookies: {
    token: tokenNegative,
  },
};
const reqUnauth = {
  cookies: {
    token: 'Invalid',
  },
};
const reqNoToken = {
  cookies: {},
};

describe('Auth JWT testing', () => {
  beforeEach(() =>
    jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(_id))
  );

  test('Verify token Positive scenario', async () => {
    const verificationResult = await verifyToken(req);
    expect(verificationResult.status).toEqual(200);
    expect(verificationResult.message).toEqual('Success');
    expect(verificationResult.uid).toEqual(_id);
  });

  test('Verify token Negative scenario - Expired', async () => {
    const verificationResult = await verifyToken(reqExp);
    expect(verificationResult.status).toEqual(403);
    expect(
      verificationResult.message.toString().includes('jwt expired')
    ).toBeTruthy();
    expect(verificationResult.uid).toBeUndefined();
  });

  test('Negative Test - Unauthorized Token', async () => {
    const verificationResult = await verifyToken(reqUnauth);
    expect(verificationResult.status).toEqual(403);
    expect(
      verificationResult.message.toString().includes('jwt malformed')
    ).toBeTruthy();
    expect(verificationResult.uid).toBeUndefined();
  });

  test('Negative Test - Token Non-Found', async () => {
    const verificationResult = await verifyToken(reqNoToken);
    expect(verificationResult.status).toEqual(403);
    expect(verificationResult.message).toEqual('No token provided!');
    expect(verificationResult.uid).toBeUndefined();
  });
});
