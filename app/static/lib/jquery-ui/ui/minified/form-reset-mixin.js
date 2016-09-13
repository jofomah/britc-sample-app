/*! jQuery UI - v1.12.0 - 2016-07-11
 * http://jqueryui.com
 * Copyright jQuery Foundation and other contributors; Licensed  */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "./form", "./version"], a) : a(jQuery)
}(function (a) {
    return a.ui.formResetMixin = {
        _formResetHandler: function () {
            var b = a(this);
            setTimeout(function () {
                var c = b.data("ui-form-reset-instances");
                a.each(c, function () {
                    this.refresh()
                })
            })
        }, _bindFormResetHandler: function () {
            if (this.form = this.element.form(), this.form.length) {
                var a = this.form.data("ui-form-reset-instances") || [];
                a.length || this.form.on("reset.ui-form-reset", this._formResetHandler), a.push(this), this.form.data("ui-form-reset-instances", a)
            }
        }, _unbindFormResetHandler: function () {
            if (this.form.length) {
                var b = this.form.data("ui-form-reset-instances");
                b.splice(a.inArray(this, b), 1), b.length ? this.form.data("ui-form-reset-instances", b) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    }
});
