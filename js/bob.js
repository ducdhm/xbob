var Bob = Bob || {};

function log() {
    if (typeof(console) !== "undefined") {
        if (Bob.debug) {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                // Previous used JSON, but that crashed IE sometimes. So this is pretty crap, but at least safer
                if (arguments.length == 1) {
                    console.log(arguments[0]);
                } else if (arguments.length === 2) {
                    console.log(arguments[0], arguments[1]);
                } else if (arguments.length > 2) {
                    console.log(arguments[0], arguments[1], arguments[2]);
                }
            } else {
                console.log(arguments);
            }
        }
    }
}