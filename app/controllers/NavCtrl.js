app.controller("NavCtrl", function($scope, $location, firebaseURL, authFactory){
    
    let ref = new Firebase(firebaseURL);

    $scope.loggedIn = authFactory.isAuthenticated();

    $scope.account = {
        email: "",
        password: ""
    };

    $scope.logout = () => {
        if ($location.path() === "/logout") {
            $scope.$apply(function() {
                ref.unauth();  
                $scope.loggedIn = authFactory.isAuthenticated();
                $location.path("/login");
            })   
        }
    }

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
                loggedIn = true;
                $location.path("/");
            })
        });
    };
});