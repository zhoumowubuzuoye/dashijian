## 运行说明 - 数据库
1. 项目的数据保存在mysql中,先保证打开mysql

   ![1568597237554](服务器接口文档说明.assets/1568597237554.png)

2. 在数据库中新建一个库`bignews`

   ![1568597384285](服务器接口文档说明.assets/1568597384285.png)

3. 打开大事件接口文件中的config/index.js中的 下面几个地方,调整成和自己数据库设置相同的设置

   *** 该配值为默认配值，如果不想要自定义数据库名称可以省略***
```
    // 库名
    database:'bignews',
    // 用户名
    username:'root',
    // 密码
    password:'root',
    // 主机
    host:'127.0.0.1',
    // 项目运行端口
    port:8080,
    // 项目基地址
    baseUrl:'http://localhost'
```

## 初始数据(让数据库有默认的数据)
1. 模拟的数据在reset文件夹中（进入到reset文件夹，点击右键选择Git Bash Hear打开小黑窗）
2. 用node运行 index.js即可导入测试数据`node index.js`
3. 等待操作结束

![1568597640907](服务器接口文档说明.assets/1568597640907.png)

## 开启数据
1. 保证上述2步运行完毕之后,双击`开启.bat`即可
2. 也可以输入命令`node app.js`

![1568597752936](服务器接口文档说明.assets/1568597752936.png)



* 以上只需要第一次配值即可，以后每天我们只需要做两件事
  * 1.开启phpstudy运行mysql数据库
  * 2.双击`开始.bat`打开服务器









![1568598049185](服务器接口文档说明.assets/1568598049185.png)



## 项目基地址

项目的基地址是就是配置的地址比如配置的是

```
port:8080
baseUrl:'http://localhost'
```

那么项目的基地址就是:http://localhost:8080/api/v1

基地址+端口+/api/vi+分类接口地址

## 接口说明

- 除了**登录接口**,其他的**后台接口**认证统一使用 Token 认证
- 需要授权的 API ，必须在**请求头**中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON


## 状态说明

| _状态码_ | _含义_              | _说明_                                              |
| -------- | ------------------- | --------------------------------------------------- |
| 200      | OK                  | 请求成功                                            |
| 201      | CREATED             | 创建成功                                            |
| 204      | DELETED             | 删除成功                                            |
| 400      | BAD REQUEST         | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED        | 未授权                                              |
| 403      | FORBIDDEN           | 被禁止访问                                          |
| 404      | NOT FOUND           | 请求的资源不存在                                    |
| 422      | Unprocesable entity | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误   

## 后台接口

#### 1、用户登录

请求地址：/admin/user/login

请求方式：post

请求参数：

| 名称     | 类型   | 说明            |
| -------- | ------ | --------------- |
| username | string | 用户名（admin） |
| password | string | 密码(123456)    |

返回数据：

| 名称  |  类型  | 说明                                             |
| :---: | :----: | ------------------------------------------------ |
|  msg  | string | 文字信息  ‘登录成功’   ‘用户名或密码出错’        |
| token | string | 登录成功获取的token，后续的所有接口都依赖于token |

~~~json
{
  "code":200,
  "msg":"登录成功",
  "token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIyMDAyMTUwMzQsImlhdCI6MTU5NTQxNTAzNH0.g92E87Gyf7LayEQHIjjjALPlEKPtH5YKKzyj--dyVdgZuH9s7lwPQ4-SZ3taNW8NYKJdWthvVieYxMcJd4De7DFzf3uqz6TkZzqGqIkb0psx0h88rzxhuTep53RWKexBNkhwpQJaK1tC7A_wVJXh1-UUvhl9WXYtTR89J_xSJkE"
}
~~~



#### 2、获取登陆用户信息

请求地址：/admin/user/info

请求方式：get

请求参数：无

返回数据：

|   名称   |  类型  | 说明         |
| :------: | :----: | ------------ |
| nickname | string | 用户昵称     |
| userPic  | string | 用户图片地址 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "nickname": "李思思",
    "userPic": "http://localhost:8080/icon.jpg"
  }
}
~~~



#### 3、获取用户详情

请求地址：/admin/user/detail

请求方式：get

请求参数：无

返回数据：

|   名称   |  类型  | 说明         |
| :------: | :----: | ------------ |
| username | string | 用户名称     |
| nickname | string | 用户昵称     |
|  email   | string | 用户邮箱     |
| userPic  | string | 用户图片地址 |
| password | string | 用户密码     |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "nickname": "李思思",
    "userPic": "http://localhost:8080/icon.jpg",
    "email": "sisili@qq.com",
    "password": "123456",
    "username": "admin"
  }
}
~~~



