
(function () {
    angular.module(ymcGlobals.appName)
        .factory('equipmentService', equipmentService)
    equipmentService.$inject = ['$http', '$q'];

    function equipmentService($http, $q) {
        return {
            getType: _getType,
            getStatus: _getStatus,
            getEquip: _getEquip,
            submitEquip: _submitEquip,
            updateEquip: _updateEquip,
            deleteEquip: _deleteEquip,
            getEquipById: _getEquipById
        };

        function _updateEquip(userData, id) {
            var settings = {
                url: '/api/Equipment/' + id,
                method: 'PUT',
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true,
                data: userData
            }
            return $http(settings)
                .then(_onSuccess, _onError)
        }

        function _submitEquip(userData) {
            var settings = {
                url: '/api/Equipment',
                method: 'POST',
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true,
                data: userData
            }
            return $http(settings)
                .then(_onSuccess, _onError)
        }

        function _getEquipById(id) {
            var settings = {
                url: '/api/Equipment/' + id,
                method: 'GET',
                cache: false,
                responseType: 'json',
                withCredentials: true
            }
            return $http(settings)
                .then(_onSuccess, _onError)
        }

        function _getEquip() {
            var settings = {
                url: '/api/Equipment',
                method: 'GET',
                cache: false,
                responseType: "json",
                withCredentials: true
            }
            return $http(settings)
                .then(_onSuccess, _onError);
        }

        function _getType() {
            var settings = {
                url: '/api/EquipmentType',
                method: 'GET',
                cache: false,
                responseType: "json",
                withCredentials: true
            }
            return $http(settings)
                .then(_onSuccess, _onError);
        }

        function _getStatus() {
            var settings = {
                url: '/api/EquipmentStatus',
                method: 'GET',
                cache: false,
                responseType: "json",
                withCredentials: true
            }
            return $http(settings)
                .then(_onSuccess, _onError);
        }

        function _deleteEquip(id) {
            var settings = {
                url: '/api/Equipment/' + id,
                method: 'DELETE',
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset-UTF-8',
                withCredentials: true
            }
            return $http(settings)
                .then(_onSuccess, _onError)
        }

        function _onSuccess(response) {
            console.log("Ajax Success");
            console.log(response);
            return response
        }

        function _onError(error) {
            console.log("Ajax Error");
            console.log(error);
            return $q.reject(error)
        }
    }
})();