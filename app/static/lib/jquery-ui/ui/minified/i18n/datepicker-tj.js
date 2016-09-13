/*! jQuery UI - v1.12.0 - 2016-07-11
 * http://jqueryui.com
 * Copyright jQuery Foundation and other contributors; Licensed  */
!function (a) {
    "function" == typeof define && define.amd ? define(["../widgets/datepicker"], a) : a(jQuery.datepicker)
}(function (a) {
    return a.regional.tj = {
        closeText: "Идома",
        prevText: "&#x3c;Қафо",
        nextText: "Пеш&#x3e;",
        currentText: "Имрӯз",
        monthNames: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе"],
        dayNamesShort: ["якш", "душ", "сеш", "чор", "пан", "ҷум", "шан"],
        dayNamesMin: ["Як", "Дш", "Сш", "Чш", "Пш", "Ҷм", "Шн"],
        weekHeader: "Хф",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }, a.setDefaults(a.regional.tj), a.regional.tj
});
