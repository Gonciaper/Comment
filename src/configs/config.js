// ----------样式设置-----------
// 这里可以通过修改参数自定义评论组件
// 通过将'int'改成你想要的整数即可
// direct是评论内容输入框的布局位置，你可以修改(上 => 'up',下 => 'bottom',左 => 'left',右 => 'right')


// ------------输入框--------------------
let inputWid = `${'int'}px`;        // 文本输入框宽
let inputHei = `${'int'}px`;        // 文本输入框高

// ------------评论区卡片-----------------
let comCardWid = `${'int'}px`;      // 评论区卡片宽
let comCardHei = `${'int'}px`;      // 评论区卡片高

// ------------输入框布置位置--------------
let direct = 'up';                  //up,bottom,left,right

export { inputHei, inputWid, comCardHei, comCardWid, direct };