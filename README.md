# node-myblog

# 2022/11/18 v2 用户注册登录，以及用户信息模块

         注册          Url: /user/register          Method: POST  Body: { username , password }

         登录          Url：/user/login             Method: POST  Body: { username , password }

      获取用户信息      Url：/my/userinfo            Method：Get              需登录

      修改用户信息      Url：/my/update/userinfo     Method：Post  Body：{  nickname, email }      需登录

       修改密码        Url：/my/update/pwd           Method：Post  Body:{ oldPwd , newPwd }        需登录

       修改头像          Url：/my/update/avatar       Method：Post  Body :{ avatar }  base64格式    需登录

# 2022/11/19 v2 标签云模块

       获取所有标签        Url: /tag/all              Method：Get

        更新标签           Url: /tag/update          Method：Post    Body :{ id }                  需登录

        新增标签           Url: /tag/new             Method: Post    Body :{ tagName }         需登录

        删除标签           Url: /tag/del             Method: Post    Body : { id }                 需登录

# 2022/11/19 v2 文章模块

       获取所有文章        Url: /article/all              Method：Get

        更新文章           Url: /article/update          Method：Post    Body :{ id，一或多 }                  需登录

        新增文章           Url: /article/new             Method: Post    Body :{ 必需(name,author,detail) ,article_avatar }         需登录

        删除文章           Url: /article/del             Method: Post    Body : { id }                 需登录

# 2022/11/22 v2 完成对应后台管理系统(简易),部分功能待后期开发。https://github.com/15cL/vue2x_admin_blog

      在后台开发的过程，发现从数据库读出来的图片服务器路径，在浏览器无法解析本地图片的问题，但还未解决，在后期开发过程，再来解决。

# 2022/11/24 v2 分类模块

       获取所有分类        Url: /cate/all              Method：Get

        更新分类           Url: /cate/update          Method：Post    Body : { id }                  需登录

        新增分类           Url: /cate/new             Method: Post    Body : { cateName }         需登录

        删除分类           Url: /cate/del             Method: Post    Body : { id }                 需登录

# 2022/11/28 v2 新增查询

获取当前分类下的所有文章 url: /cate/article Method: Get Params: { id }

获取当前标签下的所有文章 url: /tag/article Method: Get Params ：{ id }

获取热门文章 url: /article/hot Method: Get

# 修复 get 请求传参获取问题 新增了一个中间件

# 2022/11/29 v2 新增搜索 api

     搜索                 url: /article/search    Method: Get   Params: { info }


# 搬砖中。。。

# 2022/12/12 v2 完成留言模块 api

     获取所有留言          url: /msg/all           Method: Get

     新增留言             url: /msg/add            Method: Post   Body:{article_id(必须),name,avatar_url,detail(必须)}

     删除留言             url: /msg/del            Method: Post  Body:{id}

     获取文章下留言        url: /article/msg        Method: Get   Params:{id}
