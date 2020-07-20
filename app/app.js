"use strict";

angular.module("weatherApp", [])
    .controller("weatherController", function($scope, $http) {
        // CITY SELECTION
        $scope.writtenCity = "";
        $scope.selectedCity = "Klaipėda";
        $scope.currentUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=55.7126&lon=-21.1352&lang=lt&units=metric&appid=48507c7efbe2a4ca1b59a199ea479b46";
        var url = "https://api.openweathermap.org/data/2.5/forecast?";
        var APIkey = "&lang=lt&units=metric&appid=48507c7efbe2a4ca1b59a199ea479b46";

        // CREATE API LINK WITH BY CITY NAME
        $scope.findCity = function() {
            // IF INPUT FIELD IS NOT EMPTY, ACCEPT THE VALUE
            if ($scope.writtenCity !== "") {
                $scope.selectedCity = $scope.writtenCity;
                $scope.currentUrl = url + "q=" + $scope.selectedCity + APIkey;

                $scope.getWeather();
            }
        };

        // CREATE API LINK WITH GEOLOCATION
        $scope.findAutomatic = function() {
            $scope.selectedCity = "insert-Geolocation-info";
            // lat=54.6892&lon=25.2798 <--toks formatas reikalingas
            $scope.currentUrl = url + $scope.selectedCity + APIkey;
            $scope.getWeather();
        };


        $scope.getWeather = function() {
            $http({
                method: "GET",
                url: $scope.currentUrl
             })
                .then(function (data, status) {
                    if(data.data.cod === "400") {
                        $scope.cityName = "Miestas nerastas";
                    }
                    else {
                        // CURRENT WEATHER
                        //$scope.cityName = data.data.city.name;
                        $scope.date = data.data.current.dt;
                        $scope.temperature = Math.round(data.data.current.temp);
                        $scope.feelsLike = Math.round(data.data.current.feels_like);
                        $scope.wind = data.data.current.wind_speed;
                        $scope.description = data.data.current.weather[0].description;
                        $scope.icon = "https://openweathermap.org/img/wn/" +
                            data.data.current.weather[0].icon +
                            ".png";

                        // FUTURE WEATHER
                        // 1st day
                        $scope.futureData = data.data.daily.slice(1, 6);
                        $scope.iconHttp = "https://openweathermap.org/img/wn/";
                        $scope.png = ".png";

                        $scope.futureDate = data.data.daily[1].dt;
                        //$scope.futureTemperature = Math.round(data.data.daily[1].temp.day);
                        $scope.futureTemperature = data.data.daily.slice(1, 6);

                        //$scope.futureWind = data.data.daily[1].wind_speed;
                        $scope.futureWind = data.data.daily.slice(1, 6);

                        $scope.futureIcon = "https://openweathermap.org/img/wn/" +
                            data.data.daily[1].weather[0].icon +
                            ".png";

                        // 2nd day
                        /*$scope.futureDate2 = data.data.daily[2].dt;
                        $scope.futureTemperature2 = Math.round(data.data.daily[2].temp.day);
                        $scope.futureWind2 = data.data.daily[2].wind_speed;
                        $scope.futureIcon2 = "https://openweathermap.org/img/wn/" +
                            data.data.daily[2].weather[0].icon +
                            ".png";

                        // 3rd day
                        $scope.futureDate3 = data.data.list[3].dt;
                        $scope.futureTemperature3 = Math.round(data.data.list[3].main.temp);
                        $scope.futureWind3 = data.data.list[3].wind.speed;
                        $scope.futureIcon3 = "https://openweathermap.org/img/wn/" +
                            data.data.list[3].weather[0].icon +
                            ".png";*/
                    }
                })
                .error(function (data, status) {
                    $scope.temperature = "Error";
                });
        };

        // TRIGGERS TO SHOW DEFAULT WEATHER ON PAGE LOAD
        $scope.init = function() {
            $scope.getWeather();
        };





        // WEATHER BY CITY NAME
        // https://api.openweathermap.org/data/2.5/forecast?q=Vilnius&appid=61831ea54b831b0ea5482f37d73f171d
        // WEATHER BY COORDINATES
        // https://api.openweathermap.org/data/2.5/forecast?lat=54.6892&lon=25.2798&appid=61831ea54b831b0ea5482f37d73f171d
    });