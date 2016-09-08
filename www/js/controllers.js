angular.module('starter.controllers', [])

  .controller('HomeCtrl', function($scope, chatMessages, $firebaseObject, currentAuth){
    var ref = firebase.database().ref();
    $scope.profile = $firebaseObject(ref.child('profiles').child('physicsmarie'));

    $scope.user = "Guest " + Math.round(Math.random() * 100);

    $scope.messages = chatMessages;
    console.log($scope.messages);

    $scope.addMessage = function(message) {
      $scope.messages.$add({
        from: $scope.user,
        content: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });

      $scope.message = "";


    };

    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
        $scope.messages.$add({
          from: "Firebase Docs",
          content: "Hello!",
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });
      }
    })
  })

  .controller('AuthenticationCtrl', function($scope, AuthFactory, currentAuth){
    //var auth = $firebaseAuth();
    $scope.auth = AuthFactory;

    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });


    $scope.createUser = function(email, password) {
      $scope.message = null;
      $scope.error = null;


      AuthFactory.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          $scope.error = error;
        });
    };

    $scope.deleteUser = function() {
      $scope.message = null;
      $scope.error = null;

      AuthFactory.$deleteUser().then(function() {
        $scope.message = "User deleted";
      }).catch(function(error) {
        $scope.error = error;
      });
    };


    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      auth.$signInAnonymously().then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error){
        $scope.error = error;
      });
    };

    $scope.googleSignIn = function() {
      var provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope('https://www.googleapis.com/auth/plus.login');

      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
         console.log("RESULT", result);
         if(result.credential) {
         var token = result.credential.accessToken;
         }
         var user = result.user;
         console.log('User login!')
      }).catch(function(error){
        var errors_list = [];
        var error = {
          code: errors.code,
          msg: errors.message
        };
        errors_list.push(error);
        console.log(errors_list);
      });
    };

  })

  .controller('AudioRecorderCtrl', function($scope, currentAuth) {

    $scope.sound = {name:""};

    // Record audio
    $scope.recordAudio = function () {
      var src = "myrecording.mp3";
      var mediaRec = new Media(src,
        // success callback
        function() {
          alert("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
          alert("recordAudio():Audio Error: "+ err.code);
        });

      // Record audio
      mediaRec.startRecord();

      // Stop recording after 10 seconds
      setTimeout(function() {
        mediaRec.stopRecord();
      }, 30000);
    };

    $scope.pauseRecordAudio = function () {
      my_media.pauseRecord();
    };

    $scope.resumeRecordAudio = function() {
      my_media.resumeRecord();
    };
  })

  .controller('EditProfileCtrl', function($scope, Profile, $firebaseArray, currentAuth) {
    var messagesRef = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);

    messages.$add({
      user: "physicsmarie",
      text: "Hello world"
    });

    messages.$remove(someReecordKey);

    var item = messages.$getRecord(someRecordKey);
    item.user = "alanisawesome";
    messages.$save(item).then(function() {

    });

    $scope.messages = $firebaseArray(messagesRef);

    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    $scope.filteredMessages = $firebaseArray(query);
/*
    Profile("physicsmarie").$bindTo($scope, "profile");  // three way data binding

    $scope.profile = Profile("physicsmarie");

    $scope.saveProfile = function() {
      $scope.profile.$save().then(function() {
        alert('Profile saved!');
      }).catch(function(error) {
        alert('Error!');
      });
    }

    var ref = firebase.database().ref().child("push");
    var obj = $firebaseObject(ref);
    obj.$loaded().then(function() {
      console.log(obj.$value);
    });

    obj.$value = "baz";
    obj.$save();

    obj.$remove().then(function() {
      console.log(obj.$value); // null
    }); */
  });
