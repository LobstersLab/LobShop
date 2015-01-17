var DEFAULT_ENV = 'development';
var DEFAULT_PORT = 3310;
var CONNECTION_STRINGS = {
    local: 'mongodb://192.168.9.137:27017/CCCP_Dev',
    test: 'mongodb://192.168.9.137:27017/CCCP_Test',
    cloud: 'mongodb://vdimitrov:123123@kahana.mongohq.com:10033/CCCPDataBase'
};


function Config (environment, port) {
    this.env = environment || DEFAULT_ENV;
    this.port = port || DEFAULT_PORT;
    this.session = {
        secret: 'chuck norris',
        resave: true,
        saveUninitialized: true
    };
    this.auth = {
        /*
        hostname: 'axsdry.axsmarine.com',
        path: '/common/server/controllerLogin.php'
       */
        cookieName: 'axsmarineV4',
        hostname: '192.168.9.101',
        path: '/velin.vangelov/AxsDry4/common/server/controllerLogin.php',
    }
}

Config.prototype = {
    getDatabase: function () {
        switch (this.env) {
            case 'production':
            case 'development': 
                return CONNECTION_STRINGS.local; 
                break;
            case 'testing':
                return CONNECTION_STRINGS.test;
                break;
        }
    },
    setEnvironment: function (environment) {
        if (environment) {
            this.env = environment;
        }
    },
    getEnvironment: function () {
        return this.env;
    },
    setPort: function (port) {
        if (!port && typeof(port) !== 'number') {
            throw new Error('Port must be a number!');    
        }
        
        this.port = port;
    },
    getPort: function () {
        return this.port;
    }
};

module.exports = Config;