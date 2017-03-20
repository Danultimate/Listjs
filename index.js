/* listjs */
var options = {
  valueNames: [{
    data: ['id']
  }, {
    attr: 'src',
    name: 'img'
  }, 'title', 'description']
};

// Init list
var contactList = new List('contacts', options);

var idField = $('#id-field'),
  titleField = $("#title-field"),
  descriptionField = $('#description-field'),
  imgField = $('#img-field'),
  addBtn = $('#add-btn'),
  editBtn = $('#edit-btn').hide(),
  removeBtns = $('.remove-item-btn'),
  editBtns = $('.edit-item-btn'),
  sortList = $("#sortable"),
  editTable = $(".editTable");

addBtn.click(function() {
  contactList.add({
    id: Math.floor(Math.random() * 110000),
    title: titleField.val(),
    description: descriptionField.val(),
    img: imgField.val()
  });
  clearFields();
  sortList.sortable("refresh");
  refreshCallbacks();
});

editBtn.click(function() {
  var item = contactList.get('id', idField.val())[0];
  item.values({
    id: idField.val(),
    title: titleField.val(),
    description: descriptionField.val(),
    img: imgField.val(),
  });
  clearFields();
  editBtn.hide();
  moveTable();
});

function refreshCallbacks() {
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $(".remove-item-btn");
  editBtns = $(".edit-item-btn");
  // Refreshes UI for new buttons
  removeBtns.each(function(ind, el) {
    $(el).button({
      icon: "ui-icon-close",
      showLabel: false
    });
  });
  editBtns.each(function(ind, el) {
    $(el).button({
      icon: "ui-icon-comment",
      showLabel: false
    });
  });
  $(".buttons").controlgroup();

  removeBtns.click(function(e) {
    // Remove Item Button
    var itemId = $(this).closest("li").data("id");
    console.log("Removing Item " + itemId);
    contactList.remove('id', itemId);
  });

  editBtns.click(function(e) {
    // Edit Item Button
    var itemId = $(this).closest("li").data("id");
    var itemEl = $(this).closest("li");
    console.log("Editing Item " + itemId);
    var itemValues = contactList.get('id', itemId)[0].values();
    idField.val(itemValues.id);
    titleField.val(itemValues.title);
    descriptionField.val(itemValues.description);
    imgField.val(itemValues.img);

    editBtn.show();
    addBtn.hide();

    moveTable(itemEl);
  });
}

function clearFields() {
  titleField.val("");
  descriptionField.val("");
  imgField.val("");
}

function moveTable(el) {
  var offset = 25,
    pos = $(el).is("li") ? $(el).position() : false,
    target;
  if (pos) {
    // Table is in Home position and ready to move to a new position
    target = pos.top + $(el).height() + offset;
    console.log("Storing Original Edit Table Position: ", editTable.position());
    editTable.data("original-position", editTable.position());
    console.log("Moving Edit Table to " + target + "px");
    editTable.css({
      position: "absolute",
      "box-shadow": "2px 4px 5px #444"
    }).animate({
      top: target + "px"
    });
    editTable.data("home", false);
  } else {
    if (editTable.data("home") === false) {
      // Move Edit Table Home
      target = editTable.data("original-position").top;
      console.log("Moving Edit Table to " + target + "px");
      editTable.css({
        position: "absolute",
        "box-shadow": "none"
      }).animate({
        top: target + "px"
      }, function() {
        editTable.css("position", "inherit");
        editTable.data("home", true);
      });
    }
  }
}

/* jQuery */
$(function() {
  $("#sortable").sortable().disableSelection();

  $('#search-field').on('keyup', function() {
    var searchString = $(this).val();
    contactList.search(searchString);
  });

  $(document).on("keydown", function(e) {
    console.log(e);
    if ((e.keyCode == $.ui.keyCode.ESCAPE) && !editTable.data("home")) {
      // Clear entries and send table back
      clearFields();
      moveTable();
    }
  });
  // Sets callbacks to the buttons in the list
  refreshCallbacks();
});
   $(document).ready(function() {
                alert( $(".title").length );
            });
/* localStorage */
 $(document).ready(function(){  
    $("#add-btn").click(function(){    
         var img = $("#img-field").val();
         var titl = $("#title-field").val();
         var desc = $("#description-field").val();

         localStorage.setItem("img-field", img);
         localStorage.setItem("title-field", titl);
         localStorage.setItem("description-field", desc); 

         $("#img-field, #title-field, #description-field").val(""); 
    }); 


    $("#img-field").val(localStorage.getItem("img-field"));
    $("#title-field").val(localStorage.getItem("title-field"));
    $("#description-field").val(localStorage.getItem("description-field"));
});
