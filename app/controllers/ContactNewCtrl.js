app.controller('ContactNewCtrl', function ($scope, $location, Upload, credFactory, utilityFactory, contactStorage) {
    $scope.btnText = "Add Contact";
    $scope.editMode = false;
    $scope.uploadSuccess = false;


    $scope.newContact = {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        jobTitle: "",
        birthday: new Date(),
        isFavorite: false,
        image: "./img/default.png"
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


    $scope.addNewContact = function() {
        contactStorage.addNewContact($scope.newContact)
        .then(function successCallback(response){
            $scope.newContact = "";
            $location.url("/items/list");
            $scope.newContact.birthday = new Date();
            $scope.newContact.isFavorite = false;
            $scope.newContact.image = "./img/default.png";
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