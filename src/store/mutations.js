import {GETUSERINFO,GETCARDS,GETPAYRANK} from './mutation_types'

export default{
    [GETUSERINFO](state,result){
        state.userInfo = result
    },
    [GETCARDS](state,result){
        state.cards = result
    },
    [GETPAYRANK](state,result){
        state.payRank = result
    }
}