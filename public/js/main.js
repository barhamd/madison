var editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode:        "htmlembedded",
  theme:       "monokai"
});

$('#minimize').click(function (e) {
  $(this).closest('.editor-container').addClass('minimized');
});

$('#maximize').click(function () {
  $(this).closest('.editor-container').removeClass('minimized');
});
