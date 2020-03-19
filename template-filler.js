module.exports = (tmpl, data) => {
    let filledTmpl = tmpl.replace(/{%ID%}/g, 'product?id=' + data.id);
    filledTmpl = filledTmpl.replace(/{%NAME%}/g, data.productName);
    filledTmpl = filledTmpl.replace(/{%IMAGE%}/g, data.image);
    filledTmpl = filledTmpl.replace(/{%FROM%}/g, data.from);
    filledTmpl = filledTmpl.replace(/{%NUTRIENS%}/g, data.nutrients);
    filledTmpl = filledTmpl.replace(/{%QUANTITY%}/g, data.quantity);
    filledTmpl = filledTmpl.replace(/{%PRICE%}/g, data.price);
    filledTmpl = filledTmpl.replace(/{%DESCRIPTION%}/g, data.description);
    
    if(!data.organic) {
        filledTmpl = filledTmpl.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    
    return filledTmpl;
};