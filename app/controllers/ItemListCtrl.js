app.controller("ItemListCtrl", function($scope, $http, $location, itemStorage){
    $scope.contacts = [];
        
    itemStorage.getContactList().then(function(contactCollection){
        $scope.contacts = contactCollection;
    });

    $scope.deleteContactItem = function(inputItemId) {
        itemStorage.deleteContactItem(inputItemId).then(function(response){
            itemStorage.getContactList().then(function(contactCollection){
                $scope.contacts = contactCollection;
              });
        });
    };
    
});