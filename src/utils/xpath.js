function isSVGChild(elm){
    while (elm) {
        if (elm.tagName === 'svg') return true;
        elm = elm.parentNode;
    }
}

module.exports = {

    createXPathFromElement : (elm) => {
        let allNodes = document.getElementsByTagName('*');
        let segs, sib, i, svg;
        for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode){
            svg = isSVGChild(elm);
            if (elm.hasAttribute('id') & !svg) {
                let uniqueIdCount = 0;
                for (let n=0;n < allNodes.length;n++) {
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                    if (uniqueIdCount > 1) break;
                }
                if ( uniqueIdCount == 1) {
                    segs.unshift('id("' + elm.getAttribute('id') + '")');
                    return segs.join('/');
                } else {
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                }
            } else if (elm.hasAttribute('class') && !svg) {
                segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
            } else {
                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName == elm.localName)  i++;
                }
                if(svg){
                    segs.unshift("*[name()='" + elm.localName.toLowerCase() + "'][" + i + ']');
                } else {
                    segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
                }

            }
        }
        return segs.length ? '/' + segs.join('/') : null;
    },

    lookupElementByXPath : (path) => {
        if(path) {
            let evaluator = new XPathEvaluator();
            let result = evaluator.evaluate(path, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue;
        }
    },
    getElementByXpath : (path) => {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

};