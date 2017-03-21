import request from 'superagent'

// /api/users/:id/item

function finalURL(baseUrl, params) {
    return [baseUrl].concat(params).join('/')
}

function handleResponse(err,res,resolve,reject) {
    if(err){
        reject(err)
    }
    

    // console.log(res)
    const status = res.status
    // const data = JSON.parse(res.text)
    const code = res.code
    // if(code == 0){
     resolve(res.text)
    // }
}

export function get (baseUrl, params = [], query = {}){
    const url = finalURL(baseUrl,params)

    return new Promise((resolve, reject) =>{
        request.get(url)
          .query(query)
          .end((err,res)=>{
              handleResponse(err,res,resolve,reject)
          })
    })
}

export function post (baseUrl, params = [], data){
    const url = finalURL(baseUrl,params)

    return new Promise((resolve, reject) =>{
        request.post(url)
          .send(data)
          .end((err,res)=>{
              handleResponse(err,res,resolve,reject)
          })
    })
}

export function put (baseUrl, params = [], data){
    const url = finalURL(baseUrl,params)

    return new Promise((resolve, reject) =>{
        request.put(url)
          .send(data)
          .end((err,res)=>{
              handleResponse(err,res,resolve,reject)
          })
    })
}

export function del (baseUrl, params = []){
    const url = `${baseUrl}/${params.join('/')}`

    return new Promise((resolve, reject) =>{
        request.del(url)
          .end((err,res)=>{
              handleResponse(err,res,resolve,reject)
          })
    })
}
