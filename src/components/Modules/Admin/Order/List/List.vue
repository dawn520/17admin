<template>
    <div class="list">
        <el-col :span="24" class='actions-top'>
            <el-button type='danger' icon='delete'
                       :disabled='batch_flag'
                       @click='deleteSlide(true)'>删除选中
            </el-button>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="slide_list"
                  v-loading.body="listLoading"
                  @selection-change='onSelectionChange'>

            <el-table-column
                    prop="id"
                    label="id"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="order_number"
                    label="订单号"
                    align="center"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="start_time"
                    label="订单开始时间"
                    align="center"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="end_time"
                    label="订单结束时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="下单时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    :width="260"
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='showPicture(scope.row.id)'></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="limit"
                    :total="slide_count"
                    style="float:right;">
            </el-pagination>
        </el-col>
        <!-- 图片弹出框 -->
        <el-dialog title="图片" v-model="dialogPictures">
            <div class="mod-order">
                <div class="hd clearfix">
                    <div class="fl">买家提供</div>
                </div>
                <div class="bd clearfix">
                    <div>
                        <h3>退款原因</h3>
                        <div>{{detail.reason}}:{{detail.reasonText}}</div>
                    </div>
                    <div>
                        <h3>退款说明</h3>
                        <div>{{detail.content}}</div>
                    </div>
                    <div>
                        <h3>图片详情</h3>
                        <div v-for="image in detail.images">
                            <a :href="image_host +'/' + image" target="_blank"><img
                                    :src="image_host +'/' + image + '?imageView2/1/w/45/h/45/q/75|imageslim'"/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mod-order">
                <div class="hd clearfix">
                    <div class="fl">卖家提供</div>
                </div>
                <div class="bd clearfix">
                    <div>
                        <h3>拒绝原因</h3>
                        <div>{{refuse.reason}}:{{detail.reasonText}}</div>
                    </div>
                    <div>
                        <h3>拒绝说明</h3>
                        <div>{{refuse.content}}</div>
                    </div>
                    <div>
                        <h3>图片详情</h3>
                        <div v-for="image in refuse.images" target="_blank">
                            <img :src="image_host +'/' + image + '?imageView2/1/w/45/h/45/q/75|imageslim'"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-input type="textarea" v-model="content"></el-input>
                <el-button type="primary" v-on:click="judge(1)">判断商家责任</el-button>
                <el-button type="primary" v-on:click="judge(2)">判断买家责任</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import ListJs from './List.js';

    module.exports = ListJs;
</script>
<style scoped lang='less'>
    .demo-form-inline {
        display: inline-block;
        float: right;
    }

    .btm-action {
        margin-top: 20px;
        text-align: center;
    }

    .actions-top {
        height: 46px;
    }

    .pagination {
        display: inline-block;
    }

    .mod-order {
        border: 1px solid #e0e0e0;
    }

    .mod-order .hd {
        padding: 0 20px;
        background-color: #f2f2f2;
        height: 34px;
        line-height: 34px;
    }

    .mod-order .hd .fr {
        cursor: pointer;
    }

    .mod-order .hd .icon-msg {
    }

    .mod-order .hd .icon-msg img {
        margin-right: 5px;
        margin-top: -5px;
    }

    .mod-order .bd {
        padding: 20px 0 20px 20px;
        align-items: center;
        justify-content: center;
    }

    .mod-order .bd img {
        width: 120px;
        height: 90px;
        margin-right: 10px;
    }
</style>