#### 4、更新用户信息

请求地址：/admin/user/edit

请求方式：post

请求数据：使用formData提交

|   名称   |  类型  | 说明         |
| :------: | :----: | ------------ |
| username | string | 用户名称     |
| nickname | string | 用户昵称     |
|  email   | string | 用户邮箱     |
| userPic  |  file  | 用户图片地址 |
| password | string | 用户密码     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘修改成功’   ‘修改失败’ |

~~~json
{
  "code": 200,
  "msg": "更新成功"
}
~~~



#### 5、所有文章类别

请求地址：/admin/category/list

请求方式：get

请求参数：无

返回数据：文章

| 名称 |  类型  | 说明     |
| :--: | :----: | -------- |
|  id  | number | 类别     |
| name | string | 类别名称 |
| slug | string | 别名     |

~~~json
{
  "code":200,
  "msg":"获取成功",
  "data":[
    {"id":1,"name":"爱生活","slug":"热爱生活"},
    {"id":2,"name":"爱旅行","slug":"热爱旅行"},
    {"id":3,"name":"爱美食","slug":"热爱美食"},
    {"id":4,"name":"爱运动","slug":"热爱运动"},
    {"id":5,"name":"经济特区","slug":"热爱经济"},
    {"id":6,"name":"MMM","slug":"MMM"}
  ]
}
~~~



#### 6、新增文章类别

请求地址：/admin/category/add

请求方式：post

请求参数：

| 名称 | 类型   | 说明     |
| ---- | ------ | -------- |
| name | string | 类别名称 |
| slug | string | 别名     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘增加成功’   ‘增加失败’ |

~~~json
{
  "code":201,
  "msg":"创建成功"
}
~~~



#### 7、根据id查询指定文章类别

请求地址：/admin/category/search

请求方式：get

请求参数：id

| 名称 | 类型   | 说明       |
| ---- | ------ | ---------- |
| id   | number | 文章类别id |

返回数据：

| 名称 |  类型  | 说明     |
| :--: | :----: | -------- |
|  id  | number | 类别     |
| name | string | 类别名称 |
| slug | string | 别名     |

~~~json
{
  "code":200,
  "msg":"获取成功",
  "data":[
  		{
  		"id":6,
  		"name":"MMM",
  		"slug":"MMM"
  		}
  ]
}
~~~



#### 8、更新文章分类

请求地址：/admin/category/edit

请求方式：post

请求参数：

| 名称 | 类型   | 说明     |
| ---- | ------ | -------- |
| id   | number | 类别id   |
| name | string | 类别名称 |
| slug | string | 别名     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘编辑成功’   ‘编辑失败’ |

~~~json
{
  "code": 200,
  "msg": "修改成功"
}
~~~



#### 9、删除文章分类

请求地址：/admin/category/delete

请求方式：post

请求参数：

| 名称 | 类型   | 说明         |
| ---- | ------ | ------------ |
| id   | number | 文章分类的id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |

~~~json
{
  "code": 204,
  "msg": "删除成功"
}
~~~



#### 10、文章搜索

其实这就是个文章列表以及根据条件查询出来的文章列表的接口

请求地址：/admin/article/query

请求方式：get

请求参数：

|  名称   |  类型  | 说明                                                 |
| :-----: | :----: | ---------------------------------------------------- |
|   key   | string | 搜索关键词，可以为空，为空返回某类型所有文章         |
|  type   | string | 文章类型id，可以为空，为空返回所有类型文章           |
|  state  | string | 文章状态，**草稿** ，**已发布**,为空返回所有状态文章 |
|  page   | number | 当前页，为空返回第1页                                |
| perpage | number | 每页显示条数，为空默认每页6条                        |

返回数据：

| 名称  |  类型  | 说明                                                         |
| :---: | :----: | ------------------------------------------------------------ |
| pages | number | 总页数                                                       |
| page  | number | 当前页                                                       |
| data  | array  | 文章数据数组，其中每个成员包含字段：<br />id: number类型，文章id<br />title:  string类型，文章标题<br />intro: string类型，文章文字内容截取<br />cover: string类型，文章封面图片地址<br />type: string类型，文章类型<br />read: number类型，文章阅读次数<br />comment: number类型，文章评论次数<br />date:string类型， 文章发布时间<br />state:string类型，文章状态 |

