$(function () {
    var $alert = $('#alert');
    $('#uploadImg').on('click', function () {
        $.ajaxFileUpload({
          fileElementId: 'up-img',
          url: '/component/api/submitImg',
          dataType: 'json',
          beforeSend: function (XMLHttpRequest) {
            //("loading");
          },
          success: function (data, textStatus) {
            if (data.code === 200) {
              if (data.status === 'success') {
                $alert.find('.am-modal-bd').text('上传缩略图成功！');
                $alert.modal('open');
                $('#img').attr('src', data.img);
              }
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            $alert.find('.am-modal-bd').text('上传缩略图失败！');
            $alert.modal('open');
          },
          complete: function (XMLHttpRequest, textStatus) {
            //("loaded");
          }
        });
    });

    $('#submit').on('click', function (e) {
        e.preventDefault();
        $.ajax({
          type: 'POST',
          url: '/component/api/modify',
          dataType: 'json',
          cache: false,
          data: {
            title: $('#title').val(),
            tag: $('#tag').val(),
            description: $('#description').val(),
            content: $('#content').val(),
            component_id: $('#component_id').val(),
            img: $('#img').attr('src')
          },
          success: function (data) {
            if (data.code === 200 && data.status === 'success') {
                $alert.find('.am-modal-bd').text('修改组件成功！');
                $alert.modal('open');
            }
          }
        });
      });

});