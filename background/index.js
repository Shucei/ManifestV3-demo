// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     console.log(details)
//     return { cancel: true };
//   },
//   { urls: ["<all_urls>"] },
//   ["blocking"]
// );

// 添加右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'normal',
    title: '点我翻译',
    contexts: ['all'],
  });
  chrome.contextMenus.create({
    id: 'normal2',
    title: '百度搜索',
    contexts: ['all']
  });
  chrome.contextMenus.create({
    id: 'normal3',
    title: '菜单项3',
    contexts: ['all']
  });
});

// 处理右键菜单项点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info);
  console.log(tab);
  // chrome.contextMenus.update('normal2', {
  //   title:"我是改变后的菜单项"
  // });
  if (info.menuItemId === 'normal' && info.selectionText) {
    console.log('翻译' + info.selectionText);
    chrome.tabs.create({
      url: `https://fanyi.baidu.com/#en/zh/${encodeURIComponent(info.selectionText)}`
    });
  }
  if (info.menuItemId === 'normal2') {
    console.log('百度搜索' + info.selectionText);
    chrome.tabs.create({
      url: `https://www.baidu.com/s?wd=${info.selectionText}`
    });
  }
  if (info.menuItemId === 'normal3') {
    chrome.notifications.create(
      {
        type: "basic",
        title: "Notifications Title",
        message: "Notifications message to display",
        iconUrl: "../icons/icon.png"
      },
      (notificationId) => {
        console.log('notificationId-->', notificationId)
      }
    );
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('收到消息');
  console.log(message)
  console.log(sender)
  sendResponse('我是后台，我已收到你的消息!')
  // if (request.action === 'openOptions') {
  //   chrome.runtime.openOptionsPage()
  //   sendResponse('打开设置页')
  // }
})

chrome.webRequest.onBeforeRequest.addListener(function(details){
  console.log('拦截请求')
  console.log(details)
  return {cancel: true};

}, {urls: ["<all_urls>"]}, ["blocking"]);
