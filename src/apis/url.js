import { get }  from './helper'

const urls = {
    users: '/api/users',
    dep: '/api/users/dep'
}

export const getUsers = get.bind(null, urls.users)
export const getdep = get.bind(null, urls.dep)