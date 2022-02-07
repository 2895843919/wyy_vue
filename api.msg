---获取音乐 url
必选参数 : id : 音乐 id
接口地址 : /song/url
调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312

---搜索
必选参数 : keywords : 关键词
接口地址 : /search 或者 /cloudsearch(更全)
调用例子 : /search?keywords= 海阔天空 /cloudsearch?keywords= 海阔天空

---获取用户歌单
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
必选参数 : uid : 用户 id
接口地址 : /user/playlist
调用例子 : /user/playlist?uid=32953014

---更新歌单
必选参数 :
id:歌单id;name:歌单名字;desc:歌单描述;tags:歌单tag ,多个用 `;` 隔开,只能用官方规定标签
接口地址 : /playlist/update
调用例子 : /playlist/update?id=24381616&name=新歌单&desc=描述&tags=欧美

---心动模式/智能播放
说明 : 登录后调用此接口 , 可获取心动模式/智能播放列表 必选参数 : id : 歌曲 id
pid : 歌单 id
接口地址 : /playmode/intelligence/list
调用例子 : /playmode/intelligence/list?id=33894312&pid=24381616 , /playmode/intelligence/list?id=33894312&pid=24381616&sid=36871368

---歌手分类列表
---歌手热门 50 首歌曲
id : 歌手 id
调用例子 : /artist/top/song?id=6452

---歌手全部歌曲
id : 歌手 id
接口地址 : /artist/songs
调用例子 : /artist/songs?id=6452

---歌手热门50瘦歌曲
调用例子 : /artist/top/song?id=6452

---获取歌单详情
*  id
接口地址 : /playlist/detail
调用例子 : /playlist/detail?id=24381616

---获取歌曲详情
接口地址 : /song/detail
调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231

---获取音乐 url
必选参数 : id : 音乐 id
接口地址 : /song/url
调用例子 : /song/url?id=33894312   /song/url?id=405998841,33894312
音乐是否可用


---音乐是否可用
说明 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
必选参数 : id : 歌曲 id
接口地址 : /check/music
调用例子 : /check/music?id=33894312

---搜索
必选参数 : keywords : 关键词
接口地址 : /search 或者 /cloudsearch(更全)
调用例子 : /search?keywords= 海阔天空 /cloudsearch?keywords= 海阔天空

---获取歌词
接口地址 : /lyric
调用例子 : /lyric?id=33894312

---歌曲评论
接口地址 : /comment/music
调用例子 : /comment/music?id=186016&limit=1


---获取每日推荐歌单
/recommend/resource

---获取每日推荐歌曲
调用例子 : /recommend/songs

---歌曲评论
调用例子 : /comment/playlist?id=705123491

--- 相关歌单
必选参数 : id : 歌单 id
接口地址 : /related/playlist

---获取歌单所有歌曲
/playlist/track/all
/playlist/track/all?id=24381616&limit=10


--获取歌手专辑
必选参数 : id: 歌手 id
可选参数 : limit: 取出数量 , 默认为 50
接口地址 : /artist/album
调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )

---获取歌手详情
必选参数 : id: 歌手 id
接口地址 : /artist/detail

--获取相似音乐
必选参数 : id: 歌曲 id
接口地址 : /simi/song
 
--获取每日推荐歌单   ( 需要登录 )
接口地址 : /recommend/resource

---获取每日推荐歌曲
接口地址 : /recommend/songs


---私人 FM  ( 需要登录 )
接口地址 : /personal_fm

--新碟上架
接口地址 : /top/album

--全部新碟
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30,其中30为 limit 的值,默认为 0
area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
接口地址 : /album/new
调用例子 : /album/new?area=KR&limit=10

---榜单
/toplist

---获取歌单所有歌曲
必选参数 : id : 歌单 id
可选参数 : limit : 限制获取歌曲的数量
接口地址 : /playlist/track/all
调用例子 : /playlist/track/all?id=24381616&limit=10

// 歌单分类
// 接口地址 : /playlist/catlist


---// 歌单 ( 网友精选碟 )
接口地址 : /top/playlist
调用例子 : /top/playlist?limit=10&order=new