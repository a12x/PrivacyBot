$(document).on('paste', function(je) {
  e = je.originalEvent;
  var pastedText = undefined;
  if (window.clipboardData && window.clipboardData.getData) { // IE
    pastedText = window.clipboardData.getData('Text');
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain');
  }
  console.log(e);
  $("body").html(pastedText.replace(/\n/g, "<br />"));
  console.log(pastedText);
  //alert(pastedText); // Process and handle text...
  return false; // Prevent the default handler from running.
});