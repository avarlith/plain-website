document.addEventListener('DOMContentLoaded', function () {
    // dropdown menu - header//
    var aboutMainMenu = document.querySelector('#main_menu li:first-child');
    var subMenu = document.querySelector('#main_menu ul.submenu');

    aboutMainMenu.addEventListener('mouseover', function () {
        if (subMenu !== null) {
            subMenu.style.display = "block";
        }
    });

    aboutMainMenu.addEventListener('mouseout', function () {
        if (subMenu !== null) {
            subMenu.style.display = "none";
        }
    });

    // vanishing descriptions - section chairs//
    var block = document.querySelectorAll('div.block');

    for (var i = 0; i < block.length; i++) {
        block[i].addEventListener('mouseover', function () {
            this.querySelector('div.little_underscore.img').style.visibility = 'hidden';
        });
        block[i].addEventListener('mouseout', function () {
            this.querySelector('div.little_underscore.img').style.visibility = 'visible';
        });
    }

    // slider - section main//
    var prevArrow = document.getElementById('prev');
    var nextArrow = document.getElementById('next');
    var listImages = document.querySelectorAll('.slider li');
    var currIndex = 0;

    listImages[currIndex].classList.add('visible');

    nextArrow.addEventListener('click', function (event) {
        listImages[currIndex].classList.remove('visible');
        currIndex += 1;
        if (listImages.length === currIndex) {
            currIndex = 0;
        }
        listImages[currIndex].classList.add('visible');
    });

    prevArrow.addEventListener('click', function () {
        listImages[currIndex].classList.remove('visible');
        currIndex -= 1;
        if (currIndex === -1) {
            currIndex = listImages.length - 1;
        }
        listImages[currIndex].classList.add('visible');
    });

    // dropdown list + calculator - section application //
    var listArrows = document.querySelectorAll('span.list_arrow');
    var chairType = document.querySelectorAll('ul.chair_type li');
    var chairColor = document.querySelectorAll('ul.chair_color li');
    var chairTextile = document.querySelectorAll('ul.chair_textile li');
    var type = document.getElementById('type');
    var color = document.getElementById('color');
    var textile = document.getElementById('textile');
    var summaryChair = document.querySelector('.panel_left h4.title');
    var summaryColor = document.querySelector('.panel_left span.color');
    var summaryTextile = document.querySelector('.panel_left span.pattern');
    var summaryChairPrice = document.querySelector('.panel_right h4.title.value');
    var summaryColorPrice = document.querySelector('.panel_right span.color.value');
    var summaryTextilePrice = document.querySelector('.panel_right span.pattern.value');
    var checkTransport = document.querySelector('.checkbox label.transport');
    var getTransport = document.getElementById('transport');
    var transport = document.querySelector('.panel_left span.transport');
    var summaryTransportPrice = document.querySelector('.panel_right span.transport.value');
    var summarySum = document.querySelector('.sum strong');
    var price = 0;

    var Calculator = function () {
        this.chairTypePrice = -1;
        this.colorPrice = -1;
        this.textilePrice = -1;
        this.transportPrice = -1;
    }

    Calculator.prototype.setChairTypePrice = function (price) {
        this.chairTypePrice = parseFloat(price);
    }

    Calculator.prototype.setColorPrice = function (price) {
        this.colorPrice = parseFloat(price);
    }

    Calculator.prototype.setTextilePrice = function (price) {
        this.textilePrice = parseFloat(price);
    }

    Calculator.prototype.setTransportPrice = function (price) {
        this.transportPrice = parseFloat(price);
    }

    Calculator.prototype.displaySummary = function () {
        var sum = 0;

        if (this.chairTypePrice > -1) {
            summaryChairPrice.innerHTML = this.chairTypePrice + "zł";
            sum = sum + this.chairTypePrice;
        }
        if (this.colorPrice > -1) {
            summaryColorPrice.innerHTML = this.colorPrice + "zł";
            sum = sum + this.colorPrice;
        }
        if (this.textilePrice > -1) {
            summaryTextilePrice.innerHTML = this.textilePrice + "zł";
            sum = sum + this.textilePrice;
        }
        if (this.transportPrice > -1) {
            summaryTransportPrice.innerHTML = this.transportPrice + "zł";
            sum = sum + this.transportPrice;
        } else {
            summaryTransportPrice.innerHTML = "";
        }

        summarySum.innerHTML = sum.toFixed(0) + "zł";
    }

    var summaryCalc = new Calculator();


    for (var i = 0; i < listArrows.length; i++) {
        listArrows[i].addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('visible');
            for (var j = 0; j < listArrows.length; j++) {
                if (listArrows[j].nextElementSibling.classList.contains('visible')) {
                    listArrows[j].nextElementSibling.classList.remove('visible');
                    this.nextElementSibling.classList.add('visible');
                }
            }
        });
    }

    for (var i = 0; i < chairType.length; i++) {
        chairType[i].addEventListener('click', function () {
            summaryChair.innerHTML = "Chair " + this.innerHTML;
            summaryCalc.setChairTypePrice(this.dataset.price);
            summaryCalc.displaySummary();
            this.parentElement.classList.toggle('visible');
        });
    }

    for (var i = 0; i < chairColor.length; i++) {
        chairColor[i].addEventListener('click', function () {
            summaryColor.innerHTML = "Kolor " + this.innerHTML;
            summaryCalc.setColorPrice(this.dataset.price);
            summaryCalc.displaySummary();
            this.parentElement.classList.toggle('visible');
        });
    }

    for (var i = 0; i < chairTextile.length; i++) {
        chairTextile[i].addEventListener('click', function () {
            summaryTextile.innerHTML = this.innerHTML;
            summaryCalc.setTextilePrice(this.dataset.price);
            summaryCalc.displaySummary();
            this.parentElement.classList.toggle('visible');
        });
    }

    var checked = false;
    checkTransport.addEventListener('click', function () {
        checked = !checked;
        var price = getTransport.dataset.price;
        if (checked) {
            transport.innerHTML = this.innerHTML;
        } else {
            transport.innerHTML = "";
            price = -1
        }

        summaryCalc.setTransportPrice(price);
        summaryCalc.displaySummary();
    });
});