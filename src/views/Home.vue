<template>
    <div :class="$style.container">
        <el-container>
            <div style="width: 100%">
                <ul class="articelList">
                    <!-- 文章列表 -->
                    <li v-for="item in data" :key="item.id" class="articelItem">
                        <div class="item">
                            <div>
                                {{ item.author }} {{ item.update_at }}
                                {{ item.cate }}
                            </div>
                            <div
                                style="
                                    margin: 0.5rem 0 1rem;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    white-space: nowrap;
                                "
                            >
                                <a :href="`/#/articel/${item.id}`">
                                    <span @click.stop="source(item.id)">{{
                                        item.title
                                    }}</span>
                                </a>
                            </div>
                            <div>
                                <span @click="userLike(item)">
                                    <i
                                        :class="{
                                            'icon-aixin1': item.userlike,
                                            'icon iconfont icon-aixin': true,
                                        }"
                                    ></i>
                                    ({{ item.likes }})
                                </span>
                                <span style="padding: 0 10px">
                                    <i class="icon iconfont icon-pinglun"></i>
                                    ({{ item.comments }})
                                </span>
                                <span>
                                    <i class="icon iconfont icon-yanjing"></i>
                                    ({{ item.hot }})
                                </span>
                            </div>
                            <!-- {{ item }} -->
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 右侧 -->
            <el-aside class="aside" width="240px"> </el-aside>
        </el-container>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    watch,
    getCurrentInstance,
    nextTick,
    provide,
    inject,
} from "vue";
import { getArticelList, like } from "@/api/articel";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    components: {},
    setup() {
        const router = useRouter();
        const them = inject("them");
        console.log(them.value);
        setTimeout(() => {
            console.log(them.value);
        }, 2000);
        const data = ref([]);
        async function getData() {
            await getArticelList({}).then((res: any) => {
                data.value = res.data;
            });
        }
        async function userLike(item: any) {
            await like({ article_id: item.id, source_type: "web" }).then(
                (res: any) => {
                    if (res.rv == 200) {
                        item.userlike = res.like;
                        item.likes = res.like
                            ? `${Number(item.likes) + 1}`
                            : `${Number(item.likes) - 1}`;
                    }
                }
            );
        }
        function source(id: any) {
            return router.push({
                path: `/articel/${id}`,
                params: {
                    article_id: id,
                },
            });
        }
        getData();
        return {
            data,
            getData,
            userLike,
            source,
        };
    },
});
</script>
<style module lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .aside {
        display: none;
    }
}
.articelList {
    width: 100%;
    padding: 0;
}
.aside {
    margin-top: 10px;
    margin-left: 18px;
    border-radius: 10px;
    background: linear-gradient(30deg, #ffcc0044, #ff14913a, #9b27b044);
}

.articelItem {
    display: flex;
    padding: 10px;
    border-radius: 10px;
    background: linear-gradient(30deg, #ffcc0044, #ff14913a, #9b27b044);
    margin: 10px 0;
    .item {
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    &:hover {
        cursor: pointer;
        background: linear-gradient(30deg, #ffcc0062, #ff14915b, #9b27b069);
    }
}
.icon-aixin1 {
    color: #6cbd45;
}
</style>
