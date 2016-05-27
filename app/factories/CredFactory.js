app.factory("credFactory", function($q, $http){


var getCredentials = function() {
        return $q(function(resolve, reject){
            $http
            .get("data/credentials.json")
            .success(function(credentials){
                resolve(credentials.credentials);
            })
            .error(function(error){
                reject(error);
            });
        });
    }

    return {getCredentials: getCredentials};
});

