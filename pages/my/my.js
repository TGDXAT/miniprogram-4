// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "未登录", //用户名
    src: '/images/index.png', //用户头像
    isLogin:false, //是否已登录
    num:0, //收藏的news数量
    newsList: [] //收藏的news列表
  },

  //获取用户信息
  getMyInfo(e){
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log(res)
        this.setData({
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          isLogin:true
        });
        this.getMyFavorites();
      }
    });
    
  },

  //获取收藏信息
  getMyFavorites(){
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;
    let myList = [];

    for (let i = 0;i<num;i++){
      let obj = wx.getStorageSync(keys[i]);
      //过滤无用数据
      if(keys[i]=='logs'){
        continue;
      }
      myList.push(obj);
    }

    this.setData({
      newsList:myList,
      num:myList.length
    })
  },

  goToDetail(e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(this.data.isLogin){
      this.getMyFavorites();
    }
  }
})