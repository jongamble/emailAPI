
// Userlist data array for filling in info box
var userListData = [];

// Functions =============================================================

// Fill table with data
function populateTable() {
  var tableContent = '';
  $.getJSON( '/userlist', function( data ) {
    userListData = data;
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="/userEmails/' + this._id + '" class="linkshowemails" rel="' + this._id + '" title="Show Details">' + this.username + '</td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td>' + this.count + '</td>'
    });
    $('#userList table tbody').html(tableContent);
  });
};


// Add User
function addUser(event) {
  event.preventDefault();
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });
  if(errorCount === 0) {
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    }
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/adduser',
      dataType: 'JSON'
    }).done(function( response ) {
      if (response.msg === '') {
        $('#addUser fieldset input').val('');
        populateTable();
      }
      else {
        alert('Error: ' + response.msg);
      }
    });
  }
  else {
    alert('Please fill in all fields');
    return false;
  }
};


// Add Email
function addEmail(event) {
  event.preventDefault();
  var errorCount = 0;
  $('#addEmail input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });
  if(errorCount === 0) {
    var newEmail = {
      'name': $('#addEmail fieldset input#inputUserName').val(),
      'email': $('#addEmail fieldset input#inputUserEmail').val(),
      'address': $('#addEmail fieldset input#inputUserAddress').val(),
      'zip': $('#addEmail fieldset input#inputUserZip').val(),
      'memberID': $('#addEmail fieldset input#inputUserMemberID').val(),
      'comments': $('#addEmail fieldset textarea#inputUserComments').val()
    }
    $.ajax({
      type: 'POST',
      data: newEmail,
      url: '/addEmail',
      dataType: 'JSON'
    }).done(function( response ) {
      if (response.msg === '') {
        $('#addEmail fieldset input').val('');
        populateTable();
      }
      else {
        alert('Error: ' + response.msg);
      }
    });
  }
  else {
    alert('Please fill in all fields');
    return false;
  }
};



// Delete User
function deleteUser(event) {
  event.preventDefault();
  var confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation === true) {
    $.ajax({
      type: 'DELETE',
      url: '/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {
      if (response.msg === '') {}
      else {
        alert(response.msg);
      }
      populateTable();
    });
  }
  else {
    return false;
  }
};


// Delete User
function deleteEmail(event) {
  event.preventDefault();
  var confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation === true) {
    $.ajax({
      type: 'DELETE',
      url: '/deleteEmail/' + $(this).attr('rel')
    }).done(function( response ) {
      if (response.msg === '') {}
      else {
        alert(response.msg);
      }
	  location.reload();
    });
  }
  else {
    return false;
  }
};



// DOM Ready =============================================================
$(document).ready(function() {

  populateTable();  
  
  // Add User button click
  $('#btnAddUser').on('click', addUser);
  // Add Emails button click
  $('#btnAddEmail').on('click', addEmail);
  // Delete User Button Click
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
  // Delete Email Button Click
  $('.deleteEmail').on('click', deleteEmail);
});

