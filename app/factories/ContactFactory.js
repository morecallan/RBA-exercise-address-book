app.factory("contactStorage", function($q, $http, firebaseURL, authFactory){

    var getContactList = function(){
        let user = authFactory.getUser();
        return $q(function(resolve, reject){
          $http.get(`${firebaseURL}contacts/.json?orderBy="uid"&equalTo="${user.uid}"`)
            .success(function(contactObject){ 
                var contacts = [];
                if (contactObject === null) {
                     var contacts = [];
                } else {
                    Object.keys(contactObject).forEach(function(key){ //using the keys method on js's object. loops through the object and pulls out our keys and returns array of keys. for each of these keys
                        contactObject[key].id=key; //go through the item collection object by each key and sets the id value to the key value
                        contacts.push(contactObject[key]); //pushes each itemCollection object to the $scope array
                    });
                    resolve(contacts);
                }
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    };

    var addNewContact = function(newContact){
        let user = authFactory.getUser();
        return $q(function(resolve, reject) {
            $http.post(
                `${firebaseURL}contacts/.json`,
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
                    image: newContact.image,
                    imagePlaceholder: newContact.imagePlaceholder,
                    uid: user.uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };


    var deleteContactItem = function(contactId){
        return $q(function(resolve, reject){
            $http
            .delete(`${firebaseURL}contacts/${contactId}.json`)
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
          $http.get(`${firebaseURL}contacts/${contactId}.json`)
            .success(function(contactObject){ 
                resolve(contactObject);
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    };

    var updateContact = function(contactId, newContact){
        let user = authFactory.getUser();
        return $q(function(resolve, reject) {
            $http.put(
                `${firebaseURL}contacts/${contactId}.json`,
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
                    image: newContact.image,
                    imagePlaceholder: newContact.imagePlaceholder,
                    uid: user.uid
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
        let user = authFactory.getUser();       
        return $q(function(resolve, reject) {
            $http.put(
                `${firebaseURL}contacts/${newContact.id}.json`,
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
                    image: newContact.image,
                    imagePlaceholder: newContact.imagePlaceholder,
                    uid: user.uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };
    

    return {getContactList:getContactList, addNewContact: addNewContact, deleteContactItem: deleteContactItem, getSingleContact: getSingleContact, updateContact: updateContact, updateCompletedStatus: updateCompletedStatus};
});