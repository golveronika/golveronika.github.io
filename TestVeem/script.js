

function ShowModalWin(text) {
      var modal = '<div id="error" class="modal">';
    modal += '<p>'+text+'</p>';
    modal += '<a href="#" rel="modal:close">Close</a>';
    modal += '</div>';

    $('body').append(modal);

    $('#error').modal({
      showClose: false
    });

    $('.modal').on($.modal.AFTER_CLOSE, function(event, modal) {
      $('#error').remove();
    });
}


function GetJson(){

  var err = editor.getSession().getAnnotations();

  if (err.length > 0) {
    ShowModalWin("Errors in the JSON. Please check it and come back.");
  } else {
    if (editor.getValue() != '')
      CreateForm(JSON.parse(editor.getValue()));
  }

}

function CreateForm(data) {


  let NoEmpty  = function(value) {
    if (typeof value == 'undefined') value = "";
      return value;
  }

  $("#result").empty();
  $("#result").append("<form onsubmit='return false'></form>");
  var html = "";

  if (data.hasOwnProperty("items")) {

    for (item of data.items) { 
      switch (item.type) {
        case "header":
          html += "<h1>"+NoEmpty(item.label)+"</h1>";
          break;
        case "numberfield":
          html += "<label>"+NoEmpty(item.label)+"<input type='number' value='"+NoEmpty(item.value)+"'></label>";
          break;
        case "checkbox":
          html += "<label>"+NoEmpty(item.label)+"<input type='checkbox' "+NoEmpty(item.checked)+"></label>";
          break;
        case "textfield":
          html += "<label>"+NoEmpty(item.label)+"<input type='text' value='"+NoEmpty(item.value)+"'></label>";
          break;
        case "textarea":
          html += "<label>"+NoEmpty(item.label)+"<textarea>"+NoEmpty(item.value)+"</textarea></label>";
          break;
        case "dateflied":
          html += "<label>"+NoEmpty(item.label)+"<input class='datepicker' type='text' value='"+NoEmpty(item.value)+"'></label>";
          break;
        case "radiobuttons":
          html += "<label>"+NoEmpty(item.label)+"<input type='radio' name='"+NoEmpty(item.name)+"' value='"+NoEmpty(item.value)+"'></label>";
          break;
        case "button":
          if (item.hasOwnProperty("caption")) {
            html += "<div class='btnarea'>"
            for (btn of item.caption) { 
              html += "<button class='demo'>"+NoEmpty(btn)+"</button>";
            }
            html += "</div>";
          }
          break;
      }
    }

    $("#result form").append(html);
    $( ".datepicker" ).datepicker();
    $("#tabs_nav a").not(".active").trigger('click');

  } else {
    ShowModalWin("The items property must be specified..");
  }

}


 var editor = ace.edit("editor");
 editor.setTheme("ace/theme/dracula");
 editor.session.setMode("ace/mode/json");
 editor.setOptions({
    enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
    enableLiveAutocompletion: true // the editor completes the statement while you are typing
 });

$(function() {

editor.getSession().setValue(JSON.stringify(json_demo, null, '\t'));
editor.selection.clearSelection();
 $("#tabs_nav a.active").trigger('click');


});
	
var tabs = $('#tabs_nav a');
var selector = $('#tabs_nav').find('a').length;
var activeItem = tabs.find('.active');
var activeWidth = activeItem.innerWidth();
$(".selector").css({
  "left": activeItem.position.left + "px", 
  "width": activeWidth + "px"
});

$("#tabs_nav").on("click","a",function(e){
  e.preventDefault();
  $('#tabs_nav a').removeClass("active");
  $(this).addClass('active');
  var activeWidth = $(this).innerWidth();
  var itemPos = $(this).position();
  $(".selector").css({
    "left":itemPos.left + "px", 
    "width": activeWidth + "px"
  });

  $("#config").toggle();
  $("#result").toggle();

});


var json_demo = {
  "items": [
    {
      "label": "My form",
      "type": "header",
    },
    {
      "label": "Count",
      "type": "numberfield",
      "value": 12
    },
    {
      "label": "Is Editable",
      "type": "checkbox",
      "checked": "checked"
    },
    {
      "label": "Caption",
      "type": "textfield",
      "value": ""
    },
    {
      "label": "Description",
      "type": "textarea",
      "value": "Multi-line\ntextarea"
    },
    {
      "label": "Date of birth",
      "type": "dateflied",
      "value": "01.02.1993"
    },
    {
      "label": "Male",
      "name": "sex",
      "type": "radiobuttons",
      "value": "1"
    },
    {
      "label": "Female",
      "name": "sex",
      "type": "radiobuttons",
      "value": "0"
    },
    {
      "caption": [
        "Ok",
        "Cancel"
      ],
      "type": "button"
    }
  ]
};