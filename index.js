// $(document).on('paste', function(je) {
//   e = je.originalEvent;
//   var pastedText = undefined;
//   if (window.clipboardData && window.clipboardData.getData) { // IE
//     pastedText = window.clipboardData.getData('Text');
//   } else if (e.clipboardData && e.clipboardData.getData) {
//     pastedText = e.clipboardData.getData('text/plain');
//   }
//   console.log(e);
//   $("body").html(getDisplayString(pastedText).replace(/\n/g, '<br />'));
//   console.log(pastedText);
//   return false; // Prevent the default handler from running.
// });

// var getDisplayString = function(input) {
//   var output = 'This app has read access to:';
//   output = '';

//   // if (input.indexOf("Your basic info") != -1) {
//   //   output += "\nBasic Info";
//   // }
//   // if (input.indexOf("Your email address") != -1) {
//   //   output += "\nEmail Address";
//   // }
//   // if (input.indexOf("Your events") != -1) {
//   //   output += "\nEvents";
//   // }
//   // if (input.indexOf("Your birthday") != -1) {
//   //   output += "\nBirthday";
//   // }

//   var lines = input.split('\n');
//   $.each(lines, function(i, line) {
//     if (line.indexOf('Your') != -1 && line.indexOf(':') != -1)
//       output += '\n\n' + line.substring(line.indexOf(':')+2, line.length).split(',').join(' |');
//   });

//   return output;
// }

window.fbAsyncInit = function() {
  FB.init({
    appId      : 'xxx',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
      testAPI();
    } else if (response.status === 'not_authorized') {
      FB.login();
    } else {
      FB.login();
    }
  });
};

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function personal(string) {
  return '<span class="personal">' + string + '</span>';
}

// Load the SDK asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

function wall_post() {
  FB.login(function(response) {
var params = {};
params['message'] = 'Hello World!';
params['name'] = 'Name';
params['description'] = 'Description';

FB.api('/me/feed', 'post', params, function(response) {
  if (!response || response.error) {
    alert(response.error);
  } else {
    alert('Published!');
  }
});
  }, {perms: 'publish_stream'});
}

// Here we run a very simple test of the Graph API after login is successful. 
// This testAPI() function is only called in those cases. 
function testAPI() {
  // console.log('Welcome!  Fetching your information.... ');
  var input = '';
  FB.api('/me', function(response) {
    input += 'Thanks ' + personal(response.first_name) + '.<br /><br />';
    input += 'You just granted me access to your basic information, a collection of data about you that every Facebook app you login to has access to.<br /><br />';
    input += 'From this I know your name is ' + personal(response.name) + ', you\'re ' + personal(capitalise(response.gender)) + ', your username is ' + personal(response.username) + ' and your id is ' + personal(response.id) + '.<br /><br />';
    $(".dialog").html(input);
  });
  FB.api('/me/friends', function(response) {
    input += 'I also know all ' + personal(response.data.length) + ' of your friends, here\'s a few of them: ' + personal(response.data[0].name) + ', ' + personal(response.data[1].name) + ', and ' + personal(response.data[2].name) + '.<br /><br />';
    input += 'Promote privacy awareness and <a href="http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://localhost:8000&p[images][0]=&p[title]=PrivacyBot&p[summary]=Check%20out%20exactly%20how%20much%20personal%20information%20you\'re%20exposing%20to%20Facebook%20apps!" target="_blank">share this with your friends</a>!'
    input += 'Or <a href="#" onclick="wall_post();">post it on your timeline</a>!'
    $(".dialog").html(input);
  });
}
