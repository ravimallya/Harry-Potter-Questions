angular.module('app.controllers', [])
.controller('mainCtrl', ['$scope', '$localStorage', '$state', function ($scope, $localStorage, $state) {
    $localStorage.$reset();
    $scope.getName = function (n) {
        $localStorage.UserName = n;
        $state.go('question');
    }
}])

.controller('questionsCtrl', ['$scope', 'WizardHandler', '$timeout', '$http', '$localStorage', '$state', 'questionService', function ($scope, WizardHandler, $timeout, $http, $localStorage, $state, questionService) {
    $scope.UserName = $localStorage.UserName;
    questionService.async().then(function (data) {
        $scope.questions = data;
        // console.log($scope.questions);
    });
    $scope.nextQuestion = function () {
        $timeout(function () {
            WizardHandler.wizard().next();
        }, 500);
    }
    $scope.finishedWizard = function (data) {
        $state.go('results');
    }
}])
.controller('resultCtrl', ['$scope', '$timeout', '$http', '$localStorage', '$state', 'questionService', function ($scope, $timeout, $http, $localStorage, $state, questionService) {
    $scope.UserName = $localStorage.UserName;
    function calculate() {
        var i;
        $scope.correct = 0;
        $scope.wrong = 0;
        $scope.quests = $scope.questions.length;
        for (i = 0; i < $scope.questions.length; i++) {
            if ($scope.questions[i].correct == $scope.questions[i].selected) {
                $scope.correct = $scope.correct + 1;
            }
            else {
                $scope.wrong = $scope.wrong + 1;
            }
        }
        $scope.cPerc = (($scope.correct / $scope.quests) * 100);
        $scope.wPerc = (($scope.wrong / $scope.quests) * 100);
    }
    function drawChart() {
        calculate();

        // Radialize the colors
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            console.log(color)
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                  [0, color],
                  [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });
        Highcharts.setOptions({
            colors: ['#50B432', '#ED561B']
        });
        // Build the chart
        $timeout(function () {
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Your Results'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            },
                            connectorColor: 'silver'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    data: [{
                        name: 'Correct',
                        y: $scope.cPerc,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Wrong',
                        y: $scope.wPerc
                    }]
                }]
            });
        }, 500);
        // end chart
    }
    questionService.async().then(function (data) {
        $scope.questions = data;
        if ($scope.questions[0].selected == '0')
            $state.go('question');
        else
            drawChart();

    });
    $scope.showAnswer = function () {
        $state.go('answers');
    };
}])
.controller('answersCtrl', ['$scope', 'WizardHandler', '$timeout', '$http', '$localStorage', '$state', 'questionService', function ($scope, WizardHandler, $timeout, $http, $localStorage, $state, questionService) {
    $scope.UserName = $localStorage.UserName;
    questionService.async().then(function (data) {
        if (data[0].selected == '0')
            $state.go('question');
        else
            $scope.questions = data;
    });

    $scope.setClass = function (correct, choice) {
        if (parseInt(choice) === parseInt(correct)) {
            return "button-green";
        }

    }
    $scope.startOver = function () {
        angular.forEach($scope.questions, function (value, key) {
            value.selected = "0"
        });
        $state.go('main');
    }
}])
;