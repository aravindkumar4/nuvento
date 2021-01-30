String.prototype.CurrencyFormat = function () {
    let value = this.trim();
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

String.prototype.CurrencyFormatWithoutCode = function () {
    let value = this.trim();
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    	currencyDisplay: 'code'
    }).format(value).replace(/[a-z]{3}/i, "").trim();
}

String.prototype.YYYYDDMMFormatTOMMDDYYYY = function () {
    let value = this;
    let dt =  value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3').toString().split('/');
    return `${dt[1]}/${dt[2]}/${dt[0]}`;
}


Date.prototype.CustomDateFormat = function () {
    let value = this;
    return new Date(this).toLocaleString();
}

String.prototype.YYYYDDMMFormatTODate = function () {
    let value = this;
    return value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3');
}


String.prototype.IsNumber = function () {
    const pattern = /^\d+$/;
    return pattern.test(this);
}

String.prototype.IsCurrency = function () {
    const pattern = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    return pattern.test(this);
}
