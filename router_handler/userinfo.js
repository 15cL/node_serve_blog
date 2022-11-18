

const db = require('../db/index')
const bcryptjs = require("bcryptjs")
const { httpSend, buffer } = require('../utills/index')

// 获取用户信息
exports.getUserInfo = (req, res) => {

  const sql = `select id, username, nickname, email, user_pic from users where id=?`

  // req对象上的user属性,是token解析成功，expressjwt中间件挂载上去的
  db.query(sql, req.user.id, (err, result) => {

    httpSend(res, err, result, "获取用户信息失败")

    res.staSend(0, '获取用户信息成功', result[0])
  })
}


// 更新用户信息  请求体 nickname  email
exports.updateUserInfo = (req, res) => {
  const sql = `update users set ? where id =?`
  db.query(sql, [req.body, req.user.id], (err, result) => {

    httpSend(res, err, result, "修改用户基本信息失败")

    return res.staSend(0, '修改用户信息成功')
  })
}

// 重置密码
exports.updatePwd = (req, res) => {
  const sql = `select password from users where id=?`
  db.query(sql, req.user.id, (err, result) => {

    httpSend(res, err, result, "用户名不存在！")


    const compareResult = bcryptjs.compareSync(req.body.oldPwd, result[0].password)
    if (!compareResult) {
      return res.staSend(1, '旧密码错误')
    }

    // 调用 bcryptjs.hashSync() 对密码加密
    let password = bcryptjs.hashSync(req.body.newPwd, 10)

    const sql = `update users set password=? where id=?`

    db.query(sql, [password, req.user.id], (err, result) => {

      httpSend(res, err, result, "修改密码失败！")

      res.staSend(0, '修改密码成功')
    })

  })
}


// 修改头像
exports.updateAvatar = (req, res) => {
  let avatar = buffer(res, req.body.avatar)
  let sql = `update users set user_pic= ? where id=?`
  db.query(sql, [avatar, req.user.id], (err, result) => {
    httpSend(res, err, result, "修改头像失败")

    res.staSend(0, '修改头像成功')
  })
}