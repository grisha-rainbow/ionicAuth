angular.module('starter.services', [])
  .factory("chatMessages", function($firebaseArray) {
    var ref = firebase.database().ref();

    return $firebaseArray(ref);

  })
  .factory("Profile", function($firebaseObject) {
    return function(username) {
      var ref = firebase.database().ref("rooms").push();
      var profileRef = ref.child(username);

      return $firebaseObject(profileRef);
    }
  })
  .factory("AuthFactory", function($firebaseAuth) {
    return $firebaseAuth();
  });