~~~json
{
  "code":200,
  "msg":"数据获取成功",
  "data":{
    "totalCount":220,
    "totalPage":37,
    "data":[
      {
        "id":189,"title":"诺奖得主：不确定性“遍地开花”，全球经济还好吗？",
        "cover":"http://localhost/https://wpimg.wallstcn.com/aefa23b1-760f-45d1-ad5c-f9f1a723bd72.jpg",
        "date":"2019-05-27",
        "content":"考虑到当前市场被巨大的不确定性所笼罩，全球经济增长放缓的现象不容小觑。",
        "state":"草稿",
        "author":"管理员",
        "read":623,
        "categoryId":1,
        "category":"爱生活"
      },
      {
        "id":147,
        "title":"美联储三号人物：关税可能对美国通胀产生重大影响、抑制美国经济增长",
        "cover":"http://localhost/https://wpimg.wallstcn.com/ea08ac97-2964-498b-9a30-fa4bd9bc39f9.jpg",
        "date":"2019-05-25",
        "content":"威廉姆斯还表示，全球经济复苏将缓慢且通胀率低于目标，目前美国经济处于非常好的位置，美国货币政策也正适宜。",
        "state":"草稿",
        "author":"管理员",
        "read":605,
        "categoryId":2,
        "category":"爱旅行"
      },
      {
        "id":70,
        "title":"华尔街大行们看衰美国经济 摩根大通将二季度增速下调至仅1%",
        "cover":"http://localhost/https://wpimg.wallstcn.com/cb57d3f6-2e91-4542-9941-34de263a6b46.png",
        "date":"2019-05-22",
        "content":"摩根大通经济学家将美国二季度GDP增速预期由2.25%大幅下调至仅1%。摩根大通还认为，由于下行风险增长，美联储今年降息与加息的可能性一样大。此外，投行高盛也将美国美国二季度GDP增长预期从1.5%下调至1.3%。",
        "state":"草稿",
        "author":"管理员",
        "read":118,
        "categoryId":3,
        "category":"爱美食"
      }
    ]
  }
}
~~~



#### 11、发布文章

请求地址：/admin/article/publish

请求方式：post

请求参数：通过`formData`提交

| 名称       | 类型   | 说明                            |
| ---------- | ------ | ------------------------------- |
| title      | string | 文章标题                        |
| cover      | file   | 文章封面图片                    |
| categoryId | number | 文章类型id                      |
| date       | string | 日期                            |
| content    | string | 文章内容                        |
| state      | string | 已发布，草稿 （为空默认为草稿） |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘发布成功’   ‘发布失败’ |

~~~json
{
  "msg": "文章新增成功",
  "code": 200
}
或
{
  "msg": "文章新增成功",
  "code": 200
}
~~~



#### 12、文章编辑

**根据id获取文章信息**

请求地址：/admin/article/search

请求方式：get

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 文章id |

返回数据：

| 名称       | 类型   | 说明         |
| ---------- | ------ | ------------ |
| id         | number | 文章id       |
| title      | string | 文章标题     |
| cover      | file   | 文章封面图片 |
| categoryId | number | 文章类型id   |
| date       | string | 日期         |
| content    | string | 文章内容     |

~~~json
{
  "code":200,
  "msg":"获取成功",
  "data":{
    "id":220,
    "title":"借美团点评发布最佳财报之际，我们讨论一下估值分歧 | 见智研究团队",
    "cover":"https://wpimg.wallstcn.com/9778718c-e680-4cef-88ad-9b62f21043a8.jpg",
    "date":"2019-05-28",
    "content":"见智对美团点评的“分部估值法”持有保留意见，两种估值方法得到截然相反的估值结果，本质上是对外卖业务的价值评估分歧。",
    "state":"已发布",
    "author":"管理员",
    "categoryId":1
  }
}
~~~



#### 13、文章更新

请求地址：/admin/article/edit

请求方式：post

请求参数：通过`formData`提交

| 名称       | 类型   | 说明                            |
| ---------- | ------ | ------------------------------- |
| id         | number | 文章id                          |
| title      | string | 文章标题                        |
| cover      | file   | 文章封面图片(可以为空)          |
| categoryId | number | 文章类型id                      |
| date       | string | 日期                            |
| content    | string | 文章内容                        |
| state      | string | 已发布，草稿 （为空默认为草稿） |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘修改成功’   ‘修改失败’ |

~~~json
{
  "code": 200,
  "msg": "修改成功"
}
~~~



#### 14、删除文章

请求地址：/admin/article/delete

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 文章id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |

~~~json
{
  "code": 204,
  "msg": "文章删除成功"
}
~~~



#### 15、获取统计数据

请求地址：/admin/data/info

请求方式：get

请求参数：无

返回数据：

