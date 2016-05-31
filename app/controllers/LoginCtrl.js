app.controller("LoginCtrl", function($scope, $location, firebaseURL, authFactory){
    let ref = new Firebase(firebaseURL);

    $scope.account = {
        email: "",
        password: ""
    };

    $scope.register = () => {
        ref.createUser({
            email: $scope.account.email,
            password: $scope.account.password
        }, (error, userData) => {
            if (error) {
            } else if (userData) {
                $scope.login();
            }
        });
    };

    $scope.login = () => {
        authFactory
        .authenticate($scope.account)
        .then(() => {
            $scope.$apply(function() {
                $location.path("/");
            })
        });
    };
});