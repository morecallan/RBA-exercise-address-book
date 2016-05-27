app.factory("itemStorage", function($q, $http){

    var getContactList = function(){
        return $q(function(resolve, reject){
          $http.get("https://callan-address-book.firebaseio.com/contacts/.json")
            .success(function(contactObject){ 
                var contacts = [];
                Object.keys(contactObject).forEach(function(key){ //using the keys method on js's object. loops through the object and pulls out our keys and returns array of keys. for each of these keys
                    contactObject[key].id=key; //go through the item collection object by each key and sets the id value to the key value
                    contacts.push(contactObject[key]); //pushes each itemCollection object to the $scope array
                });
                resolve(contacts);
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    };

    var deleteContactItem = function(itemId){
        return $q(function(resolve, reject){
            $http
            .delete(`https://callan-address-book.firebaseio.com/contacts/${itemId}.json`)
            .success(function(objectFromFirebase){
                resolve(objectFromFirebase);
            })
            .error(function(error){
                reject(error);
            });
        });
    };

    

    return {getContactList:getContactList, deleteContactItem: deleteContactItem};
});