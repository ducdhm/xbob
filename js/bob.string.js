/**
 * Bob String utilities
 * @author: ducdhm
 * @date: Thu, Dec 26th, 2013 (GTM+7)
 */
(function (String, $) {    
    /**
     * Format strings
     * @method format
     * @param {String} string The template string
     * @param {String[]} args Zero or more objects to format, supplied either in a comma-delimited list or as an array
     */
    if (typeof String.format !== 'function') {
        String.format = function (string) {
            var args = arguments;
            var pattern = new RegExp('{([0-' + arguments.length + '])}', 'g');
            
            return string.replace(pattern, function (match, index) {
                return args[+index + 1];
            });
        };
    }
    
    /**
     * Remove all spaces before string, replace all space between
     * words of string to a space and replace all space after last
     * string to a space if have
     * @method removeSpace
     * @param {String} string
     * @return {String} The space removed string
     */
    if (typeof String.format !== 'function') {
        String.removeSpace = function (string) {
            return string.replace(/\s*([^\s]+\s?)\s*/g, '$1');
        }
    }
    
    /**
     * Remove all before and after or before or after spaces string
     * @method trim
     * @param {String} string
     * @param {String} type The type of trim
     * @return {String} The trimmed string
     */
    if (typeof String.format !== 'function') {
        String.trim = function (string) {
            return string.replace(/^\s+|\s+$/, '');
        };
    }
    
    /**
     * Remove tone of all words in a string
     * @method removeTone
     * @param {String} string
     * @return {String} Non-tone string
     */
    if (typeof String.format !== 'function') {
        String.removeTone = function (string) {
            var str = string.toLowerCase();
            
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            
            return str;
        }
    }
    
    /**
     * Strip all tags of string
     * @method stripTags
     * @param {String} string
     * @return {String} The striped tag string
     */
    if (typeof String.format !== 'function') {
        String.stripTags = function (string) {
            return string.replace(/(<([^>]+)>)/ig, '');
        }
    }
    
    /**
     * Calculate width of text based on font
     * @method getWidth
     * @param {String} string
     * @param {String} font The font for text
     * @return {String} width of text
     */
    if (typeof String.format !== 'function') {
        String.getWidth = function (string, font) {
            font = font || '12px arial';
            
            var $temp = $('<div>' + string + '</div>').css({
                'position': 'absolute',
                'white-space': 'nowrap',
                'visibility': 'hidden',
                'font': font
            }).appendTo(document.body);
            var width = $temp.width();
            
            $temp.remove();
            
            return width;
        }
    }
    
    /**
     * Convert certain characters (&, <, >, ', and ") to their HTML character
     * equivalents for literal display in web pages.
     * @method encodeHTML
     * @param {String} string
     * @param {String} deep Enable or not encode space to `&nbsp;`
     * @return {String} The encoded text
     */
    if (typeof String.format !== 'function') {
        String.encodeHTML = function (string, deep) {
            var string = $('<div/>').text(string).html();
            
            return deep === true ? string.replace(/\s/g, '&nbsp;') : string;
        }
    }
    
    /**
     * Convert certain characters (&, <, >, ', and ") from their HTML character equivalents.
     * @method decodeHTML
     * @param {String} string
     * @return {String} The decoded text
     */
    if (typeof String.format !== 'function') {
        String.decodeHTML = function (string) {
            return $('<div>' + string + '</div>').text();
        }
    }
    
    /**
     * Remove all special characters in a string
     * @method removeSpecialCharacter
     * @param {String} string
     * @return {String} The text without special characters
     */
    if (typeof String.format !== 'function') {
        String.removeSpecialCharacter = function (string) {
            return string.replace(/[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\/{}\[\]\|\;\:\'\"\,\.\<\>\?]/g, '');
        }
    }
    
    /**
     * Encode url with spaces will be encoded into `+`
     * @method encodeUrl
     * @param {String} string
     * @return {String} The encoded string
     */
    if (typeof String.format !== 'function') {
        String.encodeUrl = function (string) {
            return encodeURIComponent(string).replace(/%20/g, '+');
        };
    }
    
    /**
     * Decode url with `+` will be encoded into space
     * @method decodeUrl
     * @param {String} string
     * @return {String} The decoded string
     */
    if (typeof String.format !== 'function') {
        String.decodeUrl = function (string) {
            return decodeURIComponent(string.replace(/\+/g, '%20'));
        };
    }
    
    /**
     * Convert `\n` to `<br />` in string
     * @method nl2br
     * @param {String} string
     * @return {String}
     */
    if (typeof String.format !== 'function') {
        String.nl2br = function (string) {
            return string.replace(/\n/g, '<br />');
        };
    }
    
    /**
     * Convert string to `\\u????`
     * @method toUnicode
     * @param {String} string
     * @return {String}
     */
    if (typeof String.format !== 'function') {
        String.toUnicode = function (string) {
            var unicodeString = '';
            for (var i = 0; i < string.length; i++) {
                var theUnicode = string.charCodeAt(i).toString(16).toUpperCase();
                while (theUnicode.length < 4) {
                    theUnicode = '0' + theUnicode;
                }
                theUnicode = '\\u' + theUnicode;
                unicodeString += theUnicode;
            }
            return unicodeString;
        };
    }
    
    /**
     * Remove BOM character in string
     * @method removeBOM
     * @param {String} string
     * @return {String}
     */
    if (typeof String.format !== 'function') {
        String.removeBOM = function (string) {
            return string.replace(/%EF%BB%BF/gi, '');
        }
    }
    
    /**
     * Limit the string with specified characters number
     * @method limit
     * @param {String} string
     * @param {Number} length The length of string
     * @param {String} endCharacter The end character of string
     * @return {String}
     */
    if (typeof String.format !== 'function') {
        String.limit = function (string, length, endCharacter) {
            return string.substr(0, length) + (string.length > length ? endCharacter : '');
        };
    }
    
    /**
     * Capitalize the string
     * @method toCapitalize
     * @param {String} string
     * @return {String}
     */
    if (typeof String.format !== 'function') {
        String.toCapitalize = function (string) {
            return string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        };
    }
    
    /**
     * Convert dash-case string to camel-case string.
     * Example: `bob-khin` to `bobKhin`
     * @param {String} string
     * @returns {String}
     */
    if (typeof String.dashToCamel !== 'function') {
        String.dashToCamel = function (string) {
            return string.replace(/(\-[a-z])/g, function ($1) {
                return $1.toUpperCase().replace('-', '');
            });
        };
    }
    
    /**
     * Convert underscore-case string to camel-case string.
     * Example: `bob_khin` to `bobKhin`
     * @param {String} string
     * @returns {String}
     */
    if (typeof String.underscoreToCamel !== 'function') {
        String.underscoreToCamel = function (string) {
            return string.replace(/(\_[a-z])/g, function ($1) {
                return $1.toUpperCase().replace('_', '');
            });
        };
    }
    
    /**
     * Convert camel-case string to dash-case string.
     * Example: `bobKhin` to `bob-khin`
     * @param {String} string
     * @returns {String}
     */
    if (typeof String.camelToDash !== 'function') {
        String.camelToDash = function (string) {
            return string.replace(/([A-Z])/g, function ($1) {
                return '-' + $1.toLowerCase();
            });
        };
    }
    
    /**
     * Convert camel-case string to underscore-case string.
     * Example: `bobKhin` to `bob_khin`
     * @param {String} string
     * @returns {String}
     */
    if (typeof String.camelToUnderscore !== 'function') {
        String.camelToUnderscore = function (string) {
            return string.replace(/([A-Z])/g, function ($1) {
                return '_' + $1.toLowerCase();
            });
        };
    }
    
    /**
     * Replace all `-` to space
     * Example: `bob-khin` to `bob khin`
     * @param {String} string
     * @returns {String}
     */
    if (typeof String.dashToSpace !== 'function') {
        String.dashToSpace = function (string) {
            return string.replace(/\-/g, ' ');
        };
    }
    
    /**
     * Replace all `_` to space
     * Example: `bob_khin` to `bob khin`
     * @param {String} string
     * @returns {String}
     */
    if (typeof String.underscoreToSpace !== 'function') {
        String.underscoreToSpace = function (string) {
            return string.replace(/\_/g, ' ');
        };
    }
    
    /**
     * Capitalise a string
     * @param {String} string
     * @param {Boolean} all Is capitalise first letter of all words or not
     * @returns {String}
     */
    if (typeof String.capitalise !== 'function') {
        String.capitalise = function (string, all) {
            if (all) {
                return string.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
                    return p1 + p2.toUpperCase();
                });
            } else {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        };
    }
    
})(String, jQuery);