import {request,request1} from './request.js'
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
export function getHomeGoods(type,page){
    return request1({
        url:'/api/n3/home/data',
        params:{
            type,
            page
        }
    })
}