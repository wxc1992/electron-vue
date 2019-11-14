<template>
    <div class="account-select">
        <div class="head">
            <span>组合账户</span>
            <a href="javascript:;" class="close">x</a>
        </div>
        <div class="name-list">
            <label for="" class="search">
                <input type="text">
            </label>
            <table>
                <tr>
                    <th><input type="checkbox">全选</th>
                    <th>名称</th>
                    <th>机构</th>
                    <th>投资经理</th>
                    <th>权限</th>
                    <th>编辑时间</th>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>Demo</td>
                    <td>本地</td>
                    <td>猪猪</td>
                    <td>只读</td>
                    <td>09-11 10:19</td>
                </tr>
            </table>
            <p class="account-num">已选0个账户</p>
        </div>
        <button class="confirm">确定</button>
    </div>
</template>
<script>
export default {

};
</script>
<style scoped lang="less">
.account-select{
    width:750px;
    height:430px;
    background:#fff;
    text-align: center;
}
.head{
    height:50px;
    position: relative;
    line-height: 50px;
    background: #ECECEC;
    padding:0 29px;
    font-size: 18px;
    color: #3D3D3D;
    font-family: PingFangSC-Semibold;
    letter-spacing: 0.34px;
    text-align: left;
}
.close{
    text-decoration: none;
    right:0;
    position: absolute;
}
.name-list{
    width:600px;
    margin:0 auto;
    overflow: hidden;
    .search{       
        margin:0 auto;
        margin-top:32px;
        border: 1px solid #D8D8D8;
        border-radius: 4px;
        width:287px;
        height:26px;
        display:block;
        background:url(../assets/images/search.png) no-repeat 10px center;
        input{
            border:none;
            margin-left:40px;
            width:247px;
            height:24px;
        }
    }
    table{
        margin-top:19px;
        // height:160px;
        width:600px;
        border-collapse: collapse;
        tr:nth-child(odd){
            background: #F7F7F7;
        }
        th{
            background: #ECECEC;
            border: 1px solid #D8D8D8;
            width:99px;
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #969696;
            letter-spacing: 0.3px;
            input{
                margin-right: 5px;
            }
        }
    }
    th{
        height:40px;
    }
    td{
        height:30px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #898989;
        letter-spacing: 0.23px;
        input{
            margin-right: 8px;
        }
    }
}
.confirm{
    width:125px;
    height:37px;
    background: #448EFE;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0.34px;
    margin-top:29px;
}
.account-num{
    float:left;
    margin-top:17px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #969696;
    letter-spacing: 0.3px;
}
</style>


