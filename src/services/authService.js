import { Axios } from "./Axios";

function searchByKeyword(value,pageId) {
    return Axios.get("?q="+value+"&pageSize=10&page="+pageId+"&apiKey=c2eff9224edd4d97946e20bcbc870c34");
}

export const authService = {
    searchByKeyword,
};