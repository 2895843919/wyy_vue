// import Vue from 'vue'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
// Vue.use(Vuex)


export default createStore({

    state: {
        login_data: [],
        login_cookie: '',
        login_img: '',
        account_id: '',

        song_msg: [],

        song_img: '', //歌曲图片
        song_name: '', //歌名
        song_singer: '', //歌手
        song_id: '', //歌曲id
        song_dt: '', //歌曲时间
        song_url: '', //歌曲url

        song_time: '', //歌曲时间戳

        song_list: '', //歌单 模仿qq音乐的添加歌单形式

        now_index: '', //当前播放的歌曲在歌单中的index

        song_cat: '',

        account_nickname: '', //账户nickname

        account_lever: '' //账户网易云等级


    },
    mutations: {
        saveDate(state, login_data) {
            state.login_data = login_data
        },
        saveCookie(state, login_cookie) {
            state.login_cookie = login_cookie
        },
        saveImg(state, login_img) {
            state.login_img = login_img
        },
        saveAccountId(state, account_id) {
            state.account_id = account_id
        },

        saveSong_msg(state, song_msg) {
            state.song_msg = song_msg
        },


        saveSong_img(state, song_img) {
            state.song_img = song_img
        },
        saveSong_name(state, song_name) {
            state.song_name = song_name
        },
        saveSong_singer(state, song_singer) {
            state.song_singer = song_singer
        },
        saveSong_id(state, song_id) {
            state.song_id = song_id
        },
        saveSong_dt(state, song_dt) {
            state.song_dt = song_dt
        },
        saveSong_url(state, song_url) {
            state.song_url = song_url
        },

        saveSong_time(state, song_time) {
            state.song_time = song_time
        },
        saveSong_list(state, song_list) {
            state.song_list = song_list
        },

        saveNow_index(state, now_index) {
            state.now_index = now_index
        },

        saveSong_cat(state, song_cat) {
            state.song_cat = song_cat
        },

        saveNickName(state, account_nickname) {
            state.account_nickname = account_nickname
        },
        saveLever(state, account_lever) {
            state.account_lever = account_lever
        }

    },
    actions: {},
    // 在不进行其他设置的情况下，默认是将数据存储在localstorage中的
    plugins: [createPersistedState()],
})