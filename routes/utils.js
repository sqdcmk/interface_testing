const Router = require('koa-router');
const router = new Router();
const Logger = require('../module/record');


/**
 * 记录日志
 */
router.post('/log/add', async ctx => {
    let page = ctx.request.body.page;
    let obj = ctx.request.body.obj;
    console.log(ctx.request.body.page)
    if (!obj) {
        ctx.status = 404
        ctx.body = {
            msg: 'No',
            code: 404
        };
        return
    }
    const logger = new Logger({
        page: page,
        obj: obj
    })
    await logger.save().then(res => {
        ctx.status = 200;
        ctx.body = {
            msg: '记录成功',
            code: 0
        }
        return
    }).catch(err => {
        console.log(err)
        ctx.status = 500;
        ctx.body = {
            msg: err,
            code: 500
        }
    })

})


module.exports = router.routes();