|     名称     |  类型  | 说明         |
| :----------: | :----: | ------------ |
| totalArticle | number | 文章总数     |
|  dayArticle  | number | 日新增文章数 |
| totalComment | number | 总评论数     |
|  dayComment  | number | 日新增评论数 |

~~~json
{
  "totalArticle":224,
  "dayArticle":18,
  "totalComment":7975,
  "dayComment":36
}
~~~



#### 16、日新增文章数量统计

请求地址：/admin/data/article

请求方式：get

请求参数：

返回数据：

```js
{
    "code": 200,
    "msg": "获取成功",
    "date": [
        {
            "date": "2019-05-20",
            "count": 23
        },
        {
            "date": "2019-05-21",
            "count": 19
        },
        {
            "date": "2019-05-22",
            "count": 29
        },
        {
            "date": "2019-05-23",
            "count": 24
        },
        {
            "date": "2019-05-24",
            "count": 28
        },
        {
            "date": "2019-05-25",
            "count": 28
        },
        {
            "date": "2019-05-26",
            "count": 19
        },
        {
            "date": "2019-05-27",
            "count": 25
        },
        {
            "date": "2019-05-28",
            "count": 25
        },
        {
            "date": "2019-7-30",
            "count": 3
        }
    ]
}
```

#### 17、各类型文章数量统计

请求地址：/admin/data/category

请求方式：get

请求参数：

返回数据：（有多少类型，就返回多少条）

```js
{
    "code": 200,
    "msg": "获取成功",
    "date": [
        {
            "name": "爱旅行",
            "articles": 41
        },
        {
            "name": "爱生活",
            "articles": 72
        },
        {
            "name": "爱美食",
            "articles": 36
        },
        {
            "name": "爱运动",
            "articles": 47
        },
        {
            "name": "经济特区",
            "articles": 33
        }
    ]
}
```



#### 18、日文章访问量

请求地址：/admin/data/visit

请求方式：get

请求参数：

返回数据：（返回最近1周的，也就是7条）

返回数据结构示例：

```json
{
    "code": 200,
    "msg": "日访问量统计数据获取成功",
    "data": {
        "2019-05-28": 13016,
        "2019-05-27": 11503,
        "2019-05-26": 9128,
        "2019-05-25": 13155,
        "2019-05-24": 12734,
        "2019-05-23": 10714,
        "2019-05-22": 16282
    }
}
```



#### 19、文章评论搜索

请求地址：/admin/comment/search

请求方式：get

请求参数：

|  名称   |  类型  | 说明                          |
| :-----: | :----: | ----------------------------- |
|  page   | number | 当前页，为空返回第1页         |
| perpage | number | 每页显示条数，为空默认每页6条 |

返回数据：

|   名称    |  类型  | 说明                              |
| :-------: | :----: | --------------------------------- |
|    id     | number | 评论id                            |
|  author   | string | 评论作者                          |
|  content  | string | 评论内容                          |
|    aid    | number | 对应文章id                        |
|   title   | string | 对应文章标题                      |
|   date    | string | 评论发表时间                      |
|   state   | string | 评论状态 ‘批准’ ‘待审核’,’已拒绝’ |
| totalPage | number | 总页数                            |

~~~json
{
  "code": 200,
  "msg": "数据获取成功",
  "data": {
    "totalCount": 7975,
    "totalPage": 1140,
    "data": [
      {
        "id": 8001,
        "author": "AAA",
        "content": "花飘万家雪茜基本面无可奈何花落去苛",
        "date": "2020-07-07",
        "time": "20:48:31",
        "state": "待审核",
        "articleId": 215,
        "title": "【讨论】除了北上广深，15个“新一线”城市榜单出炉，你的城市在哪个梯队？"
      },
      {
        "id": 8000,
        "author": "徐秀英",
        "content": "团门热规斯低议包始五军合布。",
        "date": "2020-3-26",
        "time": "03:34:36",
        "state": "已通过",
        "articleId": 65,
        "title": "美股周五涨 但本周连续第五周下跌 百度本周大跌30% 英镑上涨"
      },
      {
        "id": 7999,
        "author": "何敏",
        "content": "图需变机开原后争气世七置流方况易任统始切片养间历子位。",
        "date": "2020-3-07",
        "time": "16:21:07",
        "state": "已通过",
        "articleId": 17,
        "title": "南阳“水氢发动机”刷屏，藏身背后的青年汽车是谁？"
      },
      {
        "id": 7998,
        "author": "刘敏",
        "content": "为由完六劳新选重最并级体中去支。",
        "date": "2020-7-02",
        "time": "22:53:38",
        "state": "已通过",
        "articleId": 133,
        "title": "中国楼市：分裂的房价 分化的房企"
      },
      {
        "id": 7997,
        "author": "姚娟",
        "content": "重研造容周质称有价指需表则并务际制生指易十第。",
        "date": "2020-3-27",
        "time": "05:17:44",
        "state": "已通过",
        "articleId": 77,
        "title": "波音遭双重打击：美证监会调查 “好兄弟”美联航延长停飞期"
      },
      {
        "id": 7996,
        "author": "程娟",
        "content": "格志指养数六真东任边。",
        "date": "2020-3-08",
        "time": "07:43:05",
        "state": "已通过",
        "articleId": 59,
        "title": "小米财报超预期 季度营收超格力 手机出货量全球排名第四"
      },
      {
        "id": 7995,
        "author": "汤芳",
        "content": "先同做做今位品史专社照好比革级学水众音能些很。",
        "date": "2020-4-29",
        "time": "01:55:46",
        "state": "已通过",
        "articleId": 4,
        "title": "美联储三号人物：关税可能对美国通胀产生重大影响、抑制美国经济增长"
      }
    ]
  }
}
~~~



