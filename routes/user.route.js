const router = require('express').Router();
const { authorize } = require('../auth/jwt');

const {
  signUp,
  otpEnter,
  login,
  updateProfile,
  logOut,
  signOut
} = require('../controllers/user.controller')

const { signUpChecks } = require('../middlewares/signUpChecks');
const { isValidOtp } = require('../middlewares/isValidOtp');
const { loginChecks } = require('../middlewares/loginChecks');

router.post('/register', signUpChecks, signUp);
router.post('/otp', isValidOtp, otpEnter);
router.post('/login', loginChecks, login);
router.patch('/update/:id', authorize, updateProfile);
router.patch('/logout/:id', authorize, logOut);
router.delete('/signout/:id', authorize, signOut)


module.exports = router;