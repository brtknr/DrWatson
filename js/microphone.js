
$.noConflict();
jQuery( document ).ready(function( $ ) {
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
  if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function() {
    recognizing = true;
    $("#final_span").text("Listening...").addClass("animated-fade-in");
    showInfo('info_speak_now');
  };

  recognition.onerror = function(event) {
    console.log("issue");
    if (event.error == 'no-speech') {
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    showInfo("stopped");
    var final_span = $("#final_span").text();
    $("#final_span").removeClass("animated-fade-in");
    if (final_span == "Listening...")
      {
        $("#final_span").text("");
      }
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    $("")
  };

  recognition.onresult = function(event) {
    
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var final_transcript = $("#final_transcript").text();
        $("#final_span").text(final_transcript+event.results[i][0].transcript);
      } else {
        var interim_transcript = $("#final_transcript").text();
        $("#interim_span").text(interim_transcript+event.results[i][0].transcript);
      }
    }
  //  console.log("http://locahost:3000/watson?question=" + $("#final_span").text());
    
    //console.log("http://locahost:3000/watson?question=" +  $("#final_span").text());
       // if (data.class == "direction") {
      //    window.location.href = 'index.html#/map/' + data.from+ '/' + data.to;
      //  }else if(data.class == "recommendation") {
          window.location.href= 'map.html?question=' +  $("#final_span").text();
      //  }
        
        

    //final_transcript = capitalize(final_transcript);
    //$("#final_transcript").text(linebreak( $("#final_transcript").text()));
    //$("#interim_transcript").text(linebreak($("#interim_transcript").text()));
    
    
    if (final_transcript || interim_transcript) {
      //showButtons('inline-block');
    }
  };
}

window.startButton = function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  else {
    $("#final_span").text("");
  }
  
  console.log("Start button");
  final_transcript = '';
  recognition.lang = 'en-GB';
  recognition.start();
  ignore_onend = false;
  $("#final_span").text('');
  $("#interim_span").text('');
  showInfo('info_allow');
  //start_timestamp = event.timeStamp;
};

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
  
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
function showInfo(message) {
  console.log(message);
}
  startButton();
});