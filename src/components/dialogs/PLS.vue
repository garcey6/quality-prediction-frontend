<template>
    <div class="pls-modal">
        <div class="pls-form">
            <!-- 关闭按钮 -->
            <div class="close-btn-container">
                <span class="close-btn" @click="$emit('close')">×</span>
            </div>

            <!-- 标题 -->
            <h3 class="dialog-title">PLS预测</h3>

            <div class="form-content">
                <el-form label-position="top">
                </el-form>
            </div>

            <div class="form-footer">
                <el-button @click="$emit('cancel')">取消</el-button>
                <el-button type="primary" @click="handleSubmit" :loading="loading">
                    开始预测
                </el-button>
            </div>

            <!-- 结果显示区域 -->
            <div v-if="result" class="result-section">
                <h4>预测结果</h4>
                <div>均方误差(MSE): {{ result.mse.toFixed(4) }}</div>
                <div>R²得分: {{ result.r2_score.toFixed(4) }}</div>
                <div>使用主成分数: {{ result.n_components }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { predictPLS } from '../../api/pls';
import { mapMutations } from 'vuex';

export default {
    props: {
        node: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            loading: false,
            result: null
        }
    },
    methods: {
        ...mapMutations(['setModelType']),
        
        async handleSubmit() {
            this.loading = true;
            try {
                const response = await predictPLS();
                
                if (!response.data || response.data.status === 'error') {
                    throw new Error(response.data?.message || 'PLS预测失败');
                }

                // 修改为从response.data.data中获取结果
                this.result = {
                    mse: response.data.data.mse || 0,
                    r2_score: response.data.data.r2_score || 0,
                    n_components: response.data.data.n_components || 0
                };
                
                this.$message.success('PLS预测完成');
                this.setModelType('pls');
                
            } catch (error) {
                const errorMsg = error.response?.data?.message || error.message || 'PLS预测失败';
                this.$message.error(errorMsg);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.pls-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.pls-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: relative;
}

.dialog-title {
    margin: 0 0 20px 0;
    text-align: center;
    color: #333;
}

.close-btn-container {
    position: absolute;
    top: 10px;
    right: 10px;
}

.close-btn {
    color: #000;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
}

.close-btn:hover {
    color: #666;
}

.form-content {
    margin: 20px 0;
}

.form-footer {
    margin-top: 20px;
    text-align: right;
}

.result-section {
    margin-top: 30px;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 4px;
}

.result-section h4 {
    margin-top: 0;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
}
</style>