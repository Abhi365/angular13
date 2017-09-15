$(document).ready(function () {

  $("#htmlCode").click(function () {
    HtmlElement($("#editor"));
  });
  $("#bold").click(function () {
    document.execCommand('bold', false, null);
  });
  $("#justifyCenter").click(function () {
    document.execCommand('justifyCenter', false, null);
  });
  $("#justifyLeft").click(function () {
    document.execCommand('justifyLeft', false, null);
  });
  $("#justifyRight").click(function () {
    document.execCommand('justifyRight', false, null);
  });
  $("#insertOrderedList").click(function () {
    document.execCommand('insertOrderedList', false, null);
  });
  $("#insertUnorderedList").click(function () {
    document.execCommand('insertUnorderedList', false, null);
  });
  $("#italic").click(function () {
    document.execCommand('italic', false, null);
  });
  $("#underline").click(function () {
    document.execCommand('underline', false, null);
  });
  $("#subscript").click(function () {
    document.execCommand('subscript', false, null);
  });
  $("#superscript").click(function () {
    document.execCommand('superscript', false, null);
  });
  $("#createLink").click(function () {
    var selected = document.getSelection();
    document.execCommand('createLink', false, 'http://'+selected);
  });
//  $("#createLink").click(function () {
//     var sText = document.getSelection();
//     document.execCommand('createLink', false, '<a href="' + sText + '" target="_blank">' + sText + '</a>');
// });

  function HtmlElement(elem) {
    InsertHtml($(elem).html());
  }

  function InsertHtml(data) {
    var mywindow = window.open();
    mywindow.document.write('<html><head><title>Code</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10
    //mywindow.close();
    return true;
  }
});