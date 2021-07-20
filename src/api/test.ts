import request from "@/utils/request";

export const test = (data: any): any => {
    return request.post("/like", data);
};
