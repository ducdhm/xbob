/**
 * Bob Object utilities
 * @author: ducdhm
 * @date: Thu, Dec 26th, 2013 (GTM+7)
 */
(function (Object) {
    /**
     * Sort object by key
     * @method sortByKey
     * @param {Object} obj The object will be sorted
     * @param {Boolean} desc Sort by ascending or descending
     * @return {Object} The sorted object
     */
    if (!Object.sortByKey) {
        Object.sortByKey = function (obj, desc) {
            var sorted = {},
                array = [];

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    array.push(key);
                }
            }

            array.sort();
            if (desc) {
                array.reverse();
            }

            for (var i = 0, item; item = array[i]; i++) {
                sorted[item] = obj[item];
            }

            return sorted;
        }
    }

    /**
     * Get size of object
     * @method getSize
     * @param {Object} obj The object will be get size
     * @return {Number} Number of properties in object
     */
    if (!Object.getSize) {
        Object.getSize = function (obj) {
            var size = 0,
                key;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }

            return size;
        };
    }

    /**
     * Get primitive type of object
     * @method getPrimitiveType
     * @param {*} obj The object will be checked
     * @return {String} The primitive type of object
     */
    if (!Object.getPrimitiveType) {
        Object.getPrimitiveType = function (obj) {
            return Object.prototype.toString.call(obj);
        }
    }

    /**
     * Check obj is set value or not
     * @method isSet
     * @param {Object} obj Checked object
     * @return {Boolean}
     */
    if (!Object.isSet) {
        Object.isSet = function (obj) {
            return obj !== undefined;
        };
    }

    /**
     * Check available of value.
     * @method isEmpty
     * @param {Object|String|Array} value Checked value
     * @return {Boolean}
     */
    if (!Object.isEmpty) {
        Object.isEmpty = function (value) {
            var result;

            if (Object.isSet(value)) {
                switch (Object.getPrimitiveType(value)) {
                    case '[object String]':
                        result = value.trim() === '';
                        break;
                    case '[object Object]':
                        for (key in value) {
                            result = key === undefined;
                        }
                        break;
                    case '[object Array]':
                        result = value.length === 0;
                        break;
                    case '[object Null]':
                        result = true;
                        break;
                    // No default
                }
            } else {
                result = false;
            }

            return result;
        };
    }

})(Object);