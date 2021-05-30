<template>
<div>
    <div class="comment" v-show="commentObj.ishidd">
        <el-input
            type="textarea"
            :rows="2"
            :placeholder="commentObj.username? `回复：${commentObj.username}`: '请输入内容'"
            v-model="comment" @input="commentCentextInput">
        </el-input>
        <div>
            <div style="display: inline-block; padding: 6px 0;">
                <span class="pointer">表情</span>
                <span class="pointer" style="margin-left: 16px;">图片</span>
            </div>
            <span style="float: right;padding-top: 6px;">
                <el-button size="mini" type="primary" :disabled="!comment" @click="commentFn">评论</el-button>
            </span>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, getCcurrentInstance, nextTick,provide, inject } from 'vue'

export default defineComponent({
    components: { },
    props: {
        commentObj: Object,
    },
    setup (props, context) {
        const comment = ref('')
        watch([
            () => {
                return props.commentObj.comment
            }
            
        ], ([newValue], [oldValue]) => {
            comment.value = newValue
        })
        function commentCentextInput (val) {
            props.commentObj.setcomment(val);
        }
        function commentFn () {
            const params = {}
            if ('parent_id' in props.commentObj) {
                params.parent_id = props.commentObj.parent_id
            }
            props.commentObj.commentFn(params);
        }
        return {
            comment,
            commentCentextInput,
            commentFn,
        }
    }
})
</script>

<style lang="scss" scoped>
.comment {
    padding: 16px;
    margin: 10px 0;
    border-radius: 10px;
    background: linear-gradient(30deg, #ffcc0044, #ff14913a, #9b27b044);
    .comment2 {
        padding: 6px 20px;
        padding-right: 0px;
    }
}
.pointer {
    cursor: pointer;
    &:hover {
        color: #68aaec;
    }
} 
</style>