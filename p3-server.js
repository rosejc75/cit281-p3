const http = require("http");
const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require(`./p3-module.js`)
const hostname = "127.0.0.1";
const port = 8080;

fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`,(err, data)=> {
        if(err){
            reply.code(500)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("<h1>Error!</h1>");
        } else {
            reply.code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data);
        }
    });
});

    
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });

  //part 9, add /coin route with GET verb
  fastify.get("/coin", (request, reply) => {
      const {denom = 0, count = 0 } = request.query;
      let coinValue = coinCount({denom:denom, count: count});
      reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});
//part 10
fastify.get("/coins", (request, reply) => {
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    let {option} = request.query;
    let coinValue = 0;
    switch (option) {
        case "1": coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });   // option = 1
        break;
        case "2": coinValue = coinCount(...coins); //option = 2
        break;
        };
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});


