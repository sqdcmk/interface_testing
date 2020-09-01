const Router = require('koa-router');
const router = new Router();
const Finisher = require('../module/Finish');


/**
 * 添加
 */
router.post('/list/add',async ctx=>{
    let id=ctx.request.body.pageId;
    let list=ctx.request.body.list;
    let data=ctx.request.body.data;
    console.log(ctx.request.body)
    if(!id){
        ctx.status=404;
        return ctx.body={
            msg:'缺少页面id',
            code:404,
            data:''
        };
    }else if(!list){
        ctx.status=404;
        return ctx.body={
            msg:'缺少布局列表',
            code:404,
            data:''
        };
    }
    const finish=new Finisher({
        pageId:id,
        list:list,
        data:data
    })
    await finish.save().then(finishs=>{
        ctx.status=200
        ctx.body={
            data:finishs,
            code:0,
            msg:'上传成功'
        }
    }).catch(err=>{
        ctx.staus=404
        console.error(err)
        ctx.body={
            err:'err'
        }
    })
})

/**
 * 查询
 */
router.post('/list/query', async ctx => {
    let id=ctx.request.body.pageId;
    if(!id){
        ctx.status=404
        return ctx.body={
            msg:'请输入id',
            code:404,
            data:''
        }
    }
    const findId=await Finisher.find({
        pageId:id
    })
    console.log(findId)
    ctx.status=200;
    ctx.body={
        data:findId,
        msg:'查询成功',
        code:0
    }
})

module.exports=router.routes();