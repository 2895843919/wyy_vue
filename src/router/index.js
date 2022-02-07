import { createRouter, createWebHashHistory } from 'vue-router'

import header_ from '../components/header_/index.vue' //头部组件
import footer_ from '../components/footer_/index.vue' //底部
import discover from '../components/discover/index.vue' //发现音乐
import my_music from '../components/my_music/index.vue' //我的音乐
import recommend from '../views/recommend/index.vue' //推荐
import songlist from '../views/song/songlist.vue' //songlist
import playlist from '../views/playlist/index.vue' //歌单页
import playlist_all from '../views/playlist/All.vue' //歌单页
import taste from '../views/taste/index.vue' //每日推荐歌单
import search from '../views/search/index.vue' //每日推荐歌单
import album from '../views/album/album.vue' //每日推荐歌单
import album_item from '../views/album/album_item.vue' //每日推荐歌单

import { top_album, album_new, album_new_offset } from "../utils/request.js";
const Router = createRouter({
    history: createWebHashHistory(),
    // linkActiveClass:'active',
    routes: [{
            path: '/',
            redirect: '/discover',

        },
        {
            path: '/header_',
            name: 'header_',
            // component: header_
            component: () =>
                import ('../components/header_/index.vue')
        },
        {
            path: '/discover',
            name: 'discover',
            component: discover,
            meta: { keepAlive: true },
            // redirect: '/discover/recommend',
            children: [

                // {
                //   path: '/',
                //   component: '/discover/recommend',
                //   meta: { keepAlive: true },
                // },
                {
                    path: '/discover/recommend',
                    name: 'recommend',
                    // component: recommend,
                    component: () =>
                        import ('../views/recommend/index.vue'),
                    meta: { keepAlive: true }
                },
                {
                    // path: `/discover/playlist?id=:id`,
                    path: '/discover/playlist_item',
                    name: 'playlist',
                    // component: playlist,
                    component: () =>
                        import ('../views/playlist/index.vue'),
                    props: true,
                    meta: { keepAlive: true }
                },
                {
                    path: `/discover/playlist`,
                    name: 'playlist_all',
                    // component: playlist_all,
                    component: () =>
                        import ('../views/playlist/All.vue'),
                    props: true,
                    meta: { keepAlive: true }
                },
                {
                    path: '/discover/album',
                    name: 'album',
                    // component: album,
                    component: () =>
                        import ('../views/album/album.vue'),
                    meta: { keepAlive: true }
                },
                {
                    path: `/album_item`,
                    name: 'album_item',
                    // component: album_item,
                    component: () =>
                        import ('../views/album/album_item.vue'),
                    props: true
                },

                {
                    path: `/discover/song_list`,
                    name: 'songlist',
                    component: () =>
                        import ('../views/song/songlist.vue'),
                    meta: { keepAlive: true }

                },
                {
                    path: `/discover/taste`, //个人推荐
                    name: 'taste',
                    component: () =>
                        import ('../views/taste/index.vue')
                },
                {
                    path: '/discover/singer',
                    name: 'singer',
                    // component: search,
                    component: () =>
                        import ('../views/singer/index.vue'),
                    props: true,
                    meta: { keepAlive: true }
                },
                {
                    path: '/discover/singer_item',
                    name: 'singer_item',
                    // component: search,
                    component: () =>
                        import ('../views/singer/singer_item.vue'),
                    props: true,
                    meta: { keepAlive: true }
                },

            ],
            redirect: '/discover/recommend'
        },
        {
            path: '/search',
            name: 'search',
            // component: search,
            component: () =>
                import ('../views/search/index.vue'),
            props: true,
            meta: { keepAlive: true }
        },


        {
            path: '/footer_',
            name: 'footer_',
            // component: footer_,
            component: () =>
                import ('../components/footer_/index.vue'),
            meta: { keepAlive: true }

        },
        {
            path: '/my',
            name: 'my',
            // component: my_music,
            component: () =>
                import ('../components/my_music/index.vue'),
            meta: { keepAlive: true }

        }
    ],
})

// })


export default Router