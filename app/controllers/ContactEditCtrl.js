app.controller('ContactEditCtrl', function ($scope, $routeParams, $location, Upload, credFactory, contactStorage, utilityFactory) {
    $scope.btnText = "Update Contact";
    $scope.editMode = true;
    $scope.uploadSuccess = false;
      
    $scope.newContact = {};


    contactStorage.getSingleContact($routeParams.contactId)
    .then(function successCallback(response){
        $scope.newContact = response;
        $scope.newContact.birthday = utilityFactory.adjustTimeForFillIn($scope.newContact.birthday);
    });


    $scope.addNewContact = function() {
        if ($scope.newContact.birthday instanceof Date) {
          $scope.newContact.birthday = utilityFactory.adjustTimeForDisplay($scope.newContact.birthday);
        } else {
          $scope.newContact.birthday = $scope.newContact.birthday;
        }
        contactStorage.updateContact($routeParams.contactId, $scope.newContact)
        .then(function successCallback(response){
            $location.url("/contacts/list");
        });
    };
    

    $scope.creds = {
      bucket: 'address-book-img',
      accessKeyId: "",
      secretAccessKey: ""
    };
     

    $scope.upload = function() {
      credFactory.getCredentials().then(function(response){
        $scope.creds.accessKeyId = response.user_address_app.alpha;
        $scope.creds.secretAccessKey = response.user_address_app.beta;
        // Configure The S3 Object 
        AWS.config.update({ accessKeyId: $scope.creds.accessKeyId, secretAccessKey: $scope.creds.secretAccessKey});
        AWS.config.region = 'us-east-1';
        var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
       
        if($scope.newContact.image) {
          var params = { Key: $scope.newContact.image.name, ContentType: $scope.newContact.image.type, Body: $scope.newContact.image, ServerSideEncryption: 'AES256' };
          bucket.putObject(params, function(err, data) {
            if (err) { alert("error"); } else {
              $scope.$apply(function (){
                $scope.newContact.image = "https://s3.amazonaws.com/address-book-img/" + $scope.newContact.image.name;
                $scope.uploadSuccess = !$scope.uploadSuccess;
              });
            }
          });
        }
      });
    };


    $scope.fieldEmpty = function() {
        if ($scope.newContact.name === "" || $scope.newContact.phone === "" ||  $scope.newContact.email === "" || $scope.newContact.isBirthday === "") {
            return true;
        } else {
            return false;
        }
    };
});