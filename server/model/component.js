module.exports = {
    //  处理/component/api/list接口
    getTagList: function (list) {
        var tagList, tagArr = [], temp = [];
        list.forEach(function (item) {
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
    }
        
};