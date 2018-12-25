/**
 * Bob String utilities
 * @author: ducdhm
 * @date: Thu, Dec 26th, 2013 (GTM+7)
 */
(function (String, $) {
    var prototype = String.prototype;

    /**
     * Format strings
     * @method format
     * @param {String} string The template string
     * @param {String[]} args Zero or more objects to format, supplied either in a comma-delimited list or as an array
     */
    if (!String.format) {
        String.format = function (string) {
            var args = arguments;
            var pattern = new RegExp('{([0-' + arguments.length + '])}', 'g');

            return string.replace(pattern, function(match, index) {
                return args[+index + 1];
            });
        };
    }

    /**
     * Remove all spaces before string, replace all space between
     * words of string to a space and replace all space after last
     * string to a space if have
     * @method removeSpace
     * @return {String} The space removed string
     */
    if (!prototype.removeSpace) {
        prototype.removeSpace = function () {
            return this.replace(/\s*([^\s]+\s?)\s*/g, '$1');
        }
    }

    /**
     * Remove all before and after or before or after spaces string
     * @method trim
     * @param {String} type The type of trim
     * @return {String} The trimmed string
     */
    if (!prototype.trim) {
        prototype.trim = function () {
            return this.replace(/^\s+|\s+$/, '');
        };
    }

    /**
     * Remove tone of all words in a string
     * @method removeTone
     * @return {String} Non-tone string
     */
    if (!prototype.removeTone) {
        prototype.removeTone = function () {
            var str = this.toLowerCase();

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
     * @return {String} The striped tag string
     */
    if (!prototype.stripTags) {
        prototype.stripTags = function () {
            return this.replace(/(<([^>]+)>)/ig, '');
        }
    }

    /**
     * Calculate width of text based on font
     * @method getWidth
     * @param {String} font The font for text
     * @return {String} width of text
     */
    if (!prototype.getWidth) {
        prototype.getWidth = function (font) {
            font = font || '12px arial';

            var $temp = $('<div>' + string + '</div>').css({
                    'position': 'absolute',
                    'white-space': 'nowrap',
                    'visibility': 'hidden',
                    'font': font
                }).appendTo($('body')),
                width = $temp.width();

            $temp.remove();

            return width;
        }
    }

    /**
     * Convert certain characters (&, <, >, ', and ") to their HTML character
     * equivalents for literal display in web pages.
     * @method encodeHTML
     * @param {String} deep Enable or not encode space to `&nbsp;`
     * @return {String} The encoded text
     */
    if (!prototype.encodeHTML) {
        prototype.encodeHTML = function (deep) {
            var string = $('<div/>').text(this).html();

            return deep === true ? string.replace(/\s/g, '&nbsp;') : string;
        }
    }

    /**
     * Convert certain characters (&, <, >, ', and ") from their HTML character equivalents.
     * @method decodeHTML
     * @return {String} The decoded text
     */
    if (!prototype.decodeHTML) {
        prototype.decodeHTML = function () {
            return $('<div>' + this + '</div>').text();
        }
    }

    /**
     * Remove all special characters in a string
     * @method removeSpecialCharacter
     * @return {String} The text without special characters
     */
    if (!prototype.removeSpecialCharacter) {
        prototype.removeSpecialCharacter = function () {
            return this.replace(/[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\/{}\[\]\|\;\:\'\"\,\.\<\>\?]/g, '');
        }
    }

    /**
     * Encode url with spaces will be encoded into `+`
     * @method encodeUrl
     * @return {String} The encoded string
     */
    if (!prototype.encodeUrl) {
        prototype.encodeUrl = function () {
            return encodeURIComponent(this).replace(/%20/g, '+');
        };
    }

    /**
     * Decode url with `+` will be encoded into space
     * @method decodeUrl
     * @return {String} The decoded string
     */
    if (!prototype.decodeUrl) {
        prototype.decodeUrl = function () {
            return decodeURIComponent(this.replace(/\+/g, '%20'));
        };
    }

    /**
     * Convert `\n` to `<br />` in string
     * @method nl2br
     * @return {String}
     */
    if (!prototype.nl2br) {
        prototype.nl2br = function () {
            return this.replace(/\n/g, '<br />');
        };
    }

    /**
     * Convert string to `\\u????`
     * @method toUnicode
     * @return {String}
     */
    if (!prototype.toUnicode) {
        prototype.toUnicode = function () {

            var unicodeString = '';
            for (var i = 0; i < this.length; i++) {
                var theUnicode = this.charCodeAt(i).toString(16).toUpperCase();
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
     * @return {String}
     */
    if (!prototype.removeBOM) {
        prototype.removeBOM = function () {
            return this.replace(/%EF%BB%BF/gi, '');
        }
    }

    /**
     * Limit the string with specified characters number
     * @method limit
     * @param {Number} length The length of string
     * @param {String} end_character The end character of string
     * @return {String}
     */
    if (!prototype.limit) {
        prototype.limit = function (length, end_character) {
            return this.substr(0, length) + (this.length > length ? end_character : '');
        };
    }

    /**
     * Capitalize the string
     * @method toCapitalize
     * @return {String}
     */
    if (!prototype.toCapitalize) {
        prototype.toCapitalize = function() {
            return this.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
            });
        };
    }

})(String, jQuery);