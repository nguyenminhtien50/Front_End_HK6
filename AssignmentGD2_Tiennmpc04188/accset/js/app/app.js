let app = angular.module("ASMPC04188HTML", ["ngRoute"]);
let BASE_URL = "http://localhost:3000/";

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/trangChu.html',
        })
        .when('/gioiThieu', {
            templateUrl: 'templates/gioiThieu.html'
        })
        .when('/danhSachMonHoc', {
            templateUrl: 'templates/danhSachMonHoc.html'
        })
        .when('/baiViet', {
            templateUrl: 'templates/baiViet.html'
        })
        .when('/lienHe', {
            templateUrl: 'templates/lienHe.html',
        })
        .when('/dangNhap', {
            templateUrl: 'dangNhap.html',
        })
        .when('/dangKy', {
            templateUrl: 'dangky.html',
        })
        .when('/quenMatKhau', {
            templateUrl: 'quenMatKhau.html',
        })
        .when('/quiz', {
            templateUrl: 'quiz',
        })
        .otherwise({
            redirecTo: '/'
        })
});
app.controller("listProduct1", listProduct1);
function listProduct1($scope, $http, $rootScope) {
    // Simple GET request example:
    $http({
        method: 'GET',
        url: BASE_URL + "Subjects"
    }).then(function successCallback(response) {
        console.log(response);
        $scope.Subjects = response.data;
        // $scope.Subjects = $routeParams.idSubject;
        $scope.pageCount = Math.ceil($scope.Subjects.length / 8);
    }, function errorCallback(response) {
        console.log(response);
    });

    // load quizz
    $http({
        method: 'GET',
        url: BASE_URL + "Quizs",
    }).then
        (function successCallback(response) {
            console.log(response);
            console.log(response.data.data);
            $scope.Quizs = response.data.data;
        }, function errorCallback(response) {
            console.log(response);
        });

    // chuyển page
    $scope.first = function () {
        $scope.begin = 0;
    }
    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin -= 8;
        }
    }
    $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 8) {
            $scope.begin += 8;
        }
    }
    $scope.last = function () {
        $scope.begin = ($scope.pageCount - 1) * 8;
    }
    // dangNhap
    $http({
        method: 'GET',
        url: BASE_URL + "Users"
    }).then(function successCallback(response) {
        console.log(response);
        $scope.Users = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
    
    $scope.dangnhap = function () {
        var check = true;
        $scope.Users.forEach(user => {
            if (user.username === $scope.username && user.password === $scope.password) {
                alert('Đăng nhập thành công');
                window.location.assign("index.html");
                check = false;
            }
        });
        if (check) {
            alert('Thất bại');
        }
    };
    

};

