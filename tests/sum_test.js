const userController = require('../server/controllers/userController');
const User = require('../server/models/userModels')


describe('createUser middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: { username: "Jackie", password: "Jejeje "} };
    res = { 
      send: jest.fn(),
      locals: {} 
    };
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  it('should create a new user, set it to res.locals.user, and make sure the password is hashed', async () => {
    await userController.createUser(req,res,next);
    expect(next).toBeCalledTimes(1);
    expect(res.locals.user).toHaveProperty('username', 'Jackie');

    const user = await User.findOne({ username: "Jackie" });
    expect(user).toBeTruthy();
    expect(user.password).not.toEqual("Jejeje");
  });
  it('should verify a valid user with correct password', async () => {
    await userController.verifyUser(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  })
})

