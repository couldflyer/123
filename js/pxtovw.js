// 假设设计宽度为 1440px
const designWidth = 360

// 获取当前屏幕的宽度
const currentWidth = window.innerWidth;

// 计算比例
const scaleFactor = currentWidth / designWidth;

// 将 px 转换为 vw
function pxToVw(px) {
    return (px * scaleFactor) / (currentWidth / 100) + 'vw';
}

// 自动将指定的 px 单位转换为 vw 并应用到所有元素
function applyPxToVw() {
    const elements = document.querySelectorAll('*');

    elements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);

        // 遍历所有可能包含 px 值的样式属性
        ['padding', 'margin', 'left', 'top', 'right', 'bottom', 'font-size', 'gap'].forEach(property => {
            let pxValue = computedStyle.getPropertyValue(property);
            
            if (pxValue.includes('px')) {
                let valueInPx = parseFloat(pxValue);
                let vwValue = pxToVw(valueInPx);
                element.style[property] = vwValue;
            }
        });
    });
}

// 页面加载时应用
window.addEventListener('load', applyPxToVw);
