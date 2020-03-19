const fillTemplate = require('./template-filler');

// Функция создаёт разметку карточек на главной странице
function createCardsMarkup(cardTmpl, dataArr) {
    return dataArr.map(dataObj => {
        return fillTemplate(cardTmpl, dataObj)
    });
}


// Функция создаёт разметку главной страницы
exports.createMainPageMarkup = (overviewTmpl, productCardTmpl, prodsDataArr) => {
    // Создам разметку с карточками товаров соединив шаблон карточки и массив данных
    const cardsMarkup = createCardsMarkup(productCardTmpl, prodsDataArr).join('');
    
    // Поставлю карточки в шаблон главной страницы
    return overviewTmpl.replace('{%PRODUCT_CARDS%}', cardsMarkup);
};


// Функция создаёт разметку страницы продукта
exports.createProductPageMarkup = (tmpl, data) => {
    
    // Сформирую страницу товара
    return fillTemplate(tmpl, data)
};