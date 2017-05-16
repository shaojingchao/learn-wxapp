var WxParse = require('../../utils/wxParse/wxParse.js');
var util = require("../../utils/util.js");

console.log(util);
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  detail:{},
  item:{},
  article:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var _this = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + options.id,
      data: { mdrender:false},
      method: "GET",
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.success === true) {
            // var newList = _this.data.detail.concat(res.data.data.map(function (item) {
            //   item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
            //   return item;
            // }));

            var article = res.data.data.content;
            /**
            * WxParse.wxParse(bindName , type, data, target,imagePadding)
            * 1.bindName绑定的数据名(必填)
            * 2.type可以为html或者md(必填)
            * 3.data为传入的具体数据(必填)
            * 4.target为Page对象,一般为this(必填)
            * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
            */
            WxParse.wxParse('article', 'md', article, _this, 5);
            var newData = res.data.data;

            console.log(util.getDateDiff(new Date(newData.create_at)));
            newData.create_at = util.getDateDiff(new Date(newData.create_at))
            console.log(newData);
            _this.setData({
              detail: newData,
              item: newData
            })
          }
        }
        wx.hideNavigationBarLoading()
        typeof cb === "function" && cb();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})