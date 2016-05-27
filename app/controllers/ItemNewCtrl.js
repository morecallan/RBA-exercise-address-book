app.controller('ItemNewCtrl', function ($scope, $http, Upload, $timeout, $location, credFactory) {
    $scope.newContact = {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        jobTitle: "",
        birthday: "",
        isFavorite: false,
        image: ""
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
       
        if($scope.file) {
          var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
       
          bucket.putObject(params, function(err, data) {
            if(err) {
              // There Was An Error With Your S3 Config
              alert(err.message);
              return false;
            }
            else {
              addNewContact();
            }
          })
          .on('httpUploadProgress',function(progress) {
                // Log Progress Information
                console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
              });
        }
        else {
          // No File Selected
          alert('No File Selected');
        }
      });
    };

    var addNewContact = function() {
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
                    birthday: ($scope.newContact.birthday).toDateString(),
                    isFavorite: false,
                    image: $scope.file.name
                }))
            .success(function(){
                $scope.newContact = "";
                $location.url("/items/list");
            });
        };
});