const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router();
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const index = require('./routes/index')
const users = require('./routes/users')
const cors=require('koa-cors');
const keys = require('./config/config');
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   await next();
// })
app.use(cors());
// mongoose
mongoose.connect(keys.mongodbUrl, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => {
    console.log('数据库连接失败');
    console.log(err);
  })
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
const finish = require('./routes/finish')
router.use('/', index);
router.use('/finish', finish);
app.use(router.routes()).use(router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app