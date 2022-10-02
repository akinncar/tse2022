/**
 * 
 * @param {string} text 
 * @returns {string}
 */
export function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}