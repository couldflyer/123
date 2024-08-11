// 点击搜索按钮时执行搜索
document.getElementById('searchButton').addEventListener('click', function() {
    performSearch();
});

// 按下回车键时执行搜索
document.getElementById('bingSearchBox').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// 执行搜索的函数
function performSearch() {
    var query = document.getElementById('bingSearchBox').value;
    if (query.trim()) {
        window.open('https://www.bing.com/search?q=' + encodeURIComponent(query), '_blank');
    }
}