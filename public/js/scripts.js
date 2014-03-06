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
      window.history.pushState({ path: window.location }, '', window.location);
    });
  }
  else {
    return false;
  }
};


jQuery(document).ready(function($) {
  $('.deleteLink').on('click', deleteUser);
});