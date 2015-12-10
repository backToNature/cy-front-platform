## js代码说明

1. changyan_mobile.js(历史遗留问题较多)
	* loadTopic():加载渲染评论框
	* appendCBox()：加载渲染最上面的评论框
	* submitComment（cbox_wrapper）：发表评论
		* 发表评论时会传入一个cbox_wrapper参数，这个参数是一个dom对象，发表评论所需参数都是从里面获取的。
	* 自定义事件说明
		* CUSTOM_EVT_COMMENTS_LIST_RENDER: 评论列表渲染完成后
		* CUSTOM_EVT_TOPIC_LOAD: 评论数据初始化完成后
		* CUSTOM_EVT_CBOX_RENDER: 评论文本域渲染完成后
		* CUSTOM_EVT_SUBMIT_CLICK: 点击发布按钮时
		* CUSTOM_EVT_SOFA_CLICK：点击抢沙发时
		* CUSTOM_EVT_REPLY_CLICK：点击回复按钮时
	* 自定义事件调用:
	
调用方法如下

    var $$event = require('widget/util/events.js')
    $$event.trigger('CUSTOM_EVT_COMMENTS_LIST_RENDER', function (data) {
     // your code
    });