$(function() {
  var site_header = $(".site-header");
  var site_footer = $(".site-footer");
  var head_navi = site_header.find(".global-navi-base");
  var foot_navi = site_footer.find(".footer-navigation");
  var menu_btn = site_header.find(".menu");

//desable
  var disable_ar = ["design","modelroom","quality","merit"];

  if(head_navi.length){
    head_navi.find("li").each(function(){
      if($.inArray($(this).attr("class"),disable_ar) > -1){
        $(this).addClass("disable");
      };
    });
  }
  if(foot_navi.length){
    foot_navi.find("li").each(function(){
      if($.inArray($(this).attr("class"),disable_ar) > -1){
        $(this).addClass("disable");
      };
    });
  }


  $(".disable").find("a").on("click",function(e){
    e.preventDefault();
  });



  var _s = "";
  var separate_text = function($elm){
    var _t = $elm.text();
    _s = "";
    var _tl = _t.length;
    for(i = 0 ; i<_tl; i++ ){
      _s +=  '<span class="node0'+i+'">'+_t[i]+"</span>";
    }
    $elm.html(_s);
  };


  //new
  var new_ar = ["top","position","access","location","plan","asset"];
  if(head_navi.length){
    head_navi.find("li").each(function(){
      if($.inArray($(this).attr("class"),new_ar) > -1){
        $(this).addClass("new");
      };
    });
  }
  if(foot_navi.length){
    foot_navi.find("li").each(function(){
      if($.inArray($(this).attr("class"),new_ar) > -1){
        $(this).addClass("new");
      };
    });
  }

  //button print
  $("a.print").on("click",function(e){
    e.preventDefault();
    window.print();
  });

  //button close
  $("a.close-window").on("click",function(e){
    e.preventDefault();
    window.close();
  });


//headNavi current
  var pageId = $(".all-wrap").attr("id");
  if(head_navi.length){
    head_navi.find("li").each(function(){
      if($(this).attr("class").replace(" new","") == pageId){
        $(this).addClass("current");
      };
    });
  }


  var _gx = head_navi.offset().left;
  var _cgx = $(".global-navi .current").length ? $(".global-navi .current").offset().left - _gx : 0 ;
  var _cgw = $(".global-navi .current").length ? $(".global-navi .current").width() : 0 ;
  var _cgaw = $(".global-navi .current").length ?$(".global-navi .current a").width()+10 : 0 ;


  $(window).on("resize load",function(){
    _gx = head_navi.offset().left;
    _cgx = $(".global-navi .current").length ? $(".global-navi .current").offset().left - _gx : 0 ;
    _cgw = $(".global-navi .current").length ? $(".global-navi .current").width() : 0 ;
    _cgaw = $(".global-navi .current").length ?$(".global-navi .current a").width()+10 : 0 ;
  $(".global-navi-base .bar").css({"left":_cgx + _cgw/2,"width":_cgaw});
  }).resize();

  $(".global-navi li").on("mouseenter",function(){
    var _tgx = $(this).offset().left - _gx;
    var _tgw = $(this).width();
    var _tgaw = $(this).find("a").width()+10;
    var num = _tgx + _tgw/2;
    $(".global-navi-base .bar").css({"left": num,"width":_tgaw});
  }).on("mouseleave",function(){
    $(".global-navi-base .bar").css({"left":_cgx + _cgw/2,"width":_cgaw});
  });

  $(".global-navi-base .bar").css({"left":_cgx + _cgw/2,"width":_cgaw});


//scroll
  $(".scroll").on("click",function(event){
    event.preventDefault();
    var target_element = $(this).attr("href") === "#" ? "html,body" : $(this).attr("href") ;
    var target_scroll = $(target_element).offset().top;//-60;
    if($("#convenience").length) target_scroll = target_scroll-60;
    if($(".tb").is(":visible")){
      target_scroll = target_scroll;
    }
    if($(".sp").is(":visible")){
      target_scroll = target_scroll;
    }
    $("html,body").animate({scrollTop:target_scroll},350,function(){
      return false;
    });
  });


//popup
  $(".pop").on("click",function(){
    var url = $(this).attr("href");
    window.open(url, '_blank', 'width=810, height=800, menubar=no, toolbar=no, scrollbars=yes');
    return false;
  });

  //header-scrolled
  $(window).on("load scroll",function(){
    var s = $(this).scrollTop();
    var h = $("#top").length ? $(window).height() : 100;
    if(s > h){
      $(".site-header").addClass("on");
    }else{
      $(".site-header").removeClass("on");
    }
  });

//disable
  $(".disable a").on("click",function(e){
    e.preventDefault();
  });

  $(".comming-soon a,a.no-link").on("click",function(e){
    e.preventDefault();
  });


    var si;
  //top main-visual
  if($("#top").length){
    $(".main-visual .in").each(function(){
      var _t = $(this);
      separate_text(_t);
    });
    var _ci1 = 0;
    var _ci2 = 0;
    var _c = function(_f){
      $(".scene01 .in").eq(_ci1).addClass("on");
      _ci1++;
      if(_ci1 < $(".scene01 .in").length){
        setTimeout(_c,500);
      }else{
        setTimeout(function(){
          $(".scene01 .text02").addClass("on");
        },1200);
        setTimeout(function(){
          $(".scene01").fadeOut(1000,function(){
            _c2();
          });
        },3200);
      }
    };
    var _c2 = function(_f){
      clearInterval(si);
      si = setInterval(function(){_ss();},4500);
      $(".scene02 .in").eq(_ci2).addClass("on");
      _ci2++;
      if(_ci2 < $(".scene02 .in").length){
        setTimeout(_c2,500);
      }else{
        setTimeout(function(){
          $(".scene02 .text02").addClass("on");
          setTimeout(_c3,6800);
        },1200);
        //_f();
      }
    };
    var _c3c = $(".main-visual .scenes").length-1;
    var _c3 = function(_f){
      var _n = _c3c+1 >= $(".main-visual .scenes").length ? 0 : _c3c+1 ;
      $(".main-visual .scenes").eq(_c3c).fadeOut(1400);
      $(".main-visual .scenes").eq(_n).fadeIn(1400);
      _c3c = _n;
      if(_n == 1){
        _c2();
      }else{
        setTimeout(_c3,6800);
      }
    };
    $(window).on("load",function(){
      _c();
    });
  };

  //merit
  if($("#merit").length){
    $(window).on("load resize scroll",function(){
      var ws = $(this).scrollTop()+$(this).height();
      var index = 0;
      $(".blocks").each(function(){
        if(ws > $(this).offset().top){
          index = $(".blocks").index(this);
        }
      });
      $(".bgs li.current").removeClass("current");
      $(".bgs li").eq(index).addClass("current");
    });
  };

  //sp menu
  if(menu_btn.length){
    menu_btn.on("click", function(){
      $(this).toggleClass("open");
      head_navi.toggleClass("open");
    });
  }

  var _sC = 0;
  if($("#top").length){
    var _intro = $(".intro");
    $(window).on("scroll load resize",function(){
      var _ws = $(this).scrollTop() + $(this).height()/2;
      var _ts_start = _intro.offset().top;
      var _ts_end = _intro.offset().top + _intro.height()/2;
      var _ts_gap = _ts_end - _ts_start;
      var persent = 1;
      if(_ws-_ts_start > 0){
        persent =    1 -  (_ws-_ts_start) / _ts_gap ;
        if( persent < 0) persent = 0;
      }else{
        
      }
      $(".intro .bg01").css("opacity",persent);
    });

    var _sp = $(".main-visual .slide");
    var _v = 1800;
    var _ss = function(){
      var _n = _sC+1 >= _sp.length ? 0 : _sC+1;
      _sp.eq(_n).show();
      if( _n == 0 ){
        clearInterval(si);
        _sp.eq(_sC).fadeOut(_v,function(){
          setTimeout(function(){
            _sp.eq(_sC).removeClass("current");
            _sp.eq(_n).addClass("current");
            _sC = _n ;
          },_v+200);
        });
      }else{
        _sp.eq(_sC).fadeOut(_v,function(){
          setTimeout(function(){
            _sp.eq(_sC).removeClass("current");
            _sp.eq(_n).addClass("current");
            _sC = _n ;
          },_v+200);
        });
      }
    };
    //setInterval(function(){_ss();},4500);
  }

  $(".move-text").each(function(){
    var _t = $(this);
    separate_text(_t);
  });
  if($(".lower").length){
    $(window).on("load",function(){
      $(".lower .main-visual").addClass("on");
    });
  }
  if($("#location").length){
    $(".tab-trigger").on("click",function(){
      $(".tab-trigger").removeClass("current");
      $(this).addClass("current");
      var t = $(this).data("target");
      $(".maps-wrap .map").removeClass("current");
      $(".maps-wrap "+t).addClass("current");
    });
  }
  if($(".mv-title").length){
    separate_text($(".mv-title"));
  }
  $(window).on("resize load scroll",function(){
    var ws2 = $(this).scrollTop()+$(this).height()/4*3;
    $(".js-scroll").each(function(){
      if($(this).offset().top < ws2){
        $(this).addClass("on");
      }
    });
    $(".move-text").each(function(){
      if($(this).offset().top < ws2){
        //$(this).addClass("on");
      }
    });


  });
});


// For discussion and comments, see: http://remysharp.com/2009/01/07/html5-enabling-script/
(function(){if(!/*@cc_on!@*/0)return;var e = "abbr,article,aside,audio,bb,canvas,datagrid,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(',');for(var i=0;i<e.length;i++){document.createElement(e[i]);}})();
