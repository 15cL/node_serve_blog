const fs = require("fs");


const db = require("../db/index");
const bcryptjs = require("bcryptjs");
const { errSend, buffer } = require("../utills/index");

// 获取用户信息
exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from users where id=?`;

  // req对象上的user属性,是token解析成功，expressjwt中间件挂载上去的
  db.query(sql, req.user.id, (err, result) => {
    errSend(res, err, result, "获取用户信息失败");

    return res.staSend(0, "获取用户信息成功", result[0]);
  });
};

// 更新用户信息  请求体 nickname  email
exports.updateUserInfo = (req, res) => {
  const sql = `update users set ? where id =?`;
  db.query(sql, [req.body, req.user.id], (err, result) => {
    errSend(res, err, result, "修改用户基本信息失败");

    return res.staSend(0, "修改用户信息成功");
  });
};

// 重置密码
exports.updatePwd = (req, res) => {
  const sql = `select password from users where id=?`;
  db.query(sql, req.user.id, (err, result) => {
    errSend(res, err, result, "用户名不存在！");

    const compareResult = bcryptjs.compareSync(
      req.body.oldPwd,
      result[0].password
    );
    if (!compareResult) {
      return res.staSend(1, "旧密码错误");
    }

    // 调用 bcryptjs.hashSync() 对密码加密
    let password = bcryptjs.hashSync(req.body.newPwd, 10);

    const sql = `update users set password=? where id=?`;

    db.query(sql, [password, req.user.id], (err, result) => {
      errSend(res, err, result, "修改密码失败！");

      return res.staSend(0, "修改密码成功");
    });
  });
};

// 修改头像
exports.updateAvatar = (req, res) => {
  let sqll = `select user_pic from users where id=?`;
  db.query(sqll, req.user.id, (err, result) => {
    errSend(res, err, result, "修改头像失败");
  });
  let avatar = buffer(req, res, req.body.avatar, "user_pic");
  let sql = `update users set user_pic= ? where id=?`;
  db.query(sql, [avatar, req.user.id], (err, result) => {
    errSend(res, err, result, "修改头像失败");

    return res.staSend(0, "修改头像成功");
  });
};

exports.getAvatar = (req, res) => {
  const data = fs.readFile(req.body.user_pic, "binary", function (err, data) {
    if (err) {
      res.send("获取头像失败");
    } else {
      res.staSend(0, "获取头像成功", {
        baseUrl: Buffer.from(data, "binary").toString("base64"),
      });
    }
  });
};
