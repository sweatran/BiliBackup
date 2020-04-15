javascript: var html = "<h1>BiliBackup</h1>";
var delay = 1000;
var gen = list_gen();

function get_page_video() {
  var result = "";
  $(".fav-video-list .small-item").each(function () {
    result +=
      $(this).find("a.title").text() +
      '<br><a href="https://www.bilibili.com/video/' +
      $(this).attr("data-aid") +
      '" target=_blank >https://www.bilibili.com/video/' +
      $(this).attr("data-aid") +
      "</a><br>";
  });
  return result;
}

function get_list_video() {
  html += get_page_video();
  if ($(".be-pager-next:visible").length == 0) {
    setTimeout("change_list()", delay);
    return;
  } else {
    $(".be-pager-next").click();
    setTimeout("get_list_video()", delay);
  }
}

function* list_gen() {
  for (var list of $("#fav-createdList-container .fav-item a").get()) {
    yield list;
  }
}

function change_list() {
  var list = gen.next().value;
  if (list != undefined) {
    var list_title = $(list).attr("title");
    console.log("Start Backup: " + list_title);
    html += "<h2>" + list_title + "</h2>";
    list.click();
    setTimeout("get_list_video()", delay);
  } else {
    document.write(html);
    return;
  }
}

change_list();
