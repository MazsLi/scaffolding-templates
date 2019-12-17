const Basement = require('@alipay/basement');
const urllib = require('urllib');
const co = require('co');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filePrefix = (() => {
  const stdout = execSync('git remote -v').toString();
  let filePath = stdout.match(/com\:(.*)\.git/)[1];
  return filePath;
})();

const basement = new Basement({
    appId: 'xxxxx',
    masterKey: 'xxxx',
    urllib,
    endpoint: 'https://basement-gzone.alipay.com'
});

const publish = (filePath, content) => {
  const contentType = /\.html$/.test(filePath) ? 'text/html' : 'application/javascript';

  return basement.file.upload(
    path.join(filePrefix, filePath),
    new Buffer(content),
    {
      mode: 'public',
      keepPath: true,
      headers: {
        contentType: `${contentType}; charset=utf-8`,
        cacheControl: 'no-cache'
      }
    }
  );
}

// 将 build 下的构建产物发布至 air
fs.readdirSync(path.join('./build')).forEach(file => {
  const name = path.join('./build', file);

  publish(file, fs.readFileSync(name)).then(res => {
    console.log(res);
  })
});

