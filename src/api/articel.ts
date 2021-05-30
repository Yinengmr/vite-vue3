import request from '@/utils/request'

export const getArticelList = (data?: any): any => {
    return request({
        url: '/articel/list',
        method: 'get',
        params: data,
    })
}

export const createArticel = (data?: any): any => {
    return request({
        url: '/articel/create',
        method: 'post',
        data: data,
    })
}
/**
 * @function like 文章点赞
 * @param data 参数 article_id：目标id source_type：来源
 * @returns 
 */
export const like = (data?: any): any => {
    return request({
        url: '/articel/like',
        method: 'post',
        data: data,
    })
}
export const source = (data?: any): any => {
    return request({
        url: '/articel/source',
        method: 'get',
        params: data,
    })
}
/**
 * @function comment 获取文章评论
 * @param params 参数
 * @returns 
 */
export const comment = (data?: any): any => {
    return request({
        url: '/comment/article',
        method: 'get',
        params: data,
    })
}
/**
 * @function addcomment 评论文章或者回复评论
 * @param data type_id=1  &content=哈哈  &parent_id=5
 * @returns 
 */
export const addcomment = (data?: any): any => {
    return request({
        url: '/comment/article',
        method: 'post',
        data: data,
    })
}
/**
 * @function commentLike 评论点赞
 * @param data 参数 article_id：目标id source_type：评论来源
 * @returns 
 */
export const commentLike = (data?: any): any => {
    return request({
        url: '/comment/like',
        method: 'post',
        data: data,
    })
}

