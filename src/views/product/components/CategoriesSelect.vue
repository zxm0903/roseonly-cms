<template>
  <div id="categories-select">
    <el-cascader :options="options" change-on-select></el-cascader>
  </div>
</template>
<script>
export default {
  name: "categories-select",
  data() {
    return {
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    buildTree(list) {
      let temp = {};
      let tree = {};
      for (let i in list) {
        temp[list[i].id] = list[i];
      }
      for (let i in temp) {
        if (temp[i].parent_id) {
          if (!temp[temp[i].parent_id].children) {
            temp[temp[i].parent_id].children = new Object();
          }
          temp[temp[i].parent_id].children[temp[i].id] = temp[i];
        } else {
          tree[temp[i].id] = temp[i];
        }
      }
      return tree;
    }
  },
  created() {
    let that = this;
    this.axios
      .get("/goods/storage")
      .then(res => {
        console.log("请求成功", res.data.data.goodsTypeList);
        let classlist = res.data.data.goodsTypeList;
        let list = [];
        classlist.map((e, i) => {
         
            list.push({
              value: e.goodsTypeId,
              label: e.goodsTypeName
            });
            
          
        });
        that.buildTree(list);
        that.classlist = list;
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  }
};
</script>
