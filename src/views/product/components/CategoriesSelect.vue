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
  created() {
    this.axios
      .get("/")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
