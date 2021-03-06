;/*!/src/base.js*/
var gm = gm || {};

;/*!/src/init.js*/
+ function() {
    gm.readyList = [];
    gm.loadList = [];
    gm.isReady = false;
    gm.isLoad = false;

    gm.init = function(){
        $.each(gm.readyList,function(){
            this.call();
        });
        gm.isReady = true;
    }

    gm.loadend = function(){
        $.each(gm.loadList,function(){
            this.call();
        });
        gm.isLoad = true;
    }
    gm.ready = function(_fn) {
        if (gm.isReady) {
            _fn();
            return;
        }
        gm.readyList.push(_fn);
    };
    gm.loadPush = function(_fn) {
        if (gm.isLoad) {
            _fn();
            return;
        }
        gm.loadList.push(_fn);
    }
    gm.fire = function(cb){
        if(typeof WeixinJSBridge == "object"){
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                cb();
            });
        }else{
            cb();
        }
    }
    gm.push = gm.loadPush;
    gm.load = gm.loadPush;

    $(function() {
        gm.init();
    })
}();

;/*!/src/animate.js*/
+ function() {
    function list(_listBox) {
        var $self = $(_listBox);
        return animate($self.find('[data-animation]'), $self);
    }

    function show(_mc) {
        var $self = $(_mc);
        return animate($self);
    }

    function animate($element, $self) {
        $element.css({
            '-webkit-animation': 'none',
            'display': 'none'
        });

        $element.each(function(index, element) {
            var $element = $(element),
                $animation = $element.data(),
                $name = $animation.animation,
                $duration = $animation.duration || 1000,
                $ease = $animation.ease || 'ease',
                $delay = $animation.delay || 0,
                $count = $animation.count || 1;
            $element.css({
                'display': 'block',
                '-webkit-animation-name': $name,
                '-webkit-animation-duration': $duration + 'ms',
                '-webkit-animation-timing-function': 'ease',
                '-webkit-animation-timing-function': $ease,
                '-webkit-animation-delay': $delay + 'ms',
                '-webkit-animation-iteration-count': $count,
                '-webkit-animation-fill-mode': 'both'
            });
        });

        return $self || $element;
    }

    gm.animate =  {
        list: list,
        show: show
    }
}();

;/*!/src/debug.js*/
+ function() {

    function debug(){
    }

    debug.prototype.init = function(){
        this.debugBox = $("<div class='debug'></div>");
        this.debugBox.appendTo($('body'));
        window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
            var errorMsg = []
            errorMsg.push("错误信息：", errorMessage);
            errorMsg.push("出错文件：", scriptURI);
            errorMsg.push("出错行号：", lineNumber);
            errorMsg.push("出错列号：", columnNumber);
            errorMsg.push("错误详情：", errorObj);

            debugBox.html(errorMsg.join("<br>"));
        }
    }

    debug.prototype.trace = function(_msg){
        this.debugBox.prepend("<p>"+_msg+"</p>");
    }

    gm.debug = new debug();

}();

;/*!/src/loadImg.js*/
+ function() {
    function loadImg(imgUrl, loadComplete, setLoadingInfo,isReturnImgObj) {
        var _imgOBJ = [];
        var len = imgUrl.length;
        var num = 0;
        var checkLoad = function() {
            num++;
            !!setLoadingInfo && setLoadingInfo(parseInt(num / len * 100));
            if (num == len) {
                !!loadComplete && loadComplete(_imgOBJ);
            }
        }
        var _loadImg = function(url, _i) {
            var val = url;
            var img = new Image();
            img.onload = function() {
                if (img.complete == true) {
                    checkLoad();
                }
            }
            img.src = val;
            if( isReturnImgObj ){
                _imgOBJ[_i] = img;
            }
            if (_i == len - 1) return;
            _loadImg(imgUrl[_i + 1], _i + 1);
        }
        if (len == 0) {
            return !!loadComplete && loadComplete();
        }

        _loadImg(imgUrl[0], 0);
    }

    gm.loadImg = loadImg;
}();

