angular.module('app.services', [])

.factory('BlankFactory', [function () {

}])

.service('BlankService', [function () {

}])
.factory('questionService', ['$http', function ($http) {
    var promise;
    var questionService = {
        async: function () {
            if (!promise) {
                promise =  $http.get('app/scripts/questions.json').then(function (response) {
                    return response.data;
                });
            }
            return promise;
        }
    };
    return questionService;
}])