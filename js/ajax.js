function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
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

            // 加载内容到 iframe 中
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(data);
            iframeDoc.close();
        })
        .catch(error => {
            console.error('加载内容时出错:', error);
        });
}