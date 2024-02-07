// console.log('content/index.js')
// document.getElementById('su').addEventListener('click', function() {
//   console.log('click')
//   alert('click')
// })
function ajax (url, options) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    // 设置请求方法和 URL
    xhr.open(options.method || 'GET', url);

    // 设置请求头部
    if (options.headers) {
      for (var header in options.headers) {
        xhr.setRequestHeader(header, options.headers[header]);
      }
    }

    // 设置请求超时时间
    if (options.timeout && !isNaN(options.timeout)) {
      xhr.timeout = options.timeout;
    }

    // 监听加载完成事件
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    // 监听错误事件
    xhr.onerror = function () {
      reject(new Error('Network error'));
    };

    // 监听超时事件
    xhr.ontimeout = function () {
      reject(new Error('Request timeout'));
    };

    // 发送请求
    xhr.send(options.body);
  });
}

const download_button = document.createElement('button')
download_button.innerText = '下载文件'
download_button.id = 'download-button'


window.onload = function () {

  let timer = setInterval(() => {
    if (document.querySelector('.joined-group-file-container > #download-button ')) {
      clearInterval(timer)
    }
    document.querySelector('.joined-group-file-container > .title').appendChild(download_button)
  }, 1000)

}


download_button.addEventListener('click', function () {
  fetch('https://api.zsxq.com/v2/groups/51122858222824/files?count=20', {
    credentials: 'include'
  }).then(response => {
    return response.json()
  }).then(data => {
    console.log(data)
  })
  // ajax('https://api.zsxq.com/v2/groups/51122858222824/files?count=20', {
  // }).then(response => {
  //   console.log(response)
  // })


  chrome.runtime.sendMessage({ action: 'downloadFile' }, response => {
    console.log(response)
  })
})





