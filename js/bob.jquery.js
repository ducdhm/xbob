/**
 * Bob jQuery utilities
 * @author: ducdhm
 * @date: Thu, Dec 26th, 2013 (GTM+7)
 */
(function (Bob, $, win, doc, undefined) {
    var eventHandlers = {
        onDOMReady: [],
        onPageLoaded: [],
        onPageResized: [],
        onPageScrolled: [],
        onPageClicked: [],
        onHashChanged: []
    };

    /**
     * Add handler which will be executed after the DOm is ready
     * @method onDOMReady
     * @param {Function} callback The handler for DOMReady event
     */
    Bob.onDOMReady = function (callback) {
        eventHandlers.onDOMReady.push(callback);
    };

    /**
     * Add handler which will be executed when a page is rendered
     * @method onPageLoaded
     * @param {Function} callback The handler for onPageLoaded event
     */
    Bob.onPageLoaded = function (callback) {
        eventHandlers.onPageLoaded.push(callback);
    };

    /**
     * Add handler which will be executed when a page is resized
     * @method onPageResized
     * @param {Function} callback The handler for onPageResized event
     */
    Bob.onPageResized = function (callback) {
        eventHandlers.onPageResized.push(callback);
    };

    /**
     * Add handler which will be executed when a page is scrolled
     * @method onPageScrolled
     * @param {Function} callback The handler for onPageScrolled event
     */
    Bob.onPageScrolled = function (callback) {
        eventHandlers.onPageScrolled.push(callback);
    };

    /**
     * Add handler which will be executed when click on page
     * @method onPageClicked
     * @param {Function} callback The handler for onPageClicked event
     */
    Bob.onPageClicked = function (callback) {
        eventHandlers.onPageClicked.push(callback);
    };

    /**
     * Add handler which will be executed when hash is changed
     * @method onHashChanged
     * @param {Function} callback The handler for onHashChanged event
     */

    if ($.fn.hashchange) {
        Bob.onHashChanged = function (callback) {
            eventHandlers.onHashChanged.push(callback);
        };
    }

    var $win = $(win);

    // DOMReady event
    $(function () {
        // Run all functions in onDOMReady function set
        for (var i = 0, event; event = eventHandlers.onDOMReady[i]; i++) {
            if (typeof event === 'function') {
                event.call(this);
            }
        }

        // PageClicked event
        $(doc.body).on('click', function (e) {
            var $target = $(e.target);

            // Run all functions in onPageClicked function set
            for (var i = 0, event; event = eventHandlers.onPageClicked[i]; i++) {
                if (typeof event === 'function') {
                    event.call(this, e, $target);
                }
            }
        });

        // HashChange event
        if ($.fn.hashchange) {
            $win.on('hashchange', function (e) {
                // Run all functions in onHashChanged function set
                for (var i = 0, event; event = eventHandlers.onHashChanged[i]; i++) {
                    if (typeof event === 'function') {
                        event.call($win, e);
                    }
                }
            }).trigger('hashchange');
        }
    });

    $win.on({
        // PageRender event
        load: function (e) {
            // Run all functions in onPageLoaded function set
            for (var i = 0, event; event = eventHandlers.onPageLoaded[i]; i++) {
                if (typeof event === 'function') {
                    event.call($win, e);
                }
            }
        },

        // PageResize event
        resize: function (e) {
            // Run all functions in onPageResized function set
            for (var i = 0, event; event = eventHandlers.onPageResized[i]; i++) {
                if (typeof event === 'function') {
                    event.call($win, e);
                }
            }
        },

        // PageScroll event
        scroll: function (e) {
            // Run all functions in onPageScrolled function set
            for (var i = 0, event; event = eventHandlers.onPageScrolled[i]; i++) {
                if (typeof event === 'function') {
                    event.call($win, e);
                }
            }
        }
    });

    /**
     * Disable/enable form controls
     * @method disable
     * @param {Boolean} disable Be disabled or enabled
     * @return {jQuery} The disabled/enabled control
     */
    $.fn.disable = function (disable) {
        return this.each(function () {
            this.disabled = disable;
        });
    };

    /**
     * Check/uncheck form controls
     * @method check
     * @param {Boolean} check Be checked or unchecked
     * @return {jQuery} The checked/unchecked control
     */
    $.fn.check = function (check) {
        return this.each(function () {
            this.checked = check;
        });
    };

    /**
     * Make input be focused and set caret at end of value
     * @method focusAtEnd
     */
    $.fn.focusAtEnd = function () {
        var value = this.val();

        return this.val('').focus().val(value);
    };

    /**
     * Check value or innerHTML of element is empty or not
     * @method isEmpty
     * @return {Boolean}
     */
     $.fn.isEmpty = function () {
         return this[0].value === undefined ? this.text().trim() === '' : this[0].value.trim() === '';
     };

    /**
     * Check the available/existing of a object, if object is existing, the callback will be run
     * @method exist
     * @param {Function} callback_when_exist The callback is called when object is existed
     * @param {Function} callback_when_no_exist The callback is called when object is not existed
     * @return {jQuery}
     */
    $.fn.exist = function (callback_when_exist, callback_when_no_exist) {
        if (this.length > 0) {
            callback_when_exist.call(this);
        } else {
            if (callback_when_no_exist) {
                callback_when_no_exist.call(this);
            }
        }
        return this;
    };

})(Bob, jQuery, window, document);