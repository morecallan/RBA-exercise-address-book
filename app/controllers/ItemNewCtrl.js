app.controller('ItemNewCtrl', function ($scope, $http, Upload, $timeout, $location, credFactory, utilityFactory) {
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
        $http
            .post("https://callan-address-book.firebaseio.com/contacts/.json",
                JSON.stringify({
                    name: $scope.newContact.name,
                    phone: $scope.newContact.phone,
                    email: $scope.newContact.email,
                    address: $scope.newContact.address,
                    city: $scope.newContact.city,
                    state: $scope.newContact.state,
                    zip: $scope.newContact.zip,
                    jobTitle: $scope.newContact.jobTitle,
                    birthday: utilityFactory.adjustTimeForDisplay($scope.newContact.birthday),
                    isFavorite: false,
                    image: $scope.newContact.image
                }))
            .success(function(){
                $scope.newContact = "";
                $location.url("/items/list");
            });
        };

    $scope.fieldEmpty = function() {
        if ($scope.newContact.name === "" || $scope.newContact.phone === "" ||  $scope.newContact.email === "" || $scope.newContact.isBirthday === "") {
            return true;
        } else {
            return false;
        }
    }
});