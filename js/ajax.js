function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
        })
        .catch(error => {
            console.error('加载内容时出错:', error);
        });
}