app.factory("itemStorage", function($q, $http, utilityFactory){

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

    var deleteContactItem = function(contactId){
        return $q(function(resolve, reject){
            $http
            .delete(`https://callan-address-book.firebaseio.com/contacts/${contactId}.json`)
            .success(function(objectFromFirebase){
                resolve(objectFromFirebase);
            })
            .error(function(error){
                reject(error);
            });
        });
    };

    var getSingleContact = function(contactId){
          return $q(function(resolve, reject){
          $http.get(`https://callan-address-book.firebaseio.com/contacts/${contactId}.json`)
            .success(function(contactObject){ 
                resolve(contactObject);
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    };

    var updateItem = function(contactId, newContact){
        return $q(function(resolve, reject) {
            $http.put(
                `https://callan-address-book.firebaseio.com/contacts/${contactId}.json`,
                JSON.stringify({
                    name: newContact.name,
                    phone: newContact.phone,
                    email: newContact.email,
                    address: newContact.address,
                    city: newContact.city,
                    state: newContact.state,
                    zip: newContact.zip,
                    jobTitle: newContact.jobTitle,
                    birthday: newContact.birthday,
                    isFavorite: newContact.isFavorite,
                    image: newContact.image
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };

    var updateCompletedStatus = function(newContact){
        return $q(function(resolve, reject) {
            $http.put(
                `https://callan-address-book.firebaseio.com/contacts/${newContact.id}.json`,
                JSON.stringify({
                    name: newContact.name,
                    phone: newContact.phone,
                    email: newContact.email,
                    address: newContact.address,
                    city: newContact.city,
                    state: newContact.state,
                    zip: newContact.zip,
                    jobTitle: newContact.jobTitle,
                    birthday: newContact.birthday,
                    isFavorite: newContact.isFavorite,
                    image: newContact.image
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };
    

    return {getContactList:getContactList, deleteContactItem: deleteContactItem, getSingleContact: getSingleContact, updateItem: updateItem, updateCompletedStatus: updateCompletedStatus};
});