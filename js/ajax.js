// 缓存对象，用于存储预加载的内容
const contentCache = {};

function preloadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // 将内容缓存起来
            contentCache[url] = data;
        })
        .catch(error => {
            console.error('预加载内容时出错:', error);
        });
}

// 加载内容到 iframe
function loadContent(url) {
    const contentArea = document.getElementById('content-area');

    // 创建或选择 iframe
    let iframe = contentArea.querySelector('iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        contentArea.appendChild(iframe);
    }

    // 从缓存中获取数据
    const data = contentCache[url];

    // 加载内容到 iframe 中
    if (data) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(data);
        iframeDoc.close();
    } else {
        console.error('内容尚未预加载');
    }
}

// 页面加载时预加载所有内容
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有带有 onclick 属性的按钮
    const buttons = document.querySelectorAll('#otherpage button');

    buttons.forEach(button => {
        // 从按钮的 onclick 属性中提取 URL
        const onclickAttr = button.getAttribute('onclick');
        const urlMatch = onclickAttr.match(/loadContent\('(.+?)'\)/);

        if (urlMatch && urlMatch[1]) {
            const url = urlMatch[1];
            preloadContent(url);  // 预加载 URL
        }
    });
});