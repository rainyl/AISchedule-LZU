/*
 * @Author: 逝雨、落无声
 * @Date: 2020-10-28 11:16:45
 * @LastEditTime: 2020-10-28 11:18:08
 * @LastEditors: Please set LastEditors
 * @Description: This script provide a html to parser
 * @FilePath: \AISchedule-LZU\scheduleHtmlProvider.js
 */
function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    var panesecond1 = dom.getElementById("pane-second1");
    var class_content = panesecond1.getElementsByClassName("app-container");
    return class_content[0].innerHTML;
}