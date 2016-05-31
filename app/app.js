var app = angular.module("AddressBookApp", ["ngRoute", "ngFileUpload"])
    .constant("firebaseURL","https://callan-address-book.firebaseio.com/");

let isAuth = (authFactory) => new Promise((resolve, reject) => {
    if (authFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();    
    }
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/contact-list.html",
            controller:  "ContactListCtrl",
            resolve: {isAuth}
        })
        .when("/contacts/list", {
            templateUrl: "partials/contact-list.html",
            controller:  "ContactListCtrl",
            resolve: {isAuth}
        })
        .when("/contacts/details/:contactId", {
            templateUrl: "partials/contact-details.html",
            controller:  "ContactViewCtrl",
            resolve: {isAuth}
        })
        .when("/contacts/edit/:contactId", {
            templateUrl: "partials/contact-new.html",
            controller:  "ContactEditCtrl",
            resolve: {isAuth}
        })
        .when("/contacts/new", {
            templateUrl: "partials/contact-new.html",
            controller:  "ContactNewCtrl",
            resolve: {isAuth}
        })
        .when("/login", {
            templateUrl: "partials/login.html",
            controller:  "LoginCtrl"
        })
        .when("/logout", {
            templateUrl: "partials/login.html",
            controller:  "LoginCtrl"
        })
        .otherwise("/"); 
});

app.run(($location) => {
    let contactRef = new Firebase("https://callan-address-book.firebaseio.com/");

    contactRef.onAuth(authData => {
        if(!authData) {
            $location.path("/login");
        }
    })
});