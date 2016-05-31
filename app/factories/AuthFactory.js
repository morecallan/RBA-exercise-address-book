"use strict";
app.factory("authFactory", function(firebaseURL, $q, $http, $rootScope) {
  let ref = new Firebase(firebaseURL);
  let currentUserData = null;

  return {
    returnUserDetails (user) {
        return $q(function(resolve, reject){
          $http.get(`${firebaseURL}users/.json?orderBy="uid"&equalTo="${user.uid}"`)
            .success(function(userObject){ 
                resolve(userObject);
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    },


    /*
      Determine if the client is authenticated
     */
    isAuthenticated () {
      let authData = ref.getAuth(); //Firebase method
      return (authData) ? true : false;
    },

    getUser () {
      return currentUserData;
    },

    /*
      Authenticate the client via Firebase
     */
    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({ //Changes if you use another firebase method for login
          "email": credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            currentUserData = authData;
            resolve(authData);
          }
        });
      });
    },


    /*
      Store each Firebase user's id in the `users` collection
     */
    storeUser (authData) {
      let stringifiedUser = JSON.stringify({ uid: authData.uid });

      return new Promise((resolve, reject) => {
        $http
          .post(`${firebaseURL}users.json`, stringifiedUser)
          .then(
            res => resolve(res),
            err => reject(err)
          );
      });
    },

    writeUserDetails(uid) {
        return $q(function(resolve, reject) {
            $http.post(
                `${firebaseURL}users/.json`,
                JSON.stringify({
                  firstName: $rootScope.account.firstName,
                  email: $rootScope.account.email,
                  imagePlaceholder: $rootScope.account.imagePlaceholder,
                  image: $rootScope.account.image,
                  uid: uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    }


  };
});