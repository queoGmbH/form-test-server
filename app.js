const koa = require('koa');
const app = koa();
const bodyParser = require('koa-body');
const router = require('koa-router');
const pjson = require('./package.json');
const cors = require('koa-cors');
const _ = router();
const fs = require("fs");

app.use(cors());

app.use(bodyParser({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
}));

app.use(_.routes());

_.get('/', get);
_.post('/', handleForm);

const indexHtml = fs.readFileSync("./public/index.html","utf8");


app.listen(pjson.port);

function *get(){
    console.log("get",this.request.header.host+this.request.url);
    this.type = 'html';
    this.body = indexHtml;
}

function *handleForm(){
    console.log("post from ", this.request.header.host);
    console.log("request fields", this.request.body.fields);
    console.log("request files", this.request.body.files);
    for (let file in this.request.body.files) {
        let tempName = this.request.body.files[file].path;
        let realName = this.request.body.files[file].name;

        fs.rename(tempName,'./uploads/'+realName);
    }

    this.redirect(this.request.header.host)
}

console.log(getTime()+" server running at :"+pjson.port);

function getTime () {
    const date = new Date();
    return "["+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"]";
}
