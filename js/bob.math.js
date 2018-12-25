/**
 * Bob Math utilities
 * @author: ducdhm
 * @created: Tue, Feb 11th, 2014 (GTM+7)
 */
(function (Math) {
    /**
     * Find the number of decimal places
     * @method findDec
     * @param {Float|Number} dec
     * @return {Number}
     */
    var findDec = function (dec) {
        var count = 0;
        while (dec % 1) {
            dec *= 10;
            count++;
        }

        return count;
    };

    /**
     * Find the greatest number of decimal places
     * @method findFixed
     * @param {Float|Number} dec
     * @return {Number}
     */
    var findFixed = function () {
        var fixed = [];
        for (var i = 0, arg; arg = arguments[i]; i++) {
            fixed.push(findDec(arg));
        }

        return Math.max.apply(this, fixed)
    };

    /**
     * Calculate total
     * @method findFixed
     * @param {Float|Number}
     * @return {Float|Number}
     */
    var calculate = function () {
        var total = 0;

        for (var i = 0, arg; arg = arguments[i]; i++) {
            total += arg;
        }

        return total;
    }

    /**
     * Add float number
     * @method addNumber
     * @param {Float|Number}
     * @return {Float|Number}
     */
    Math.addNumber = function() {
        //Determine the greatest number of decimal places
        var fixed = findFixed.apply(this, arguments);
        var total = calculate.apply(this, arguments);

        //do the math then do a toFixed, could do a toPrecision also
        return +total.toFixed(fixed);
    }

})(Math);