// 引入封装的axios
import axios from './axios.js'
// const Cookie=this.$store.state.login_cookie

// 登录
export function login(params) {
    return axios.get(`/login/cellphone`, {
        params: {
            phone: params.phone,
            password: params.password
        },
    })
}
// 退出登录
export function logout() {
    return axios.get(`/logout`, )
}
// 登录状态
export function status(query) {
    return axios.get(`/login/status`, {
        cookie: query.cookie
    })
}
// 刷新登录
export function login_refresh(params) {
    return axios.post(`/login/refresh`, {
        params: {
            cookie: params.cookie,
        },
    })
}
// 获取账号信息
export function account(params) {
    return axios.get(`/user/account`, {
        params: {
            cookie: params.cookie
        }
    })
}
// 获取用户等级信息
export function user_level(params) {
    return axios.get(`/user/level`, {
        params: {
            cookie: params.cookie
        }
    })
}
// 轮播图
export function banner() {
    return axios.get(`/banner`)
}
// 热门歌曲
export function hotPlaylist() {
    return axios.get(`/playlist/hot`, {
        params: { limit: 8 }
    })
}

// 获取歌单详情
export function playlist_detail(params) {
    return axios.get(`/playlist/detail`, {
        params: {
            id: params.id,
            cookie: params.cookie
        }
    })
}
// 获取歌曲详情
export function song_detail(params) {
    return axios.get(`/song/detail`, {
        params: {
            ids: params.ids,
        }
    })
}
// 歌单评论
export function comment_playlist(params) {
    return axios.get(`/comment/playlist`, {
        params: {
            id: params.id,
            limit: 100
        }
    })
}
// 推荐歌单
export function recommend_songs_list() {
    return axios.get(`/personalized`, {
        params: { limit: 8 }
    })
}
// 获取精品歌单
export function playlist_hightquality(params) {
    return axios.get(`/top/playlist/highquality`, {
        params: {
            // before:'',
            cat: params.cat,
            before: params.before,
            limit: 100
        }
    })
}
// 歌单分类
export function playlist_catlist() {
    return axios.get(`/playlist/catlist`, {})
}

//  格式化歌曲时间
export function dt_data(t) {
    let n = t / 1000;
    let number =
        (Math.floor(n / 60) < 10 ? "0" + Math.floor(n / 60) : "") +
        ":" +
        (Math.floor(n % 60) < 10 ?
            "0" + Math.floor(n % 60) :
            Math.floor(n % 60));
    return number;
}

//   获取用户歌单
export function user_playlist(id) {
    return axios.get(`/user/playlist`, {
        params: {
            uid: id
        }
    })
}

// 个性化推荐  个性化推荐的后3个歌单
// 相关歌单推荐
export function recommend_resource(params) {
    return axios.get(`/recommend/resource`, {
        params: {
            cookie: params.cookie,
        }
    })
}

//获取每日推荐歌曲  个性化推荐的第一个歌单
// 接口地址 : /recommend/songs
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
export function recommend_songs(params) {
    return axios.get(`/recommend/songs`, {
        params: {
            cookie: params.cookie
        }
    })
}

//获取音乐 url
export function song_url(params) {
    return axios.get(`/song/url`, {
        params: {
            id: params.id,
        }
    })
}

//搜索
export function search(params) {
    return axios.get(`/search`, {
        params: {
            keywords: params.keywords,
            type: params.type
        }
    })
}
//新碟上架  获取新碟信息
export function top_album_list(params) {
    return axios.get(`album`, {
        params: {
            id: params.id,
        }
    })
}
// 歌单 ( 网友精选碟 )
export function top_playlist(params) {
    return axios.get(`/top/playlist`, {
        params: {

            cat: params.cat,
            offset: params.offset,
            limit: 100
        }
    })
}
//新碟上架
export function top_album() {
    let res = axios.get(`/top/album`).then(res => {
        return res.monthData.splice(0, 10)
    })
    return res
        // return axios.get('/top/album')
}
//全部新碟
export function album_new() {
    return axios.get(`/album/new`, {
        params: {
            limit: 100
        }
    })
}
export function album_new_offset(params) {
    return axios.get(`/album/new`, {
        params: {
            offset: params.offset,
            limit: 100
        }
    })
}
//专辑评论
export function Comment_album(params) {
    return axios.get(`/comment/album`, {
        params: {
            id: params.id
        }
    })
}
//热门歌手
export function Artist_list(params) {
    return axios.get(`/artist/list`, {
        params: {
            type: params.type,
            area: params.area
        }
    })
}
//获取歌手详情
export function Artist_detail() {
    return axios.get(`/artist/detail`, {
        params: {
            id: params.id
        }
    })
}
//获取相似歌手
export function simi_artist(params) {
    return axios.get(`/simi/artist`, {
        params: {
            id: params.id
        }
    })
}
//获取歌手单曲
export function artists(params) {
    return axios.get(`/artists`, {
        params: {
            id: params.id
        }
    })
}
//喜欢音乐
export function Like(params) {
    return axios.get(`/like`, {
        params: {
            //    id:params.id
            id: params.id
        }
    })
}