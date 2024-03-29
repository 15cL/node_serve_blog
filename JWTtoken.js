// 加密和解密 的 token密钥
const jwtSecretKey = "小五今天想睡觉";

// 设置token有效期
const expiresIn = "1h";

// 导入生成token模块
const jwt = require("jsonwebtoken");

// 生成token
exports.jwt = (res) => {
  // 隐藏密码和头像
  const user = { ...res, password: "", user_pic: "" };

  const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn });

  return "Bearer " + tokenStr;
};

// 导入解析token模块
const expressjwt = require("express-jwt");

// 不需要解析token的路径
const path = [
  "/user/register",
  "/user/login",
  "/cate/all",
  "/cate/article",
  "/tag/all",
  "/tag/article",
  "/article/all",
  "/article/hot",
  "/article/search",
  "/article/msg",
  '/article/traffic',
  "/msg/all",
  "/msg/add",
  "/msg/del",
  "/article/getAvatar",
  "/public/article_pic"
];

exports.parseJWT = () => {
  return expressjwt({ secret: jwtSecretKey, algorithms: ["HS256"] }).unless({
    path,
  });
};
