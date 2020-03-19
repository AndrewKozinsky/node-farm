const http = require('http');
const url = require('url');
const fs = require('fs');
const {createMainPageMarkup, createProductPageMarkup} = require('./markup-creators');

// Шаблоны главной страницы, карточки и продукта.
const overviewTmpl = fs.readFileSync('templates/overview.html', 'utf-8');
const productCardTmpl = fs.readFileSync('templates/product-card.html', 'utf-8');
const productPageTmpl = fs.readFileSync('templates/product-page.html', 'utf-8');

// Данные страниц как JSON
const prodsDataStr = fs.readFileSync('database/data.json', 'utf-8');
// Данные страниц как массив
const prodsDataArr = JSON.parse(prodsDataStr);


const server = http.createServer((req, res) => {
    // Поставлю 200-й код потому что он используется на большинстве страниц.
    res.statusCode = 200;
    
    // Получу объект с разобранным URL
    const pathObj = url.parse(req.url, true);
    // Получу pathname у URL
    const pathName = pathObj.pathname;
    
    // Если это главная страница
    if(pathName === '/' || pathName === '/overview') {
        
        // Создам главную страницу
        let pageMarkup = createMainPageMarkup(overviewTmpl, productCardTmpl, prodsDataArr);
    
        // Поставлю заголовок и верну ответ
        res.setHeader('Content-type', 'text/html');
        res.end(pageMarkup)
    }
    
    // Если это страница продукта
    else if(pathName === '/product') {
        const prodId = +(pathObj.query.id);
        
        // Создам страницу продукта
        const pageMarkup = createProductPageMarkup(productPageTmpl, prodsDataArr[prodId]);
    
        // Поставлю заголовок и верну ответ
        res.setHeader('Content-type', 'text/html');
        res.end(pageMarkup)
    }
    
    // Если страница не найдена
    else {
        res.statusCode = 404;
        res.end('Page not found')
    }
});


server.listen(8000, '127.0.0.1');