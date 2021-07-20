import request from "@/utils/request";

export const getArticelList = (data?: any): any => {
    return request.get("/articel/list", data);
};

export const createArticel = (data?: any): any => {
    return request.post("/articel/create", data);
};
/**
 * @function like 文章点赞
 * @param data 参数 article_id：目标id source_type：来源
 * @return
 */
export const like = (data?: any): any => {
    return request.post("/articel/like", data);
};
/**
 * @function source 文章详情
 * @param data 参数
 * @return
 */
export const source = (data?: any): any => {
    return request.get("/articel/source", data);
};
/**
 * @function comment 获取文章评论
 * @param params 参数
 * @return
 */
export const comment = (data?: any): any => {
    return request.get("/comment/article", data);
};
/**
 * @function addcomment 评论文章或者回复评论
 * @param data type_id=1  &content=哈哈  &parent_id=5
 * @return
 */
export const addcomment = (data?: any): any => {
    return request.post("/comment/article", data);
};
/**
 * @function commentLike 评论点赞
 * @param data 参数 article_id：目标id source_type：评论来源
 * @return
 */
export const commentLike = (data?: any): any => {
    return request.post("/comment/like", data);
};
