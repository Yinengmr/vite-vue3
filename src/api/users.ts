import request from "@/utils/request";

export const login = (data: any): any => {
    return request.post("/login", data);
};
