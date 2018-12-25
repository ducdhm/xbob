/**
 * Bob Number utilities
 * @author: ducdhm
 * @created: Mon, Apr 1st, 2013 (GTM+7)
 */
(function (Number) {
    var prototype = Number.prototype;

    /**
     * Format number with specific separator
     * @method format
     * @param {String} separator The separator between digits such as `,` `.`
     * @return {String}
     */
    if (!prototype.format) {
        prototype.format = function (separator) {
            var regex = /(\d+)(\d{3})/,
                string = String(this);

            while (regex.test(string)) {
                string = string.replace(regex, '$1' + separator + '$2');
            }
            return string;
        }
    }

})(Number);