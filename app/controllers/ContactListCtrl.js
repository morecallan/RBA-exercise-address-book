app.controller("ContactListCtrl", function($scope, contactStorage){
    $scope.contacts = [];
    $scope.toggle = false;

        
    contactStorage.getContactList().then(function(contactCollection){
        $scope.contacts = contactCollection;
    });

    $scope.deleteContactItem = function(contactId) {
        contactStorage.deleteContactItem(contactId).then(function(response){
            if ($scope.contacts.length > 0) {
            contactStorage.getContactList().then(function(contactCollection){
                $scope.contacts = contactCollection;
              });
            }  else {
                $scope.contacts = [];
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