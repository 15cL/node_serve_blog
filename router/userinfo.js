
const express = require("express")

const router = express.Router()

const { getUserInfo, updateUserInfo, updatePwd, updateAvatar,getAvatar } = require('../router_handler/userinfo')

const { validateEmail, validateNickname, validatePwd, validateAvatar, } = require('../schema/userinfo')

// 获取用户信息
router.get('/userinfo', getUserInfo)

// 更新用户信息
router.post('/update/userinfo', [validateEmail, validateNickname], updateUserInfo)

// 重置密码
router.post('/update/pwd', validatePwd, updatePwd)

// 更换头像
router.post('/update/avatar',validateAvatar, updateAvatar)

// 获取头像
router.get('/avatar',getAvatar)

module.exports = router