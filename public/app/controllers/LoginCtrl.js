app.controller("LoginCtrl", function($window, $scope, $location, $rootScope, Upload, firebaseURL, authFactory, credFactory, contactStorage){
    let ref = new Firebase(firebaseURL);
    $scope.userError = false;
    $scope.userEditMode = false;
    $scope.userUploadSuccess = false;



    $scope.$watch(function($scope) { return $scope.userError }, function() {
        console.log("oh hey");
        document.getElementById('errorMessageBox').focus();
    });




    $scope.closeModal = () => {
        $scope.userError = false;
    }

    if($location.path() === "/login"){
        $rootScope.modeLogin = true;
    }

    if($location.path() === "/register"){
        $rootScope.modeLogin = false;
    }



    $rootScope.account = {
        firstName: "",
        email: "",
        password: "",
        imagePlaceholder: "img/default.png",
        image: "img/default.png"
    };

    if($location.path() === "/logout"){
        ref.unauth();
        $rootScope.isActive = false;
    }

    $scope.register = (authFactory) => {
        ref.createUser({
            email: $rootScope.account.email,
            password: $rootScope.account.password
        }, (error, userData) => {
            if (error) {
                $scope.errorMessage = error.message;
                $scope.userError = true;
                $scope.$apply();
            } else if (userData) {
                $scope.writeDetailsForUser();
            }
        });
    };

    $scope.writeDetailsForUser = () => {
        authFactory
        .authenticate($rootScope.account)
        .then((userCreds) => {
            authFactory.writeUserDetails(userCreds.uid).then(() => {
                authFactory.returnUserDetails(userCreds).then((results) => {
                    let resultingUserKey = Object.keys(results)[0]
                    let currentUser = results[resultingUserKey]
                    $rootScope.account = currentUser;
                });
            })
                $scope.$apply(function() {
                    $location.path("/");
                    $rootScope.isActive = true;
                })
        });
    };

    


    $scope.login = () => {
        authFactory
        .authenticate($rootScope.account)
        .then((userCreds) => {
            authFactory.returnUserDetails(userCreds).then((results) => {
                let resultingUserKey = Object.keys(results)[0]
                let currentUser = results[resultingUserKey]
                $rootScope.account = currentUser;
            });
            $scope.$apply(function() {
                $location.path("/");
                $rootScope.isActive = true;
            })
        })
        .catch((error) => {
                $scope.errorMessage = error.message;
                $scope.userError = true;
                $scope.$apply();
        });
    };

    $scope.creds = {
      bucket: 'address-book-img',
      accessKeyId: "",
      secretAccessKey: ""
    };

    $scope.userImgUpload = function() {
        if ($rootScope.account.imagePlaceholder !== "./img/default.png") {
          credFactory.getCredentials().then(function(response){
            $scope.creds.accessKeyId = response.user_address_app.alpha;
            $scope.creds.secretAccessKey = response.user_address_app.beta;
            // Configure The S3 Object 
            AWS.config.update({ accessKeyId: $scope.creds.accessKeyId, secretAccessKey: $scope.creds.secretAccessKey});
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
           
            if($rootScope.account.imagePlaceholder !== null) {
              var params = { Key: $rootScope.account.imagePlaceholder.name, ContentType: $rootScope.account.imagePlaceholder.type, Body: $rootScope.account.imagePlaceholder, ServerSideEncryption: 'AES256' };
              bucket.putObject(params, function(err, data) {
                if (err) { alert("error"); } else {
                  $scope.$apply(function (){
                    $rootScope.account.image = "https://s3.amazonaws.com/address-book-img/" + $rootScope.account.imagePlaceholder.name;
                    $scope.userUploadSuccess = !$scope.userUploadSuccess;
                  });
                }
              });
            }
          });
        }
    };
});