;/*!/src/modal.js*/
+ function() {
    var modalContainer,
        modals,
        currModel,
        isRuning = false;

    function _showModal(_modalName,_time,_callback) {
        if (isRuning) return;
        var newModal = modals.filter(".modal_" + _modalName);
        if (currModel) {
            if (currModel.hasClass("modal_" + _modalName)) return;
            currModel.removeClass("show");
            currModel.one("webkitTransitionEnd", function() {
                $(this).addClass("hide");
            });
        }
        isRuning = true;
        modalContainer.removeClass("hide");
        newModal.removeClass("hide");
        setTimeout(function() {
            modalContainer.addClass("show");
            newModal.addClass("show");
            isRuning = false;
            currModel = newModal;
            if( _time && _time > 1000 ){
                setTimeout(function () {
                    _hideModal(_callback);
                }, _time+500);
            }
        }, 20);
        gm.tracker.page("modal/" + _modalName);
        return newModal;
    }

    function _hideModal(_callback) {
        if (isRuning) return;
        if (!currModel) return;
        isRuning = true;
        modalContainer.removeClass("show");
        currModel.removeClass("show");
        modalContainer.one("webkitTransitionEnd", function() {
            modalContainer.addClass("hide");
            currModel.addClass("hide");
            isRuning = false;
            currModel = null;

            if( _callback ) _callback();
        });
    }

    gm.ready(function() {
        modalContainer = $(".modals");
        modals = modalContainer.find(".modal");
        $(document).on("click", '.modal', function(e) {
                e.stopPropagation();
            })
            .on("click", '.modals', function(){
                _hideModal();
            })
            .on("click", '[data-modal-close]', function(e){
                e.preventDefault();
                _hideModal();
            })
            .on("click", '[data-modal]', function(e) {
                e.stopPropagation();
                e.preventDefault();
                _showModal($(this).attr("data-modal"));
            });
    });

    gm.modal = {
        show: _showModal,
        hide: _hideModal
    }
}();

;/*!/src/msg.js*/
+ function() {
        var msgBox,
            msg;

        function _showMsg(_msg, _hide, _callback) {
            msgBox.addClass("show");
            _msg && msg.html(_msg);
            msgBox.css("margin-top", -msgBox.height() / 2);
            gm.tracker.event("msg",_msg);
            _hide && setTimeout(function() {
                _hideMsg();
                !!_callback && _callback();
            }, _hide);
        }

        function _hideMsg() {
            msgBox.removeClass("show");
        }

        function _setText(_msg){
            msg.html(_msg);
        }

        gm.ready(function(){
            msgBox = $(".msg_box");
            msg = msgBox.children().eq(0);
        });

        gm.msg =  {
            show: _showMsg,
            hide: _hideMsg,
            text: _setText
        }
}();

;/*!/src/page.js*/
+ function() {
    var pageContainer,
        pages,
        currPage,
        isRuning = false;

    function _showPage(_pageName) {
        if (isRuning) return;
        isRuning = true;
        var newPage = pages.filter("." + _pageName);
        if (currPage) {
            if (currPage.hasClass(_pageName)) return;
            currPage.removeClass("show");
            currPage.one("webkitTransitionEnd", function() {
                $(this).addClass("hide");
            });
        }
        newPage.removeClass("hide");
        setTimeout(function() {
            newPage.addClass("show");
            currPage = newPage;
            isRuning = false;
        }, 20);
        !!currPage && gm.tracker.page(_pageName);
        return newPage;
    }

    gm.ready(function(){
        pageContainer = $(".pages");
        pages = pageContainer.find(".page");

        $(document).on("click",'[data-page]',function(e) {
            e.stopPropagation();
            e.preventDefault();
            _showPage($(this).attr("data-page"));
        });
    });

    gm.page =  {
        show: _showPage
    }
}();

;/*!/src/setMusic.js*/
+ function() {
    function MyAudio(_config){
        this.init(_config);
    }

    var theAudio = {
        init : function(_config){
            var self = this;
            this.url = _config.url;
            this.loop = _config.loop;
            this.autoplay = _config.autoplay || false;
            this.icon = _config.icon || false;

            this.sound = new Howl({
              src: [this.url],
              autoplay: this.autoplay,
              loop: this.loop,
            });

            if( this.icon ){
                this.addIcon();
            }

            if( this.autoplay ){
                self.sound.once("load",function(){
                    gm.fire(function(){
                        self.playid = self.sound.play();
                    })
                });
            }
        },
        addIcon : function(){
            var self = this;
            $('.wrap').append('<div class="music"></div>');
            self.ico = $(".music");
            self.ico.on("click", function() {
                if (self.ico.hasClass("on")) {
                    self.pause();
                    return;
                }
                self.play();
            });
            if( self.autoplay ){
                self.ico.addClass("on");
            }
        },
        pause : function(){
            var self = this;
            self.sound.fade(1, 0, 1000);
            self.ico.removeClass("on");
        },
        play : function(){
            var self = this;
            self.sound.fade(0, 1, 1000);
            self.ico.addClass("on");
        }
    }

    MyAudio.prototype = theAudio;

    gm.audio = MyAudio;
}();

