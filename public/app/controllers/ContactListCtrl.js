app.controller("ContactListCtrl", function($scope, $location, contactStorage){
   
    $scope.contacts = [];
    $scope.toggle = false;
    $scope.noContacts = true;

    if ($scope.contacts.length < 1) {
        $scope.noContacts = true;
    }

    $scope.go = function ( path ) {
      $location.path( path );
    };

        
    contactStorage.getContactList().then(function(contactCollection){
        $scope.contacts = contactCollection;
        if ($scope.contacts.length < 1) {
            $scope.noContacts = true;
        } else {
            $scope.noContacts = false;
        }
    });

    $scope.deleteContactItem = function(contactId) {
        contactStorage.deleteContactItem(contactId).then(function(response){
            if ($scope.contacts.length > 0) {
            contactStorage.getContactList().then(function(contactCollection){
                $scope.contacts = contactCollection;
                if ($scope.contacts.length < 1) {
                    $scope.noContacts = true;
                } else {
                    $scope.noContacts = false;
                }
              });
            }  else {
                $scope.contacts = [];
                $scope.noContacts = true;
            } 
        });
    };

    $scope.toggleFilter = function() {
        $scope.toggle = $scope.toggle === true ? false : true;
    };

    $scope.inputChange = function(inputItem){
        inputItem.isFavorite = !inputItem.isFavorite;
        contactStorage.updateCompletedStatus(inputItem).
        then(function(response){
        });
    };
});