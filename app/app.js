var app = angular.module("AddressBookApp", ["ngRoute", "ngFileUpload"]);



app.config(function($routeProvider) {
    $routeProvider
        .when("/items/list", {
            templateUrl: "partials/item-list.html",
            controller:  "ItemListCtrl"
        })
        .when("/items/details/:itemId", {
            templateUrl: "partials/item-details.html",
            controller:  "ItemViewCtrl"
        })
        .when("/items/edit/:itemId", {
            templateUrl: "partials/item-new.html",
            controller:  "ItemEditCtrl"
        })
        .when("/items/new", {
            templateUrl: "partials/item-new.html",
            controller:  "ItemNewCtrl"
        })
        .otherwise("/items/list"); 
});