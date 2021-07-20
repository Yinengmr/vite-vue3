<template>
    <div>
        <el-container>
            <div v-if="loading" style="width: 100%">
                <div>
                    <span>{{ articleSource.author }}</span>
                    <span>{{ ` ${articleSource.update_at} ` }}</span>
                    <span>{{ articleSource.cate }}</span>
                </div>
                <div></div>
                <h1>{{ articleSource.title }}</h1>
                <div style="font-size: 1rem; padding: 1.5rem 0">正文：</div>

                <div class="markdown-body" v-html="postHtml"></div>

                <div style="font-size: 1rem; padding: 1.5rem 0">
                    <span class="pointer" @click="articlelike(articleSource)">
                        <i
                            :class="{
                                'icon-aixin1': articleSource.userlike,
                                'icon iconfont icon-aixin': true,
                            }"
                        ></i>
                        ({{ articleSource.likes }})
                    </span>
                    <span
                        class="pointer"
                        @click="articleComment(articleSource)"
                        style="margin-left: 16px"
                    >
                        <i class="icon iconfont pinglun"></i>
                        评论:({{ articleSource.comments }})
                    </span>
                </div>
                <div>
                    <Comment
                        v-if="articleSource.commentObj"
                        :commentObj="articleSource.commentObj"
                        key="top"
                    />
                    <div
                        v-for="item in comments.filter(
                            (item) => !item.parent_id
                        )"
                        :key="item.id"
                        class="comment"
                    >
                        <div>
                            {{ item.username }}
                        </div>
                        <div>
                            {{ item.content }}
                        </div>
                        <div>
                            {{ item.creat_at }}
                            <span
                                @click="itemComment(item)"
                                style="float: right; margin-left: 16px"
                                class="pointer"
                            >
                                <i class="icon iconfont icon-pinglun"></i>
                                回复
                            </span>
                            <span
                                style="float: right"
                                @click="commentlike(item)"
                                class="pointer"
                            >
                                <i
                                    :class="{
                                        'icon-aixin1': item.userlike,
                                        'icon iconfont icon-aixin': true,
                                    }"
                                ></i>
                                ({{ item.likes }})
                            </span>
                        </div>
                        <Comment
                            v-if="item.commentObj"
                            :commentObj="item.commentObj"
                            :key="item.id"
                        />
                        <div
                            v-for="item2 in comments.filter((ii) => {
                                return ii.parent_id && ii.parent_id == item.id;
                            })"
                            :key="item2.id"
                            class="comment2"
                        >
                            <div>
                                {{ item2.username }}
                            </div>
                            <div>
                                {{ item2.content }}
                            </div>
                            <div>
                                {{ item2.creat_at }}
                                <span
                                    @click="itemComment(item2)"
                                    style="float: right; margin-left: 16px"
                                    class="pointer"
                                >
                                    <i class="icon iconfont icon-pinglun"></i>
                                    回复
                                </span>
                                <span
                                    style="float: right"
                                    @click="commentlike(item2)"
                                    class="pointer"
                                >
                                    <i
                                        :class="{
                                            'icon-aixin1': item2.userlike,
                                            'icon iconfont icon-aixin': true,
                                        }"
                                    ></i>
                                    ({{ item2.likes }})
                                </span>
                            </div>
                            <Comment
                                v-if="item2.commentObj"
                                :commentObj="item2.commentObj"
                                :key="item2.id"
                            />
                            <el-divider style="margin: 10px 0"></el-divider>
                            <div
                                v-for="item3 in comments.filter((iii) => {
                                    return (
                                        iii.parent_id &&
                                        iii.parent_id == item2.id
                                    );
                                })"
                                :key="item3.id"
                            >
                                <div>
                                    {{ item3.username }}
                                </div>
                                <div>
                                    回复 {{ item2.username }}:{{
                                        item3.content
                                    }}
                                </div>
                                <div>
                                    {{ item3.creat_at }}
                                    <span
                                        @click="itemComment(item3, 3)"
                                        style="float: right; margin-left: 16px"
                                        class="pointer"
                                    >
                                        <i
                                            class="icon iconfont icon-pinglun"
                                        ></i>
                                        回复
                                    </span>
                                    <span
                                        style="float: right"
                                        @click="commentlike(item3)"
                                        class="pointer"
                                    >
                                        <i
                                            :class="{
                                                'icon-aixin1': item3.userlike,
                                                'icon iconfont icon-aixin': true,
                                            }"
                                        ></i>
                                        ({{ item3.likes }})
                                    </span>
                                </div>
                                <Comment
                                    v-if="item3.commentObj"
                                    :commentObj="item3.commentObj"
                                />
                                <el-divider style="margin: 10px 0"></el-divider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧 -->
            <el-aside class="aside" width="240px"> </el-aside>
        </el-container>
    </div>
