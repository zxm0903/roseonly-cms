<template>
  <div id="shopCondition">

  </div>
</template>

<style>
#shopCondition {
  width: 600px;
  height: 600px;
  background: #000;
}
</style>

<script>
import echarts from 'echarts/dist/echarts.min.js'
var myChart = echarts.init(document.getElementById("shopCondition"));



var option = {
  //标题
  title: {
    text: "上周销量情况(万)",
    subtext: "2017年10月23日 - 2017年10月30日",
    x: "left", //主标题文字配置
    textStyle: {
      fontWeight: "bold",
      color: "#22252A",
      fontSize: 12,
      fontFamily: "PingFangSC-Medium",
      lineHeight: 12
    },
    subtextStyle: {
      fontFamily: "PingFangSC-Medium",
      fontSize: 12,
      color: "#868BA1",
      lineHeight: 12
    }
  },
  grid: {
    left: 56,
    top: 78,
    right: 0,
    width: "87%",
    height: 239
  }, //全局字体样式
  textStyle: {
    fontFamily: "PingFangSC-Medium",
    fontSize: 12,
    color: "#858E96",
    lineHeight: 12
  }, //提示框组件
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(255,255,255,0.70)",
    borderColor: "#BFC2C5",
    borderWidth: 1,
    textStyle: {
      color: "#22252A"
    }
  }, //x轴坐标
  //	calculable : true,
  xAxis: {
    show: true,
    type: "category", //坐标轴刻度设置
    axisLabel: {
      margin: 15
    }, //x坐标轴下刻度
    axisTick: {
      show: false
    }, //x坐标下数据点的位置设置
    boundaryGap: false,
    splitLine: {
      show: false
    },
    // 轴线设置
    axisLine: {
      lineStyle: {
        color: "rgba(91,147,211,0.30)"
      }
    },
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  yAxis: {
    type: "value",
    interval: 20,
    min: 0,
    max: 100,
    splitLine: {
      lineStyle: {
        color: ["#EAECEF"]
      }
    }, //刻度
    axisLabel: {
      margin: 15
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "#fff",
        width: 0.5
      }
    }
  },
  series: [
    {
      name: "",
      type: "line",
      symbol: "circle",
      symbolSize: 8,
      smooth: true,
      itemStyle: {
        normal: {
          color: "#5B93D3",
          borderColor: "#fff",
          borderWidth: 1
        }
      },
      label: {
        show: true
      }, //提示框位置
      data: [1,2,3],
      tooltip: {
        position: function(p, dom, rect, size) {
          return [size.x - 22, size.y + 17];
        },
        padding: [12, 9, 12, 10],
        formatter: "{c0}万",
        textStyle: {
          fontWeight: "bold",
          fontFamily: "PingFangSC-Medium",
          fontSize: 12,
          color: "#22252A",
          lineHeight: 12
        }
      },
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: "rgba(91,147,211,0.30)",
          opacity: 1
        }
      }
    }
  ]
};
// 绘制图标;
myChart.setOption(option);
export default {};
</script>


