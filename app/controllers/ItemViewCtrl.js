app.controller("ItemViewCtrl", function($scope, $http, $routeParams, itemStorage, $location){
    $scope.contacts = [];
    $scope.selectedItem = {};

    
    $http.get("https://callan-address-book.firebaseio.com/contacts/.json")
    .success(function(contactObject){
        Object.keys(contactObject).forEach(function(key){ //using the keys method on js's object. loops through the object and pulls out our keys and returns array of keys. for each of these keys
            contactObject[key].id=key; //go through the item collection object by each key and sets the id value to the key value
            $scope.contacts.push(contactObject[key]); //pushes each itemCollection object to the $scope array

            $scope.selectedItem = $scope.contacts.filter(function(contact){
                return contact.id === $routeParams.itemId;
            })[0];
        });
    });


    $scope.deleteContactItem = function(inputItemId) {
        itemStorage.deleteContactItem(inputItemId).then(function(response){
            itemStorage.getContactList().then(function(contactCollection){
                $scope.contacts = contactCollection;
                $location.url("/items/list");
            });
        });
    };
});