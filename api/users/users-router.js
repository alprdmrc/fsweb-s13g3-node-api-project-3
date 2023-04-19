const express = require("express");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir
const UserModel = require("./users-model");
const PostModel = require("../posts/posts-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    const users = await UserModel.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  const user = req.user;
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", validateUser, async (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  const name = req.body.name;
  try {
    const insertedUser = await UserModel.insert({ name: name });
    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", validateUser, validateUserId, async (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  const name = req.body.name;
  try {
    const updatedUser = await UserModel.update(req.params.id, { name: name });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await UserModel.remove(req.params.id);
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const posts = await UserModel.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  const text = req.body.text;
  try {
    const post = await PostModel.insert({ text: text, user_id: req.params.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// routerı dışa aktarmayı unutmayın
module.exports = router;
