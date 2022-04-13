import { Axios } from "./Axios";

function searchByKeyword(value,pageId) {
    return Axios.get("?q="+value+"&pageSize=10&page="+pageId+"&apiKey=33426eaf1f124fe0b7c3eb9277daa942");
}

export const authService = {
    searchByKeyword,
};