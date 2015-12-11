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
                
                $alert.find('.am-modal-bd').text('修改组件成功！');
                $alert.modal('open');
            },
            // closeOnConfirm: false,
            onCancel: function() {
              alert('算求，不弄了');
            }
          });
    });

});