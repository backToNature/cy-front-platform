# 接口文档

## user

### 登陆

* /user/api/login
	* type: get
	* requset: 
		* *account: 账户名
		* *pwd: 密码

### 登出

* /user/api/logout
	* type: get
	
### 注册

* /user/api/sign_up
	* type: get
	* requset: 
		* *account: 账户名
		* *pwd: 密码

### 修改密码

* /user/api/modify
	* 要求必须登陆
	* type: get
	* requset: 
		* *new_pwd: 新密码
		* *pwd: 旧密码

### 获取用户信息

* /user/api/get_user_info
	* 要求必须登陆

## component

### 发表组件

* /component/api/submit
	* 要求必须登陆
	* type: post
	* request:
		* *title: 组件名称
		* *tag： 组件分类
		* *description: 组件简介

### 修改组件内容

* /component/api/modify
	* 要求必须登陆
	* type: post
	* request:
		* *component_id: 组件id
		* *title: 组件名称
		* *tag： 组件分类
		* *description: 组件简介

### 获取组件列表

* /componet/api/list
	* type: get
	* request

