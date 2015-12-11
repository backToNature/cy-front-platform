$(function () {
    var $tbody = $('.components-wrapper');
    var $alert = $('#alert');
    // 编辑
    $tbody.delegate('.componet-edit', 'click', function () {
        var $this = $(this), $tr = $this.closest('tr'); 
        var componetId = $tr.data('id');
        window.open('/component/modify/' + componetId);
    });

    $tbody.delegate('.componet-drop', 'click', function () {
        var $this = $(this), $tr = $this.closest('tr'); 
        var componetId = $tr.data('id');
        $('#confirm').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                $.ajax({
                  type: 'POST',
                  url: '/component/api/delete',
                  dataType: 'json',
                  cache: false,
                  data: {
                    componet_id: componetId
                  },
                  success: function (data) {
                    if (data.code === 200 && data.status === 'success') {
                        $tr.remove();
                        $alert.find('.am-modal-bd').text('删除成功');
                        $alert.modal('open');
                    } else {
                        $alert.find('.am-modal-bd').text('删除失败！');
                        $alert.modal('open');
                    }
                  }
                });
                
            },
            // closeOnConfirm: false,
            onCancel: function() {

            }
          });
    });

});