const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  validateSchema,
  upload,
  auth,
} = require("../../middlewares");
const {
  registerUserSchema,
  loginUserSchema,
  changeSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

router.post(
  "/register",
  validateSchema(registerUserSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateSchema(loginUserSchema), ctrlWrapper(ctrl.login));
router.post("/verify", validateSchema(verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.patch(
  "/subscription",
  auth,
  validateSchema(changeSubscriptionSchema),
  ctrlWrapper(ctrl.changeSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
