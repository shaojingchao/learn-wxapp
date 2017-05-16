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
    wx.showNavigationBarLoading()
    var _this = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + options.id,
      data: { mdrender:false},
      method: "GET",
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.success === true) {
            
            var newData = res.data.data;
            newData.create_at = util.getDateDiff(new Date(newData.create_at))
            console.log(newData);
            _this.setData({
              detail: newData,
              item: newData
            })

            var article = res.data.data.content;
            /**
            * WxParse.wxParse(bindName , type, data, target,imagePadding)
            * 1.bindName绑定的数据名(必填)
            * 2.type可以为html或者md(必填)
            * 3.data为传入的具体数据(必填)
            * 4.target为Page对象,一般为this(必填)
            * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
            */
            WxParse.wxParse('article', 'md', article, _this, 5, function () {
              wx.hideNavigationBarLoading()
              typeof cb === "function" && cb();
            });

          }
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})