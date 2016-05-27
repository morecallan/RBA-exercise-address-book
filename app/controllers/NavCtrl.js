app.controller("NavCtrl", function($scope){
    $scope.navItems = [{name: "Logout", icon: "perm_identity", urlExtend: "#/logout"}, {name: "Contacts", icon: "contacts", urlExtend: "#/items/list"}, {name: "Add",  icon: "add_circle", urlExtend: "#/items/new"}];
});