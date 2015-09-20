var editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode:        "htmlembedded",
  theme:       "monokai"
});

$('#minimize').click(function (e) {
  $(this).closest('.editor-container').animate({bottom: -300});
});

$('#maximize').click(function () {
  $(this).closest('.editor-container').animate({bottom: 0});
});
