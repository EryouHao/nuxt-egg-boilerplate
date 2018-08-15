import { Nuxt, Builder } from 'nuxt'
import * as config from '../../nuxt.config.js'
module.exports = (options, app) => {
  const nuxtRender = new Nuxt(config)
  const isDev = process.env.NODE_ENV !== 'production'
  if (isDev) {
    new Builder(nuxtRender).build()
  }

  return async function(ctx, next) {
    let flag = false
    let routerArr = []
    const SUCCESS_STATUS = 200
    if (!flag) {
      routerArr = app.router.stack.map((el) => el.path)
      flag = true
    }
    if (routerArr.some(el => el === ctx.path)) {
      return next()
    }
    ctx.status = SUCCESS_STATUS
    ctx.req.session = ctx.session
    const { res, req } = ctx

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxtRender.render(req, res, (promise) => {
        promise.then(resolve).catch(reject)
      })
    })
  }
}
