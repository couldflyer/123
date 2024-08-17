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

    // 当前显示的内容 URL
    const currentUrl = iframe.getAttribute('data-url');

    if (button.getAttribute('data-loaded') === 'true') {
        // 如果点击同一个按钮，则隐藏内容
        iframe.style.display = 'none';
        button.setAttribute('data-loaded', 'false');
    } else {
        // 切换内容
        const data = contentCache[url];
        if (data) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(data);
            iframeDoc.close();
            iframe.style.display = 'block';
            iframe.setAttribute('data-url', url); // 更新当前显示的内容 URL

            // 更新所有按钮的状态
            document.querySelectorAll('#otherpage button').forEach(btn => {
                btn.setAttribute('data-loaded', 'false');
            });

            // 仅设置当前按钮为已加载
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