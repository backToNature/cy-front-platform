
module.exports = {
    //  处理/component/api/list接口
    getTagList: function (list, userList) {
        var tagList, tagArr = [], temp = [], user_id;
        list.forEach(function (item) {
            user_id = item.user_id;
            userList[0].some(function (one) {
                if (user_id == one.id) {
                    item.author = one;
                    return true;
                }
            });
            if (tagArr.some(function (sitem) {if (sitem.tag === item.tag) {sitem.num ++;sitem.list.push(item);} return sitem.tag === item.tag})) {
                
            } else {
                tagArr.push({
                    tag: item.tag,
                    list: [item],
                    num: 1
                });
            }
        });
        return tagArr;
    },
    getToc: function (list) {
        
    }
};