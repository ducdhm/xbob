/**
 * Bob utilities
 * @author: ducdhm
 * @date: Thu, Dec 26th, 2013 (GTM+7)
 */
(function (Bob, $, win, doc, undefined) {
    /**
     * Check the available of flash
     * @method isFlashAvailable
     * @return {Boolean}
     */
    Bob.isFlashAvailable = function () {
        var hasFlash = false;
        try {
            hasFlash = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
        } catch (e) {
            hasFlash = navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && true;
        }
        return hasFlash;
    };

    Bob.emptyFn = function () {};

    /**
     * Redirect to other site without referrer
     * @method redirectTo
     * @param {String} url The url of site
     * @param {String} target The type of target
     */
    Bob.redirectTo = function (url, target) {
        win.open(url, target || '');
    };

    /**
     * Redirect to other site with referrer
     * @method redirectTo2
     * @param {String} url The url of site
     * @param {String} target The type of target
     */
    var templateForm;
    Bob.redirectTo2 = function (url, target) {
        if (!templateForm) {
            templateForm = doc.createElement('form');
            templateForm.style.position = 'absolute';
            templateForm.style.left = '-9999px';
            templateForm.style.top = '-9999px';
            templateForm.style.visibility = 'hidden';
            doc.body.appendChild(templateForm);
        }

        url = url.split('?');

        templateForm.action = url[0];

        // Add query string if existed
        if (url[1]) {
            var params = url[1].split('&'),
                inputs_string = '';

            for (var i = 0, param; param = params[i]; i++) {
                param = param.split('=');
                inputs_string += '<input type="hidden" name="' + param[0] + '" value="' + param[1] + '" />';
            }

            templateForm.innerHTML = inputs_string;
        }

        if (target !== undefined) {
            templateForm.target = target;
        }

        templateForm.submit();
    };

})(Bob, jQuery, window, document);