</template>
<script lang="ts">
import router from "@/router";
import { ElMessage as Message } from "element-plus";

import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import "github-markdown-css";
import * as md_cont from "markdown-it-container";
import * as md_it_inline from "markdown-it-for-inline";

const markDownIt = new MarkdownIt({ html: true })
    .use(emoji)
    .use(md_cont, "spoiler", {
        validate: function (params) {
            return params.trim().match(/^spoiler\s+(.*)$/);
        },

        render: function (tokens, idx) {
            var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

            if (tokens[idx].nesting === 1) {
                // opening tag
                return (
                    "<details><summary>" +
                    md.utils.escapeHtml(m[1]) +
                    "</summary>\n"
                );
            } else {
                // closing tag
                return "</details>\n";
            }
        },
    })
    .use(md_it_inline, "url_new_win", "link_open", function (tokens, idx) {
        var aIndex = tokens[idx].attrIndex("target");

        if (aIndex < 0) {
            tokens[idx].attrPush(["target", "_blank"]);
        } else {
            tokens[idx].attrs[aIndex][1] = "_blank";
        }
    });

import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    computed,
    watch,
    nextTick,
    provide,
    inject,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { source, like, comment, commentLike, addcomment } from "@/api/articel";

import Comment from "@/views/Components/Comment.vue";
router.beforeEach(async (to, from, next) => {
    console.log("hahah", router, to.path);
    next();
});
export default defineComponent({
    components: {
        Comment,
    },
    setup(props, context) {
        const router = useRouter();
        const route = useRoute();

        const article_id = route.params.article_id;
        const loading = ref(false);
        // 文章
        let articleSource = ref({});
        // 评论对象数据
        const obj = {
            ishidd: false,
            comment: "",
            commentFn: async (params = {}) => {
                await addcomment({
                    type_id: article_id,
                    content: obj.comment,
                    ...params,
                }).then((res: any) => {
                    if (res.rv == 200) {
                        console.log(this);

                        Message({
                            message: "评论成功！",
                            type: "success",
                            duration: 1200,
                        });
                        getData();
                        getComment();
                    }
                });
            },
            setcomment: (val: string) => {
                console.log(val);
                obj.comment = val;
            },
        };

        // 查询文章详情
        async function getData() {
            await source({ article_id, source_type: "web" }).then(
                (res: any) => {
                    console.log(res.data[0]);
                    if (res.rv == 200) {
                        articleSource.value = {
                            ...res.data[0],
                            commentObj: {
                                ...obj,
                                ishidd: true,
                            },
                        };
                        nextTick(() => {
                            loading.value = true;
                        });
                    }
                }
            );
        }
        getData();
        // 评论列表
        const comments = ref([]);
        async function getComment() {
            await comment({ type_id: article_id }).then((res: any) => {
                // console.log(res.data);
                comments.value = res.data;
            });
        }
        getComment();
        // 评论点赞
        async function commentlike(item: any) {
            await commentLike({ comment_id: item.id, source_type: "web" }).then(
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
        // 文章点赞
        async function articlelike(item: any) {
            await like({ article_id, source_type: "web" }).then((res: any) => {
                if (res.rv == 200) {
                    item.userlike = res.like;
                    item.likes = res.like
                        ? `${Number(item.likes) + 1}`
                        : `${Number(item.likes) - 1}`;
                }
            });
        }
        // 文章评论
        function articleComment(item: any, level = 1) {
            console.log(item, level);
            item.commentObj.ishidd = !item.commentObj.ishidd;
        }
        function itemComment(item: any, level = 1) {
            console.log(item, level);

            if (!("commentObj" in item)) {
                item.commentObj = {
                    ...obj,
                    username: item.username,
                    parent_id: level > 2 ? item.parent_id : item.id,
                };
            }
            item.commentObj.ishidd = !item.commentObj.ishidd;
        }
        const postHtml = computed(() => {
            return markDownIt.render(articleSource.value.content || "# hello");
        });
        return {
            getData,
            articleSource,
            loading,
            comments,
            commentlike,
            articlelike,

            articleComment,
            itemComment,

            postHtml,
        };
    },
});
</script>
<style lang="scss" scoped>
.comment {
    padding: 16px;
    margin: 10px 0;
    border-radius: 10px;
    background: linear-gradient(30deg, #ffcc0044, #ff14913a, #9b27b044);
    .comment2 {
        padding: 6px 30px;
        padding-right: 0px;
    }
}
.pointer {
    cursor: pointer;
    &:hover {
        color: #68aaec;
    }
}
@media screen and (max-width: 960px) {
    .aside {
        display: none;
    }
}
.aside {
    margin-top: 10px;
    margin-left: 18px;
    border-radius: 10px;
    background: linear-gradient(30deg, #ffcc0044, #ff14913a, #9b27b044);
}
</style>
