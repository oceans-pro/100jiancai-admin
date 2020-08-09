const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  username: state => state.user.name,
  nickname: state => state.user.nickname,
  avatar: state => state.user.avatar,
  userInfo: state => state.user.userInfo,
  permissions: state => state.user.permissions,
}
export default getters
