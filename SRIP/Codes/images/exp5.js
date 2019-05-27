

$(document).ready(function () {

    $('.drop-zone').droppable({
        accept: '.componentButton',
        drop: function (event, ui) {
            var $clone = ui.helper.clone();
            if (!$clone.is('.inside-drop-zone')) {
                $(this).append($clone.addClass('inside-drop-zone').draggable({
                    containment: '.drop-zone'
                }));
            }
        }
    });

    $('.componentButton').draggable({
        helper: 'clone'
    });

});

