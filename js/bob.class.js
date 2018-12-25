/**
 * Bob Class utilities
 * @author: ducdhm
 * @date: Thu, Dec 26th, 2013 (GTM+7)
 */
(function (Bob, $, win) {
    /**
     * Get or init object with specified name or namespace such as `MyApp.Module1`
     * @method initObject
     * @param {String} object_name The name of object or namespace
     * @param {*} object_type The type of object. Function, string, number, etc...
     * @return {*}
     */
    var initObject = function (object_name, object_type) {
        var parts = object_name.split('.'),
            parent = win,
            length = parts.length;

        for (var i = 0, part; part = parts[i]; i++) {
            parent = parent[part] = parent[part] || (i === length - 1 ? object_type : {});
        }

        return parent;
    }

    /**
     * Create module
     * @method module
     * @param {String} module_name The module name
     * @param {Object} module_config The configuration of module
     * @returns {Object}
     */
    Bob.module = function (module_name, module_config) {
        return initObject(module_name, module_config || {});
    };

    /**
     * Implements prototype inheritance pattern.
     * @method inherit
     * @param {Function} Parent constructor
     * @param {Function} Child constructor
     * @param {Object} proto Child's prototype will be extended with properties and methods from this object
     */
    Bob.inherit = function(Parent, Child, proto) {
        // create empty constructor with prototype from Parent
        var F = function() {};
        F.prototype = Parent.prototype;

        // make Child.prototype.__proto__ = Parent.prototype
        Child.prototype = new F();

        // restore constructor property (was overwritten in previous line)
        Child.prototype.constructor = Child;

        // save link to parent's prototype (for easy calling parent's methods)
        Child.prototype.__super__ = Parent.prototype;

        // extend child's prototype
        if ($.isPlainObject(proto)) {
            $.extend(Child.prototype, proto);
        }
    };

    /**
     * Create class with specified name or namespace such as `MyApp.Module1`
     * @method create
     * @param {String} class_name The class name
     * @param {Object} proto The prototype of this class
     * @return {Object}
     */
    Bob.create = function (class_name, proto) {
        var klass = initObject(class_name, function () {
            this.init.apply(this, arguments);
        });

        proto.constructor = klass;
        klass.prototype = proto;
        klass.subclasses = [];
        klass.superclass = null;

        return klass;
    };

    /**
     * Implements prototype inheritance pattern.
     * @method extend
     * @param {String} child_name The name of child class
     * @param {String|Function} parent_name The name of parent class or the parent class
     * @param {Object} proto Child's prototype will be extended with properties and methods from this object
     * @return {Object}
     */
    Bob.extend = function (child_name, parent_name, proto) {
        var Parent = typeof parent_name === 'function' ? parent_name : initObject(parent_name),
            Child = initObject(child_name, function () {
                this.init.apply(this, arguments);
            });

        Bob.inherit(Parent, Child, proto);

        Parent.subclasses.push(Child);
        Child.superclass = Parent;

        return Child;
    };

})(Bob, jQuery, window);