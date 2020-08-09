import http from '@/utils/axios-http-util'

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 登录注销相关
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
/**
 * 用户登录
 * @param username {String} 用户名
 * @param password {String} 密码
 */
export function login(username, password) {
  return http.post('/login/process', {username, password})
}

export function checkPass(username, password) {
  return http.post('/user/check', {username, password})
}


export function updatePass(username, oldPass, newPass) {
  return http.put('/user/change_pass', {username, oldPass, newPass})
}


/**
 * 用户注销
 */
export function logout() {
  return http.post('/logout/process')
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 用户相关
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
/**
 * 登录成功后获取用户基本信息
 */
export function getUserInfo() {
  return http.get('/user/info', {})
}

/**
 * 修改用户信息
 * @param data 用户信息 UserBasciInfo
 */
export function putUserInfo(data) {
  return http.put('/user/info', data)
}

/**
 * 增加一个用户
 * @param data{Object} 用户注册信息
 * @param data.username{String}
 * @param data.password{String}
 * @param data.email{String}
 */
export function postUser(data) {
  return http.post('/user/info', data)
}

/**
 * 获取全部的用户
 */
// export function getAllUsers() {
//   return http.get('/user/info/all')
// }

/**
 * 获取全部的用户、角色、权限
 */
export function getAllUsers() {
  return http.get('/user')
}

/**
 * 删除用户
 */
export function deleteOneUser(username) {
  return http.delete('/user/' + username)
}

/**
 * 封禁用户
 */
export function inactiveOneUser(username) {
  return http.delete('/user/' + username + '/0')
}

/**
 * 解封用户
 */
export function activeOneUser(username) {
  return http.put('/user/' + username + '/1')
}

/**
 * 为用户分配角色
 */
export function putOneUserWithRoleIds(id, roleIds) {
  return http.put('/user/' + id + '/relate', {
    roleIds: roleIds.toString(),
  })
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 角色相关
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/

/**
 * 获取全部的角色
 */
export function getAllRoles() {
  return http.get('/role')
}

/**
 * 删除角色
 */
export function deleteOneRole(id) {
  return http.delete('/role/' + id)
}

/**
 * 增加角色
 */
export function postOneRole(data) {
  return http.post('/role', data)
}

/**
 * 修改角色
 */
export function putOneRole(id, data) {
  return http.putJson('/role/' + id, data)
}

/**
 * 为角色分配权限
 * @param id {number} 角色的ID
 * @param permissionIds {Array} 权限ID的列表
 */
export function putOneRoleWithPermissionIds(id, permissionIds) {
  return http.put('/role/' + id + '/relate', {
    permissionIds: permissionIds.toString(),
  })
}


/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 权限相关
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
/**
 * 获取全部权限
 */
export function getAllPermissions() {
  return http.get('/permission')
}

/**
 * 删除一个权限权限
 */
export function deleteOnePermission(id) {
  return http.delete('/permission/' + id)
}

/**
 * 增加一个权限
 */
export function postOnePermission(data) {
  return http.post('/permission', data)
}

/**
 * 修改一个权限
 */
export function putOnePermission(data) {
  return http.put('/permission', data)
}

