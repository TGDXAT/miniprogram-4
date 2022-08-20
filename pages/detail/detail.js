const common = require("../../utils/common");

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}, //文章数据
    isAdd:false //是否已收藏
  },

  //添加到收藏夹
  addFavorites(){
      let article = this.data.article;
      wx.setStorageSync(article.id, article);
      this.setData({isAdd:true});
  },

  //取消收藏
  cancelFavorites(){
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({isAdd:false});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //根据本地缓存收藏的id判断当前页面是否已收藏
    let id = options.id;
    let info = wx.getStorageInfoSync();
    let keys = info.keys;

    for (let i = 0;i<keys.length;i++){
      if(keys[i]==id){
        this.setData({
          isAdd:true
        })
        break;
      }
    }

    //获取文章内容
    let result = common.getNewsDetail(id);
    if(result.code=='200'){
      this.setData({
        article:result.news
      });
    }
  },
})