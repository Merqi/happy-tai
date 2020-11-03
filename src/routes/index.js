//一层
import Home from 'components/Home/Home.vue'

//二层
import User from 'pages/User/User.vue'
import Pay from 'pages/Pay/Pay.vue'
import Water from 'pages/Water/Water.vue'
import Control from 'pages/Control/Control.vue'
import Member from 'pages/Member/Member.vue'
import Pay_rank from 'pages/Pay_rank/Pay_rank.vue'
import Cue_rank from 'pages/Cue_rank/Cue_rank.vue'

//三层water
import Add from 'pages/Add/Add.vue'
import Add_water from 'pages/Add_water/Add_water.vue'
import Detail from 'pages/Detail/Detail.vue'
import Control_detail from 'pages/Control_detail/Control_detail.vue'
import Password from 'pages/Password/Password.vue'

//登录注册 忘记密码
import Login from 'pages/Login/Login.vue'
import Deal from 'pages/Deal/Deal.vue'
import Enroll from 'pages/Enroll/Enroll.vue'
import Forget from 'pages/Forget/Forget.vue'

export default [
    //一层
    {path:'/Home',component:Home,meta:{index:1}},
    //二层
    {path:'/User',component:User,meta:{index:2}},
    {path:'/Pay',component:Pay,meta:{index:2}},
    {path:'/Water',component:Water,meta:{index:2}},
    {path:'/Control',component:Control,meta:{index:2}},
    {path:'/Member',component:Member,meta:{index:2}},
    {path:'/Pay_rank',component:Pay_rank,meta:{index:2}},
    {path:'/Cue_rank',component:Cue_rank,meta:{index:2}},
    //三层 water
    {path:'/Add',component:Add,meta:{index:3}},
    {path:'/Add_water',component:Add_water,meta:{index:3}},
    {path:'/Detail',component:Detail,meta:{index:3}},
    {path:'/Control_detail',component:Control_detail,meta:{index:3}},
    {path:'/Password',component:Password,meta:{index:3}},
    //登录注册 忘记密码
    {path:'/Login',component:Login,meta:{index:0}},
    {path:'/Deal',component:Deal,meta:{index:1}},
    {path:'/Enroll',component:Enroll,meta:{index:1}},
    {path:'/Forget',component:Forget,meta:{index:1}},
    {path:'/',redirect: '/Login'}
]