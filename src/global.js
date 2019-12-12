
export var global = {

    // api_url : 'http://localhost/api-react/',  // local server
    api_url : 'https://pixbrand.in/api-react/',  // live server

    // EMAIL FORMAT VALIDATION
    isValidEmail: (email)=> {
        var EMAIL_REGEXP = /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email)
        && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
        if (!EMAIL_REGEXP) {
        return false;
        } else {
        return true;
        }
    },

    // ONLY NUMERIC VALUE ALLOWED
    isValidPhone: (phone_number)=> {
        var PHONE_REGEXP = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone_number);
        if (!PHONE_REGEXP) {
        return false;
        } else {
        return true;
        }
    },

};
