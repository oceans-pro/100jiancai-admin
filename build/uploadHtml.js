const Client = require('ftp')
const fs = require('fs')
const {ftpConfig} = require('../src/const/secret')
const path = require('path')

const client = new Client()
client.on('ready', function () {
  client.put(path.join(__dirname, '../dist/index.html'), 'index.html', function (err) {
    if (err) throw err
    client.end()
  })
})
client.connect(ftpConfig)

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                    docs: https://www.npmjs.com/package/ftp
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/

// Get a directory listing of the current (remote) working directory
// client.on('ready', function () {
//   client.list(function (err, list) {
//     if (err) throw err
//     console.dir(list)
//     client.end()
//   })
// })

// Download remote file 'foo.txt' and save it to the local file system:
// client.on('ready', function() {
//   client.get('foo.txt', function(err, stream) {
//     if (err) throw err;
//     stream.once('close', function() { client.end(); });
//     stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
//   });
// });

// Upload local file 'foo.txt' to the server:
// client.on('ready', function() {
//   client.put('foo.txt', 'upload.remote-foo.txt', function(err) {
//     if (err) throw err;
//     client.end();
//   });
// });
