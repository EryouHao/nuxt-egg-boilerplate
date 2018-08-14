import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  timeout: 1000 * 120,
})

export default ({ redirect, store }) => {
  instance.interceptors.request.use(config => {
    return config
  }, function(error) {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    if (res.status === 401) {
      store.dispatch('/logout')
      redirect('/login')
    }
  }, err => {
    Promise.reject(err)
  })

  const post = (url, config) => {
    const data = config || {}
    return instance({
      url,
      method: 'POST',
      data,
    })
  }

  const get = (url, params) => {
    return instance({
      url,
      method: 'GET',
      params,
    })
  }

  // DELETE ME
  console.log(post, get)

  const home = {
    fetchList: () => get('/api/home'),
  }

  Vue.prototype.$api = {
    home,
  }
}
