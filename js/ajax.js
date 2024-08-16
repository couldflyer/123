// 缓存对象，用于存储预加载的内容
const contentCache = {};

// 预加载内容的函数
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

// 加载或隐藏内容到 iframe 的函数
function loadContent(url, button) {
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

    // 检查当前 iframe 是否已经显示内容
    if (button.getAttribute('data-loaded') === 'true') {
        // 内容已经加载，隐藏 iframe 并重置状态
        iframe.style.display = 'none';
        button.setAttribute('data-loaded', 'false');
    } else {
        // 内容尚未加载，显示 iframe 并加载内容
        const data = contentCache[url];
        if (data) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(data);
            iframeDoc.close();
            iframe.style.display = 'block';
            button.setAttribute('data-loaded', 'true');
        } else {
            console.error('内容尚未预加载');
        }
    }
}

// 页面加载时预加载所有内容
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#otherpage button');

    buttons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const urlMatch = onclickAttr.match(/loadContent\('(.+?)'\)/);

        if (urlMatch && urlMatch[1]) {
            const url = urlMatch[1];
            preloadContent(url);  // 预加载 URL

            // 重新设置按钮的 onclick 事件，传递 button 元素本身
            button.setAttribute('onclick', `loadContent('${url}', this)`);
        }
    });
});