;/*!/src/setSuit.js*/
+ function() {
    function setSuit(height){
        var _designHeight = height || 1038;
        var _viewports = $(".viewport");
        var _currWidth = Math.max(window.innerWidth,$(window).width());
        var _ms = 1;
        if( _currWidth < 640 ){
            _ms = 640/_currWidth;
        }
        var _currHeight = Math.max(window.innerHeight,$(window).height())*_ms;
        if (_viewports.length) {
            var _s =_currHeight / _designHeight;
            _viewports.css({
                "-webkit-transform-origin": "center top",
                "-webkit-transform": "scale(" + _s + "," + _s + ")"
            });
        }

        return {
            width : _currWidth,
            height : _currHeight
        }
    }

    gm.setSuit = gm.setScale = setSuit;
}();

;/*!/src/setViewport.js*/
+ function() {
    function setViewport(_vp){
        var _meta = $("meta[name='viewport']").remove(),
            _content = _meta.attr('content').replace(/(width)=(.*?)\,(.*)/, '$1=' + _vp + ',$3');
        $("head").append(_meta.attr("content", _content));
        return _meta;
    }
    gm.setViewport = setViewport;
}();

;/*!/src/tracker.js*/
+ function() {
    function trackPage(_page) {
        try {
            _hmt.push(['_trackPageview', '/page/' + _page]);
        } catch (e) {

        }
        try {
            ga('send', 'pageview', '/page/' + _page);
        } catch (e) {

        }
    }

    function trackEvent(_category, _event, _opt_label, _opt_value) {
        try {
            _hmt.push(['_trackEvent', _category, _event, _opt_label, _opt_value]);
        } catch (e) {

        }
        try {
            ga('send', 'event', _category, _event, _opt_label, _opt_value);
        } catch (e) {

        }
    }

    function trackeLink(_href,_name){
        setTimeout(function() {
            window.location.href = _href;
        }, 300);
        try {
            trackEvent("外链",_name);
        } catch (e) {}
    }

    gm.ready(function(){
        $(document).on("click",'a[data-link]', function(e) {
            var _this = $(this);
            e.preventDefault();
            trackeLink(_this.attr("href"),_this.attr("data-link"));
        });
    });

    gm.tracker = {
        page: trackPage,
        event: trackEvent,
        link : trackeLink
    }
}();

;/*!/src/wxData.js*/
+ function() {
    var wxData = {
        imgUrl: "",
        link: "",
        desc: "",
        title: "",
        singleDesc: "",
        share: function() {
            if( !gm.wxData.singleDesc ) gm.wxData.singleDesc = gm.wxData.desc;
            wx.onMenuShareTimeline({
                title: wxData.desc,
                link: wxData.link + (wxData.link.indexOf("?") > -1 ? "&" : "?") + "source=timeline",
                imgUrl: wxData.imgUrl,
                success: function() {
                    wxData.callback('timeline');
                    gm.tracker.page("share/timeline");
                },
                cancel: function() {
                    gm.tracker.event("share",'timeline_cancel');
                }
            });
            wx.onMenuShareAppMessage({
                title: wxData.title,
                desc: wxData.singleDesc,
                link: wxData.link + (wxData.link.indexOf("?") > -1 ? "&" : "?") + "source=appmessage",
                imgUrl: wxData.imgUrl,
                type: '',
                dataUrl: '',
                success: function() {
                    wxData.callback('appmessage');
                    gm.tracker.page("share/appmessage");
                },
                cancel: function() {
                    gm.tracker.event("share",'appmessage_cancel');
                }
            });
        },
        callback: function() {}
    };

    gm.ready(function(){
        if( !__defaultWxData ) return;
        gm.wxData.imgUrl = __defaultWxData.imgUrl;
        gm.wxData.link = __defaultWxData.link;
        gm.wxData.desc = __defaultWxData.desc;
        gm.wxData.title = __defaultWxData.title;
        gm.wxData.singleDesc = __defaultWxData.singleDesc || __defaultWxData.desc;
    });

    gm.wxData = window.wxData = wxData;
}();
