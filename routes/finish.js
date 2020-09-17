const Router = require('koa-router');
const router = new Router();
const Finisher = require('../module/Finish');


/**
 * 添加
 */
router.post('/list/add', async ctx => {
    let id = ctx.request.body.pageId;
    let list = ctx.request.body.list;
    console.log(ctx.request.body.pageId)
    const findId = await Finisher.find({
        pageId: id
    })
    if (!id) {
        ctx.status = 200;
        return ctx.body = {
            msg: '缺少页面id',
            code: 404,
            data: ''
        };
    } else if (list.length <= 0) {
        ctx.status = 200;
        return ctx.body = {
            msg: '缺少布局列表',
            code: 404,
            data: ''
        };
    }
    if (findId.length > 0) {
        let newVal=list
        await Finisher.update({ pageId: id },{list:newVal},{new:true}).then(res => {
            console.log('保存成功')
            console.log(res)
            ctx.status = 200
            ctx.body = {
                data: '',
                code: 0,
                msg: '保存成功'
            }
        }).catch(err => {
            ctx.status = 200
            ctx.body = {
                data: '',
                code: 404,
                msg: '保存失败'
            }
        })
    } else {
        const finishs = new Finisher({
            pageId: id,
            list: list
        })
        await finishs.save().then(finishs => {
            ctx.status = 200
            ctx.body = {
                data: finishs,
                code: 0,
                msg: '上传成功'
            }
        }).catch(err => {
            ctx.staus = 200
            console.error(err)
            ctx.body = {
                err: 'err'
            }
        })
        return;
    }
})

/**
 * 查询
 */
router.post('/list/query', async ctx => {
    let id = ctx.request.body.pageId;
    if (!id) {
        ctx.status = 404
        return ctx.body = {
            msg: '请输入id',
            code: 404,
            data: ''
        }
    }
    const findId = await Finisher.find({
        pageId: id
    })
    console.log(findId[0])
    ctx.status = 200;
    ctx.body = {
        data: findId[0],
        msg: '查询成功',
        code: 0
    }
})

module.exports = router.routes();