var express = require('express')
  , routes = require('./routes')
  , path = require('path')
  , http = require('http')

var app = express()

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(require('stylus').middleware({ src: __dirname + '/public' }))
  app.use(express.static(__dirname + '/public'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)

  // We "import" this so we can grab values such as the app version out
  // of the package.json file.
  var package = require(path.resolve(__dirname, './package.json'))
  
  // Setup local variables to be available in the views.
  app.locals.title = "Gunnar - A Drag and Drop Rackspace Cloud Files Uploader"
  app.locals.description = "Gunnar is a drag and drop file uploader for Rackspace Cloud Files."
  app.locals.node_version = process.version.replace('v', '')
  app.locals.app_version = package.version
  app.locals.env = process.env.NODE_ENV
  
  compressStaticFiles()
  
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

app.get('/', routes.index)
app.get('/support', routes.support)

http.createServer(app).listen(8844)

console.log("Express server listening on port 8844\n\nhttp://127.0.0.1:8844")

// Utilities...

function compressStaticFiles(){

  // Compress/concat files for production env...
  if(app.locals.env === 'production'){
    // Smoosh the things
    var smoosh = require('smoosh')
    
    smoosh.make({
      "VERSION": app.locals.app_version,
      "JAVASCRIPT": {
        "DIST_DIR": "./public/js",
        "dependencies": [ "./public/js/ready.js" ],
        "gunnar": [ "./public/js/code.js" ]
      },
      "CSS": {
        "DIST_DIR": "./public/css",
        "style": [ "./public/css/style.css" ]
      }
    })
    
  } // end if production env
  
}