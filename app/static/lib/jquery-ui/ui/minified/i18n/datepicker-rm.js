/*! jQuery UI - v1.12.0 - 2016-07-11
 * http://jqueryui.com
 * Copyright jQuery Foundation and other contributors; Licensed  */
!function (a) {
    "function" == typeof define && define.amd ? define(["../widgets/datepicker"], a) : a(jQuery.datepicker)
}(function (a) {
    return a.regional.rm = {
        closeText: "Serrar",
        prevText: "&#x3C;Suandant",
        nextText: "Precedent&#x3E;",
        currentText: "Actual",
        monthNames: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"],
        monthNamesShort: ["Scha", "Fev", "Mar", "Avr", "Matg", "Zer", "Fan", "Avu", "Sett", "Oct", "Nov", "Dec"],
        dayNames: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"],
        dayNamesShort: ["Dum", "Gli", "Mar", "Mes", "Gie", "Ven", "Som"],
        dayNamesMin: ["Du", "Gl", "Ma", "Me", "Gi", "Ve", "So"],
        weekHeader: "emna",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }, a.setDefaults(a.regional.rm), a.regional.rm
});
