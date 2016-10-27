app.controller("ContactViewCtrl", function($scope, $routeParams, $location, contactStorage){
    $scope.contacts = [];
    $scope.selectedItem = {};


    contactStorage.getContactList().then(function(contactCollection){
        $scope.contacts = contactCollection;
        $scope.selectedItem = $scope.contacts.filter(function(contact){
            return contact.id === $routeParams.contactId;
        })[0];
    });


    $scope.deleteContactItem = function(contactId) {
        contactStorage.deleteContactItem(contactId).then(function(response) {
            contactStorage.getContactList().then(function(contactCollection) {
                $scope.contacts = contactCollection;
                $location.url("/contacts/list");
            });
        });
    };
});