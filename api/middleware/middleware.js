const UserModel = require("../users/users-model");

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
  // SİHRİNİZİ GÖRELİM
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const id = req.params.id;
  try {
    const user = await UserModel.getById(id);
    if (user) {
      req.user = user;
      next();
    } else next({ status: 404, message: "not found" });
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const name = req.body.name;
  try {
    if (name) {
      next();
    } else {
      next({ status: 400, message: "gerekli name alanı eksik" });
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const text = req.body.text;
  try {
    if (text) {
      next();
    } else {
      next({ status: 400, message: "gerekli text alanı eksik" });
    }
  } catch (error) {
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