#### 20、评论审核通过

请求地址：/admin/comment/pass

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 评论id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘设置成功’   ‘设置失败’ |

~~~json
{
  "msg": "已通过",
  "code": 200
}
~~~



#### 21、评论审核不通过

请求地址：/admin/comment/reject

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 评论id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘设置成功’   ‘设置失败’ |

~~~json
{
  "msg": "已拒绝",
  "code": 200
}
~~~



#### 22、删除评论

请求地址：/admin/comment/delete

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 评论id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |

~~~json
{
  "msg": "已删除",
  "code": 200
}
~~~





## 前台接口

#### 1、文章搜索(文章列表页)

请求地址：/index/search

请求方式：get

请求参数：

|  名称   |  类型  | 说明                                         |
| :-----: | :----: | -------------------------------------------- |
|   key   | string | 搜索关键词，可以为空，为空返回某类型所有文章 |
|  type   | string | 文章类型id，可以为空，为空返回所有类型文章   |
|  page   | number | 当前页，为空返回第1页                        |
| perpage | number | 每页显示条数，为空默认每页6条                |

返回数据：

| 名称  |  类型  | 说明                                                         |
| :---: | :----: | ------------------------------------------------------------ |
| pages | number | 总页数                                                       |
| page  | number | 当前页                                                       |
| data  | array  | 文章数据数组，其中每个成员包含字段：<br />id: number类型，文章id<br />title:  string类型，文章标题<br />intro: string类型，文章文字内容截取<br />cover: string类型，文章封面图片地址<br />category: string类型，文章类型<br />read: number类型，文章阅读次数<br />comment: number类型，文章评论次数<br />date:string类型， 文章发布时间 |

返回数据结构示例：

```json
{
    "pages":5,
    "page":2,
    "data":[
        {
            "id":1,
            "title":'文章标题文字...',
            "intro":'文章内容文字...',
            "cover":'dfgh/hijk/iui8989.jpg'
            ......
        },
        {
            "id":2,
            "title":'文章标题文字...',
            "intro":'文章内容文字...',
            "cover":'dfgh/hijk/iui8989.jpg'
            ......
        },
        {
            "id":3,
            "title":'文章标题文字...',
            "intro":'文章内容文字...',
            "cover":'dfgh/hijk/iui8989.jpg'
            ......
        }
        ......
    ]
}
```



#### 2、文章类型(所有分类)

请求地址：/index/category

请求方式：get

请求参数：无

返回数据：

| 名称 | 类型       | 说明     |
| ---- | ---------- | -------- |
| id   | number类型 | 类别id   |
| name | string类型 | 类别名称 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "爱生活"
    },
    {
      "id": 2,
      "name": "爱旅行"
    },
    {
      "id": 3,
      "name": "爱美食"
    },
    {
      "id": 4,
      "name": "爱运动"
    },
    {
      "id": 5,
      "name": "经济特区"
    }
  ]
}
~~~



#### 3、热点图

请求地址：/index/hotpic

请求方式：get

请求参数：无

返回数据：（只返回5条）

