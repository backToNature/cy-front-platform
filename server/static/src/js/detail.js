$(function () {
    $(".markdown h2,h3,h4,h5,h6").each(function(i,item){
        var tag = $(item).get(0).localName;
        $(item).attr("id","wow"+i);
        $("#toc").append('<li><a class="new'+tag+'" href="#wow'+i+'">'+$(this).text()+'</a></br></li>');
        $(".newh2").css("padding-left", 20);
        $(".newh3").css("padding-left", 40);
        $(".newh4").css("padding-left", 60);
        $(".newh5").css("padding-left", 80);
        $(".newh6").css("padding-left", 100);
    });
});