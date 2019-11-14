<template>
    <div class="percentage">
        <!-- <div v-if="percentVal && porpname=='generalRevenue'" class="bar" :style="{width:percentVal+'%'}"></div> -->
        <div v-if="percentVal &&(porpname=='gdp' || porpname=='governmentFundRevenue' ||  porpname=='generalRevenue') " class="bar" :style="{width:percentVal+'%'}"></div>
        <div v-if="percentVal && (porpname=='debtRate' ||porpname=='areaDebtBalance' || porpname=='cityInvestDebtBalance' )" class="bar1" :style="{width:percentVal+'%'}"></div>
        <div v-else class="bar noBorder"></div>
        <div class="text">{{value}}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // column.prop=='generalRevenue' || column.prop=='gdp'||column.prop=='debtRate'
    };
  },
  props: ['base', 'value', 'porpname'],
  computed: {
    percentVal() {
      // console.log(this.base+'---------'+this.value+'--'+this.porpname)
      const base = this.base;
      const value = this.value;
      if (!base || !value || isNaN(base) || isNaN(value)) {
        return '';
      }
      const percent = parseFloat(value) / parseFloat(base) * 100;
      // console.log('get percent:',percent)
      return percent;
    },
  },
};
</script>
<style scoped>
    .percentage{
        height:25px;
        position:relative;
        width:100%;
        /* border:1px solid #ddd; */
    }
    .percentage .bar{
        background:linear-gradient(to right,#6bbbc8,#fff);
        /* border:1px solid #e6990c; */
        box-sizing: border-box;
        height:100%;
        position: absolute;
    }
    .percentage .bar1{
        background:linear-gradient(to right,#d04d01,#fff);
        /* border:1px solid #e6990c; */
        box-sizing: border-box;
        height:100%;
        position: absolute;
    }
    .percentage .bar2{
        background:linear-gradient(to right,#d04d01,#fff);
        /* border:1px solid #e6990c; */
        box-sizing: border-box;
        height:100%;
        position: absolute;
    }
    .percentage .bar.noBorder{
        border:none;
    }
    .percentage .text{
        position:absolute;
        text-align: center;
        height:100%;
        width:100%;
    }
</style>

