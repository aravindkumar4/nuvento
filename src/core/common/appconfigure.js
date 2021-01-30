
// Get element visibility as true or false by just calling element.visible()
Element.prototype.visible = function () {
    return this.offsetWidth > 0 && this.offsetHeight > 0;
};
Element.prototype.hide = function () {
    this.style.display = 'none';
    return this;
};
Element.prototype.show = function () {
    this.style.display = 'block';
    return this;
};

// Remove validation by keyup if requirement is met.
document.addEventListener('keyup', function (e) {
    if (e.srcElement.classList.contains("error-invalid")) {
        e.srcElement.classList.remove("error-invalid");
        e.srcElement.parentElement.parentElement.classList.remove("error-invalid-p")
    }
    if (e.target.parentElement != null && e.target.parentElement.parentElement != null && e.target.parentElement.parentElement.classList != null && e.target.parentElement.parentElement.classList.contains("is-invalid")) {
        var minLength = parseInt(e.target.attributes["minlength"] != undefined ? e.target.attributes["minlength"].value : 0);
        if (minLength, e.target.value.length >= minLength)
            e.target.parentElement.parentElement.classList.remove("is-invalid")
    }
    if (e.keyCode === 13) {
        if (e.target.closest('form') && !e.target.closest('form').classList.contains("StepperForm") && e.target.closest('form').attributes["eventTriggerId"] != undefined) {
            var registerElement = document.getElementById(e.target.closest('form').attributes["eventTriggerId"].value);
            if (registerElement != null && registerElement != undefined && registerElement.visible()) {
                registerElement.click();
            }
        }
    }
});
document.addEventListener('change', function (e) {

    if (e.target.classList.contains("error-invalid")) {
        e.target.classList.remove("error-invalid");
        if (e.target.tagName == "SELECT")
            e.target.parentElement.parentElement.parentElement.classList.remove("error-invalid-p")
        else
            e.target.parentElement.parentElement.classList.remove("error-invalid-p")
    }
    else {
        //For select type element removeone level more error-invalid
        if (e.target.nodeName == "SELECT") {
            if (e.target.parentElement.parentElement.parentElement.classList.contains("error-invalid-p"))
                e.target.parentElement.parentElement.parentElement.classList.remove("error-invalid-p");
        }
    }
    var pElement = document.getElementsByClassName("is-invalid" + e.target.id)
    if (pElement && pElement.length > 0 && pElement[0] != undefined)
        pElement[0].classList.remove("is-invalid")
});

document.addEventListener('click', function (e) {
    if (e.target.type == "checkbox") {
        var pElement = document.getElementsByClassName("is-invalid" + e.target.id)
        if (pElement && pElement.length > 0 && pElement[0] != undefined)
            pElement[0].classList.remove("is-invalid")
    }
})


// const cbox = document.querySelectorAll(".isspacea");

//  for (let i = 0; i < cbox.length; i++) {
//      cbox[i].addEventListener("onkeypress", function(event) {
//          console.log(event);
//      });
//  }

if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) { };
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}

String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function (item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            if (args === undefined) {
                throw new UserException('Index (zero based) must be greater than or equal to zero and less than the size of the argument list.');
            }
            replace = args[intVal];
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");