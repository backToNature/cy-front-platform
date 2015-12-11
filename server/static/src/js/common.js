$(function () {
    $('#logout').on('click', function (e) {
        e.preventDefault();
        $.ajax({
          type: 'GET',
          url: '/user/api/logout',
          dataType: 'json',
          cache: false,
          success: function (data) {
            if (data.code === 200 && data.status === 'success') {
                window.location.reload();
            }
          }
        });
    })
});