angular.module('disc.settings',
    [])
    .constant('DisciturSettings', {
        apiUrl: 'http://localhost:59739/api/',
        //apiUrl: 'http://www.discitur.somee.com/api/',
        authToken: 'disc.auth.token',
        criptoKey: '7061737323313233',
        viewHelp: 'disc.viewHelp',
        lastLessonsNum: 5,
        testEnv: true,
        isInMaintenance: false
    })