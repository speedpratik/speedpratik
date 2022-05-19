import Vue from "vue";

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (document.getElementById(el.dataset.linked)) {
                if (event.target == document.getElementById(el.dataset.linked)) return;
            }

            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, change data from directive
                vnode.context.dropDown = false;
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});