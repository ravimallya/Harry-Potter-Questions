angular.module('myApp', [
    'ngMaterial',
    'mgo-angular-wizard',
    'ui.router',
    'ngStorage',
    'app.controllers',
    'app.routes',
    'app.services',
    'app.directives'])

.run(['$rootScope', '$state', '$window', function($rootScope, $state, $window) {

}])
.config(['$httpProvider', function ($httpProvider) {


}]);