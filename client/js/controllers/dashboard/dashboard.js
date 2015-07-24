angular.module('roomEase')

.controller('dashboardCtrl', function($scope, Request){
  $scope.users = [];
  $scope.usersObj = {};
  $scope.dwellings = [];

  $scope.fetchUsers = function(){
    Request.user.fetch().then(function(results){
      console.log('user fetch results:', results);
      $scope.users = results;
      $scope.users.forEach(function (user) {
        $scope.usersObj[user.id] = user;
      })
    })
  }
  $scope.fetchUsers();

  $scope.fetchDwelling = function () {
    Request.dwelling.fetch().then(function(results) {
      console.log("dwelling fetch results ", results)
      $scope.dwelling = results;
    })
  }
  $scope.fetchDwelling();

  $scope.runDelegator = function(){
    Request.task.delegate().then(function(results){
      console.log(results);
    });
  }
})
.controller('yourTasksCtrl', function($scope, Request) {
  $scope.userTasks = [];
  $scope.removeDups = function (taskInstances) {
    var dupFree = [];
    var seenSoFar = {};
    for (var i = 0; i < taskInstances.length; i++) {
      if (!seenSoFar[taskInstances[i].name] && taskInstances[i].completed !== true) {
        dupFree.push(taskInstances[i])
        seenSoFar[taskInstances[i].name] = true;
      }
    }
    return dupFree;
  }

  $scope.completeTasks = function (task) {
    task.completed = true;
    Request.task_instances.update(task)
  }
  // $scope.fetchYourTasks = function(){
  //   Request.task.fetch().then(function(results){
  //     console.log('task fetch results:', results);
  //     $scope.userTasks = results;
  //   })
  // }
  // $scope.fetchYourTasks();

  Request.task_instances.fetchMy().then(function(results){
    // know this users id
    // remove duplicates and filter for only the users tasks
    console.log('task_instance fetch results:', results);
    $scope.userTaskInstances = $scope.removeDups(results);

    $scope.userTaskInstances.forEach(function(taskInstance) {
      var displayDate = moment(taskInstance.due_date).fromNow();
      taskInstance.displayDate = displayDate;
    })
  })
})
.controller('tasksHistoryCtrl', function($scope, Request) {
  $scope.allTasks = [];
  $scope.fetchAllTasks = function () {
    Request.task_instances.fetch().then(function(results) {
      $scope.allTasks = results;

      $scope.allTasks.forEach(function(taskInstance) {
        var displayDate = moment(taskInstance.due_date).fromNow();
        taskInstance.displayDate = displayDate;
        taskInstance.username = $scope.usersObj[taskInstance.user_id].username;
      })
      // sort the tasks by due date
      $scope.allTasks.sort(function (a,b) {
        return moment(a.due_date).valueOf() - moment(b.due_date).valueOf()
      })
    })
  }
  $scope.fetchAllTasks();
})
.controller('usersDisplayCtrl', function($scope) {

})