| 名称   | 类型       | 说明           |
| ------ | ---------- | -------------- |
| id     | number类型 | 图片对应文章id |
| imgurl | string类型 | 图片地址       |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "cover": "https://wpimg.wallstcn.com/d426699e-1ad8-497b-892a-dba8e19072f5.gif",
      "id": 19,
      "title": "獐子岛扇贝又又又跑路了！证监会和交易所看不下去了"
    },
    {
      "cover": "https://wpimg.wallstcn.com/e5088eb3-6dcf-4690-988e-a42bf914dba3.jpg",
      "id": 123,
      "title": "面对无底的经济深渊 美国青年人史上第一次“反对”资本主义"
    },
    {
      "cover": "https://wpimg.wallstcn.com/ce782ed2-905d-4142-89a0-f805045b2ad9.png",
      "id": 107,
      "title": "李嘉诚、淡马锡加码投资人造肉！Beyond Meat“死对头”再融3亿美元"
    },
    {
      "cover": "https://wpimg.wallstcn.com/d5a22f13-e9c9-41e7-a5c7-3cdb7e893141.jpg",
      "id": 167,
      "title": "18只创业板股首次“入摩”， 1326只基金提前“埋伏”，谁是最大赢家？"
    },
    {
      "cover": "https://wpimg.wallstcn.com/3422179b-87d1-4c3b-9c9e-fde39b213aa1.png",
      "id": 214,
      "title": "B站迈入亿级月活俱乐部，多业务线齐头并进助力营收显著超预期 | 季报点评"
    }
  ]
}
~~~



#### 4、文章一周热门排行

请求地址：/index/rank

请求方式：get

请求参数：无

返回数据：（只返回7条）

| 名称  | 类型       | 说明     |
| ----- | ---------- | -------- |
| id    | number类型 | 文章id   |
| title | string     | 文章标题 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "title": "借美团点评发布最佳财报之际，我们讨论一下估值分歧 | 见智研究团队",
      "id": 220
    },
    {
      "title": "一文读懂：出海“吃肉”的中国互联网券商，凭什么成为行业“破局者”？",
      "id": 218
    },
    {
      "title": "中东紧张局势升级 沙特关键油气设施遭袭 国际油价快速上涨",
      "id": 197
    },
    {
      "title": "美股周五涨 但本周连续第五周下跌 百度本周大跌30% 英镑上涨",
      "id": 65
    },
    {
      "title": "上交所：科创板首轮问询回复存在五方面问题",
      "id": 219
    },
    {
      "title": "【预告】如何通过投资实现人生逆袭？本周日，向陈志武在线提问",
      "id": 100
    },
    {
      "title": "美联储三号人物：关税可能对美国通胀产生重大影响、抑制美国经济增长",
      "id": 4
    }
  ]
}
~~~



#### 5、最新资讯

请求地址：/index/latest

请求方式：get

请求参数：无

返回数据：（只返回5条）

| 名称     | 类型       | 说明             |
| -------- | ---------- | ---------------- |
| id       | number类型 | 文章id           |
| title    | string类型 | 文章标题         |
| intro    | string类型 | 文章文字内容截取 |
| cover    | string类型 | 文章封面图片地址 |
| type     | string类型 | 文章类型         |
| read     | number类型 | 文章阅读次数     |
| comments | number类型 | 评论条数         |
| date     | string类型 | 文章发布时间     |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 223,
      "title": "黄金的趋势",
      "cover": "http://localhost:8080/c6007c2dfcd970cd19d11be57344c4f0",
      "date": "2020-07-23",
      "content": "<p>时间来看，黄金涨的真的是非常的高了，应该来一波大回调了...</p>",
      "state": "已发布",
      "author": "管理员",
      "read": 0,
      "categoryId": 2,
      "comments": 0,
      "category": "爱旅行",
      "intro": "<p>时间来看，黄金涨的真的是非常的高了..."
    },
    {
      "id": 221,
      "title": "道道道 ",
      "cover": "http://localhost:8080/88f1f5382bd37ba1a1106f1b7552ecf3",
      "date": "2020-07-07",
      "content": "<p>人生就是一场修行，不要着急</p>",
      "state": "已发布",
      "author": "管理员",
      "read": 2,
      "categoryId": 1,
      "comments": 0,
      "category": "爱生活",
      "intro": "<p>人生就是一场修行，不要着急..."
    },
    {
      "id": 220,
      "title": "借美团点评发布最佳财报之际，我们讨论一下估值分歧 | 见智研究团队",
      "cover": "https://wpimg.wallstcn.com/9778718c-e680-4cef-88ad-9b62f21043a8.jpg",
      "date": "2019-05-28",
      "content": "见智对美团点评的“分部估值法”持有保留意见，两种估值方法得到截然相反的估值结果，本质上是对外卖业务的价值评估分歧。AA<p><br></p>",
      "state": "已发布",
      "author": "管理员",
      "read": 1241,
      "categoryId": 1,
      "comments": 22,
      "category": "爱生活",
      "intro": "见智对美团点评的“分部估值法”持有保留意..."
    },
    {
      "id": 216,
      "title": "道指重挫400点 能源和芯片股大跌 热门中概股转涨 美债收益率倒挂",
      "cover": "https://wpimg.wallstcn.com/97dbb5f6-a206-46bb-ac42-111e95120b50.jpg",
      "date": "2019-05-28",
      "content": "开盘2分钟，美股集体跌超1%。油价重挫，能源板块领跌标普大盘，或创去年“平安夜美股大屠杀”以来最大单日跌幅。避险需求推动美债收益率大跌，10年期收益率创2017年12月以来最低，关键收益率曲线再度倒挂。",
      "state": "已发布",
      "author": "管理员",
      "read": 901,
      "categoryId": 2,
      "comments": 35,
      "category": "爱旅行",
      "intro": "开盘2分钟，美股集体跌超1%。油价重挫，..."
    },
    {
      "id": 215,
      "title": "【讨论】除了北上广深，15个“新一线”城市榜单出炉，你的城市在哪个梯队？",
      "cover": "https://wpimg.wallstcn.com/ae85908f-4c7b-4b48-919a-2e5980f3d2b9.jpg",
      "date": "2019-05-28",
      "content": "15个“新一线”城市榜单出炉\n...",
      "state": "已发布",
      "author": "管理员",
      "read": 225,
      "categoryId": 2,
      "comments": 34,
      "category": "爱旅行",
      "intro": "15个“新一线”城市榜单出炉\n........"
    }
  ]
}
~~~



