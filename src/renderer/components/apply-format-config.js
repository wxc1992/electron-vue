/**
 * 配置文件说明：
 * 该文件用于配置表格列字段对应的值的格式
 * 使用时序import该文件
 */
const separateAndReserve4 = 'reserve2Decimal:4|thousandSeparate';
const separate = 'thousandSeparate';
const reserve4 = 'reserve2Decimal:4';
const config = {
  'credit-rating': // moduleString，用于区分不同模块
    {
      s_total_assets_fake: separateAndReserve4, // 该对象的key需要设置为对应列的property值，value设置为需要使用的filter的名称，多个filter用|符号隔开，参数放在：后面
      s_region_gdp_fake: separateAndReserve4,
      s_debttoassets_fake: reserve4,
    },
  'position-bond': // 持仓 债券模块
    {
      remainderPeriod: reserve4, // 剩余期限
      costRatio: reserve4, // 成本收益率
      valuationRatio: reserve4, // 估价收益率（中债）
      fullMarketPrice: separateAndReserve4, // 全价市值（中债）
      proportion: reserve4, // 比重
      exerciseRemainderPeriod: reserve4, // 行权剩余期限
      totalProfitAndLoss: separateAndReserve4, // 总损益
      yesterdayTableProfitAndLoss: separateAndReserve4, // 昨日估值表盈亏
      ticketRate: reserve4, // 票面利率（当期）（%）
      costNetPrice: separateAndReserve4, // 成本净价
      costFullPrice: separateAndReserve4, // 成本全价
      amount: separate, // 持仓数量（张）
      latestFaceValue: separateAndReserve4, // 债券最新面值
      positionDenomination: separateAndReserve4, // 持仓面额
      netValuation: separateAndReserve4, // 估价净值（中债）
      netMarketPrice: separateAndReserve4, // 净价市值（中债 ）
      tableNetPrice: separateAndReserve4, // 估值表净价
      tableFullPrice: separateAndReserve4, // 估值表全价
      tableMarketPrice: separateAndReserve4, // 估值表净价市值
      tableFullMarketPrice: separateAndReserve4, // 估值表全价市值
      valuationTableRate: separateAndReserve4, // 估值表收益率
      valuationModifiedDuration: separateAndReserve4, // 估值修正久期
      exerciseModifiedDuration: separateAndReserve4, // 行权修正久期
      macquarieDuration: separateAndReserve4, // 麦考林久期
      updateDuration: separateAndReserve4, // 修正久期（到期）
      interest: separateAndReserve4, // 应收利息
      valuationIncrease: separateAndReserve4, // 估值增值
      beforeDayValuationYield: reserve4, // 上日估值收益率
      beforeTwoDayValuationYield: reserve4, // 上上日估值收益率
      yesterdayValuationIncrease: separateAndReserve4, // 昨日估值增值
      yesterdayInterest: separateAndReserve4, // 昨日应收利息
      yesterdayTableProfit: reserve4, // 昨日估值表收益（%）
    },
  'position-stock': {
    marketValue: separateAndReserve4,
    proportion: reserve4,
    marketPrice: reserve4,
    unitCost: reserve4,
  },
  'position-fund': {
    marketValue: separateAndReserve4,
    proportion: reserve4,
    marketPrice: reserve4,
    millionFundIncome: reserve4,
    totalNetValue: separateAndReserve4,
    unitCost: reserve4,
    unitCost: reserve4,
  },
  'position-deposit': {
    marketValue: separateAndReserve4,
    averageInterestRate: reserve4,
    cost: separateAndReserve4,
    profit: separateAndReserve4,
    totalInterest: separateAndReserve4,
    totalInterest: separateAndReserve4,
  },
  'position-buyback': {
    positionPrice: separateAndReserve4,
    proportion: reserve4,
  },
  'position-other': {
    assertMarketValue: separateAndReserve4,
    proportion: reserve4,
  },
  flowManagement: {
    price: separateAndReserve4,
    inflowAmount: separateAndReserve4,
    outflowAmount: separateAndReserve4,
  },
  'perform-fenbu': {
    interestIncome: separateAndReserve4,
    maturityIncome: separateAndReserve4,
    amortizedIncome: separateAndReserve4,
    allRateReturn: separateAndReserve4,
    fullValuationStart: reserve4,
    fullValuationEnd: reserve4,
    fullValuationChange: reserve4,
    differenceEffect: reserve4,
  },
  'perform-as': {
    tempCostRate: reserve4,
    costRatio: reserve4,
    costRedExercise: reserve4,
    valuationRatio: reserve4,
    tempValuationRedExercise: reserve4,
    valuationRedExercise: reserve4,
    updateDuration: reserve4,
    exerciseModifiedDuration: reserve4,
    valuationModifiedDuration: reserve4,
  },
  'perform-sy': {

  },
  'trandrecord-zonglan': {
    tradePrice: separateAndReserve4,
    positionDenomination: separateAndReserve4,
  },
  'trandrecord-zhaiquan': {
    amount: separate,
    tableNetPrice: separateAndReserve4,
    fullPrice: separateAndReserve4,
    maturityYield: reserve4,
    price: separateAndReserve4,
    money: separateAndReserve4,

  },
};
/**
 *
 * @param {*} moduleString 对应上面config里面的moduleString
 * @param {*} columnProperty 当前列的property值
 * 返回值：
 * 返回一个函数，该函数接收当前列的值，返回格式化之后值
 */
export function generateFormateHandler(moduleString, columnProperty) {
  const moduleConfig = config[moduleString];
  let formateHandler = cellValue => cellValue;
  if (!moduleConfig || !moduleConfig[columnProperty]) {
    return formateHandler;
  }
  const vueFilters = Vue.options.filters;
  const columnConfig = moduleConfig[columnProperty].split('|') || [];
  columnConfig.forEach((configItem) => {
    const handlerParamPair = configItem.split(':');
    const handlerName = handlerParamPair[0];
    const handlerParam = handlerParamPair[1];
    const nextHandler = formateHandler;
    formateHandler = cellValue => vueFilters[handlerName](nextHandler(cellValue), handlerParam || undefined);
  });
  return formateHandler;
}
export default generateFormateHandler;
