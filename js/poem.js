/**
 * 今日诗词V2 JS-SDK 1.2.2 优化版
 * 今日诗词API 是一个可以免费调用的诗词接口：https://www.jinrishici.com
 */
(function(window) {
    const tokenKey = "jinrishici-token";

    function getPoemElement() {
        return document.getElementById("poem-sentence") || 
               document.querySelector(".poem-sentence");
    }

    function updatePoemContent(content) {
        const element = getPoemElement();
        if (element) {
            element.innerText = content;
        }
    }

    function fetchPoem(callback) {
        const token = window.localStorage?.getItem(tokenKey);
        const url = `https://v2.jinrishici.com/one.json?client=browser-sdk/1.2${token ? `&X-User-Token=${encodeURIComponent(token)}` : ''}`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    if (!token) {
                        window.localStorage.setItem(tokenKey, response.token);
                    }
                    callback(response.data.content);
                } else {
                    console.error("今日诗词API加载失败，错误原因：" + response.errMessage);
                }
            }
        };
        xhr.send();
    }

    function initPoem() {
        fetchPoem(updatePoemContent);
    }

    if (getPoemElement()) {
        initPoem();
    } else {
        const onContentLoaded = function() {
            if (getPoemElement()) {
                initPoem();
            }
        };
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", onContentLoaded);
        } else {
            onContentLoaded();
        }
    }
})(window);