#### 6、最新评论

请求地址：/index/latest_comment

请求方式：get

请求参数：无

返回数据：（只返回6条）

|  名称  |  类型  | 说明         |
| :----: | :----: | ------------ |
| author | string | 用户名称     |
|  date  | string | 评论时间     |
| intro  | string | 评论内容截取 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 650,
      "author": "武磊",
      "date": "2020-7-31",
      "time": "15:43:07",
      "state": "待审核",
      "articleId": 2,
      "intro": "通科及总志强清力头半适。..."
    },
    {
      "id": 937,
      "author": "邹超",
      "date": "2020-7-31",
      "time": "08:29:45",
      "state": "已拒绝",
      "articleId": 108,
      "intro": "装资不什根华记家样选温党并色参主便月如维..."
    },
    {
      "id": 1749,
      "author": "崔秀英",
      "date": "2020-7-31",
      "time": "20:17:27",
      "state": "待审核",
      "articleId": 23,
      "intro": "次今可深支在数风展。..."
    },
    {
      "id": 2795,
      "author": "刘敏",
      "date": "2020-7-31",
      "time": "11:03:18",
      "state": "待审核",
      "articleId": 119,
      "intro": "团飞大进题格况外和而。..."
    },
    {
      "id": 2848,
      "author": "程秀英",
      "date": "2020-7-31",
      "time": "22:52:10",
      "state": "已拒绝",
      "articleId": 162,
      "intro": "共论里响维身须重究教界风温生采当周流办相..."
    },
    {
      "id": 3604,
      "author": "彭勇",
      "date": "2020-7-31",
      "time": "17:42:11",
      "state": "待审核",
      "articleId": 15,
      "intro": "已运选一果较群须相办标求始想化性开引领做..."
    }
  ]
}
~~~



#### 7、焦点关注 

请求地址：/index/attention

请求方式：get

请求参数：无

返回数据：（只返回7条）

| 名称  | 类型       | 说明         |
| ----- | ---------- | ------------ |
| intro | string类型 | 文章内容截取 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 128,
      "intro": "提交招股书已经过去两年，近日三只松鼠再次..."
    },
    {
      "id": 75,
      "intro": "社交媒体上容易让本不富裕的年轻人透支消费..."
    },
    {
      "id": 166,
      "intro": "首次入MSCI的18只创业板股票，总市值..."
    },
    {
      "id": 180,
      "intro": "保护生猪核心产能，确保基本生猪生产供给能..."
    },
    {
      "id": 129,
      "intro": "国产替代和稀土概念，短期没有其他题材能与..."
    },
    {
      "id": 187,
      "intro": "Uber千亿美元市值梦碎后，大摩也成为“..."
    },
    {
      "id": 98,
      "intro": "在A股的康得新和康美这“两康”吸引着投资..."
    }
  ]
}
~~~



#### 8、文章详细内容

请求地址：/index/article

请求方式：get

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | string | 文章id |

