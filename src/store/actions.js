import {GETUSERINFO,GETCARDS,GETPAYRANK} from './mutation_types'
import {JIACHI,YONGQIANG} from '@/api/BASE_URL.js'
import axios from '@/api/'


export default{
    async [GETUSERINFO]({commit}){
        const result = await axios({
            url:`${JIACHI}`,
            method:'get',
            params:{
                r:'api/simpleapp/v1/user/info',
            }
        })
        if(result.code === 0){
            commit(GETUSERINFO,result.data)
        }
    },
    async [GETCARDS]({commit}){
        const result = await axios({
            url:`${YONGQIANG}`,
            method:'get',
            params:{
                r:'api/simpleapp/v1/cards/index',
                keyword:'',
                pages:'1'
            }
        })
        if(result.code === 0){
            commit(GETCARDS,result.data)
        }
    },

}