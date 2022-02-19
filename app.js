const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const app = new Koa();
const router = new KoaRouter();
const path = require('path');
const render = require('koa-ejs');


const things = ['My Family', 'Programming', 'Music'];

//Json Prettier Middleware
app.use(json());

//Simple Middleware Example
//app.use(async ctx => ctx.body = { msg: 'Hello World' });

router.get('/test', ctx => (ctx.body = 'Hello Test'));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

//Index 
router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'Things I Love:',
        things: things
    });
});


//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('server started..'));