返回数据：

| 名称     | 类型   | 说明                                                         |
| -------- | ------ | ------------------------------------------------------------ |
| title    | string | 文章标题                                                     |
| author   | string | 文章作者                                                     |
| type     | string | 文章类型                                                     |
| date     | string | 文章发布时间                                                 |
| read     | number | 阅读次数                                                     |
| comments | number | 评论条数                                                     |
| content  | string | 文章内容                                                     |
| prev     | array  | 上一篇文章<br />id： 上一篇文章的id<br />title：上一篇文章的标题 |
| next     | array  | 下一篇文章<br />id： 下一篇文章的id<br />title：下一篇文章的标题 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "id": 220,
    "title": "借美团点评发布最佳财报之际，我们讨论一下估值分歧 | 见智研究团队",
    "cover": "http://localhost/https://wpimg.wallstcn.com/9778718c-e680-4cef-88ad-9b62f21043a8.jpg",
    "date": "2019-05-28",
    "content": "见智对美团点评的“分部估值法”持有保留意见，两种估值方法得到截然相反的估值结果，本质上是对外卖业务的价值评估分歧。AA<p><br></p>",
    "state": "已发布",
    "author": "管理员",
    "read": 1241,
    "categoryId": 1,
    "comments": 22,
    "category": "爱生活",
    "prev": {
      "id": 219,
      "title": "上交所：科创板首轮问询回复存在五方面问题"
    },
    "next": {
      "id": 221,
      "title": "道道道 "
    }
  }
}
~~~



#### 9、发表评论

请求地址：/index/post_comment

请求方式：post

请求参数：

| 名称      | 类型   | 说明     |
| --------- | ------ | -------- |
| author    | string | 用户名称 |
| content   | string | 评论内容 |
| articleId | number | 文章id   |

返回数据：‘发表成功’   ‘发表失败’

~~~json
{
  "code": 201,
  "msg": "发表成功"
}
~~~



#### 10、评论列表

请求地址：/index/get_comment

请求方式：get

请求参数：

| 名称      | 类型   | 说明   |
| --------- | ------ | ------ |
| articleId | string | 文章id |

返回数据：

|  名称   |  类型  | 说明         |
| :-----: | :----: | ------------ |
| author  | string | 用户名称     |
|  date   | string | 评论时间     |
| content | string | 评论完整内容 |

~~~json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 4358,
      "author": "孟明",
      "content": "青光调前受争子按周更区求立能等其合决被此出点表器广这。",
      "date": "2020-7-22",
      "time": "23:01:29",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 1839,
      "author": "林霞",
      "content": "都支传史代变却术按入什给及非化教山。",
      "date": "2020-7-19",
      "time": "23:21:46",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 1880,
      "author": "程强",
      "content": "展们办百美石自政里府品便头近也交识公群且叫进世确建地论。",
      "date": "2020-6-11",
      "time": "12:22:46",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 1043,
      "author": "金芳",
      "content": "安造家育族据样队物阶养质具门与多果半影车。",
      "date": "2020-6-02",
      "time": "11:01:24",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 7668,
      "author": "戴杰",
      "content": "百路解争本土作示全才与内直不志值派。",
      "date": "2020-5-21",
      "time": "22:10:58",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 7561,
      "author": "叶静",
      "content": "其级要会治容规如车打细群青。",
      "date": "2020-5-11",
      "time": "05:06:24",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 492,
      "author": "杨杰",
      "content": "育化如示指身头位放点进组管风火质程然日出三地准位非族车。",
      "date": "2020-3-27",
      "time": "11:28:49",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 7411,
      "author": "袁丽",
      "content": "明广式布个出低铁说后增性领口。",
      "date": "2020-3-21",
      "time": "20:48:03",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 7692,
      "author": "乔磊",
      "content": "火统地新王电它支任记织究厂值农南量养少。",
      "date": "2020-3-19",
      "time": "02:13:40",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 2152,
      "author": "龚芳",
      "content": "后律建信此利动品育。",
      "date": "2020-2-16",
      "time": "17:50:06",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 5045,
      "author": "廖军",
      "content": "设农持边证阶老千有效世是过十素集天去统以习利关然直同。",
      "date": "2020-1-24",
      "time": "18:36:52",
      "state": "已通过",
      "articleId": 216
    },
    {
      "id": 4478,
      "author": "田敏",
      "content": "变制步效为天南论无原明府资理取研住长存调百须然示安。",
      "date": "2020-1-10",
      "time": "02:49:42",
      "state": "已通过",
      "articleId": 216
    }
  ]
}
~~~





