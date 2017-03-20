import { get }  from './helper'

const urls = {
    // users: '/api/users',
    // dep: '/api/users/dep',
    banner: '/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    rank: '/api/splcloud/fcgi-bin/gethotkey.fcg',
    fcg: '/api/v8/fcg-bin/fcg_myqq_toplist.fcg'
}

// export const getUsers = get.bind(null, urls.users)
// export const getdep = get.bind(null, urls.dep)

export const getbanner = get.bind(null, urls.banner)

export const getRank = get.bind(null, urls.rank)

export const fcg = get.bind(null, urls.fcg)