angular.module("touristApp", ["ngRoute"]);
angular.module("touristApp")
  .directive('myMap', function() {
    // directive link function
  
    var link = function(scope, element, attrs) {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
         
        var head = document.getElementsByTagName('head')[0];
        var js = document.createElement("script");       
        var map, infoWindow;
        
        // map config
        var mapOptions = {
           zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
            directionsDisplay.setMap(map);
            var request = {
             origin: scope.from, 
             destination: scope.to,
             travelMode: google.maps.DirectionsTravelMode.TRANSIT, transitOptions: {
              modes: [google.maps.TransitMode.RAIL]

             }
           };

           directionsService.route(request, function(response, status) {
             if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
               
              directionsDisplay.setPanel(document.getElementById('panel'));
             }
           });

        }
        
        // show the map and place some markers
        initMap();
       
    };
    
    return {
        restrict: 'A',
        scope: {
          "to": "@",
          "from": "@"
        },
        template: '<div id="gmaps" style="width: 700px; height: 400px; float: left;"></div>',
        replace: true,
        link: link
    };
});
