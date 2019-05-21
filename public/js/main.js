let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: './obschiy.xml',
        products: [],
    },
    methods: {
        addProducts(){
            let xml = new XMLHttpRequest();
            xml.open('GET', this.catalogUrl, false);
            xml.send();
            let xmlData = xml.responseXML;
            if(!xmlData){
                xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
            }
            let offers = (xmlData.getElementsByTagName("offers"));
            let offerList = offers[0].children;
            for (let i=0; i < offerList.length; i++) {
                let dimensions = offerList[i].children[11].innerHTML.split("/");
                let desc = `${offerList[i].children[6].innerHTML}.\nПроизводитель: ${offerList[i].children[4].innerHTML}.\nСтрана производства: ${offerList[i].children[8].innerHTML}.\n`;
                if (offerList[i].children[13].innerHTML){desc+= `Коллекция: ${offerList[i].children[13].innerHTML}.\n`}
                if (offerList[i].children[14].innerHTML){desc+= `Объем/Размер: ${offerList[i].children[14].innerHTML}.\n`}
                if (offerList[i].children[15].innerHTML){desc+= `Материал: ${offerList[i].children[15].innerHTML}.\n`}
                if (offerList[i].children[16].innerHTML){desc+= `Источник тепла: ${offerList[i].children[16].innerHTML}.\n`}
                if (offerList[i].children[18].innerHTML){desc+= `Внутреннее покрытие: ${offerList[i].children[18].innerHTML}.\n`}
                if (offerList[i].children[19].innerHTML){desc+= `Внешнее покрытие: ${offerList[i].children[19].innerHTML}.\n`}
                if (offerList[i].children[20].innerHTML>0){desc+= `Толщина стенок: ${offerList[i].children[20].innerHTML}.\n`}
                if (offerList[i].children[21].innerHTML>0){desc+= `Толщина дна: ${offerList[i].children[21].innerHTML}.\n`}
                if (offerList[i].children[22].innerHTML){desc+= `Крышка: ${offerList[i].children[22].innerHTML}.\n`}

                let product = {
                    productId : offerList[i].id,
                    name : offerList[i].children[6].innerHTML,
                    categoryId : offerList[i].children[2].innerHTML,
                    sku : offerList[i].children[9].innerHTML,
                    quantity : offerList[i].children[24].innerHTML,
                    model : offerList[i].children[5].innerHTML,
                    manufacturer: offerList[i].children[4].innerHTML,
                    image : offerList[i].children[3].innerHTML,
                    shipping : "no",
                    price : offerList[i].children[0].innerHTML,
                    points : 0,
                    dAdded : "0000-00-00 00:00:00",
                    dModified : "0000-00-00 00:00:00",
                    dAvailable : "0000-00-00",
                    weight : offerList[i].children[10].innerHTML,
                    unit : "кг",
                    length : dimensions[0],
                    width : dimensions[1],
                    height : dimensions[2],
                    lengthUnit : "см",
                    statusEn: "true",
                    taxClass: 9,
                    languageId: 1,
                    seoKeyword: offerList[i].children[6].innerHTML,
                    description: desc,
                    metaDescription: desc,
                    metaKeywords: offerList[i].children[6].innerHTML,
                    stockStatusId: 7,
                    storeId: 0,
                    sortOrder: 1,
                    subtrct: "true",
                    minimum: 1
                    };
                this.products.push(product);
            }
        },
    },
});