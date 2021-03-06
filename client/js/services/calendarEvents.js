angular.module('roomEase')

    .factory('eventAPIRequests', function($http){
      var returnObj = {
          deleteEvent : function(data){
            console.log('deleting event', data);
            return $http({
              method: 'POST',
              url: '/deleteEvent',
              data: data
            }).then(function(response){
              return response.data;
            })
          },
          updateEvent : function(data){
            console.log('updating event', data);
            return $http({
              method: 'POST',
              url: '/updateEvent',
              data: data
            }).then(function(response){
              return response.data;
            })
          },
          getEvents : function(){
            return $http({
              method: 'GET',
              url: '/events'
            }).then(function(response){
              return response.data;
            })
          },

      }

      return returnObj;
    })