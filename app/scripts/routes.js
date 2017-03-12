angular.module('app.routes', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // use the HTML5 History API & set HTM5 mode true
    $locationProvider.html5Mode(true);
    $stateProvider
     .state('main', {
         url: '/',
         templateUrl: '/app/views/main.html',
         controller: 'mainCtrl'
     })
     .state('question', {
         url: '/questions',
         templateUrl: '/app/views/questions.html',
         controller: 'questionsCtrl' 
     })
    .state('results', {
        url: '/result',
        templateUrl: '/app/views/result.html',
        controller: 'resultCtrl'
    })
     .state('answers', {
         url: '/answer',
         templateUrl: '/app/views/answer.html',
         controller: 'answersCtrl'
     })

    $urlRouterProvider.otherwise('/')
}]);