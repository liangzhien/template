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
        var debugBox = $("<div class='debug'></div>");
        debugBox.appendTo($('body'));
        window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
            var errorMsg = []
            errorMsg.push("错误信息：", errorMessage);
            errorMsg.push("出错文件：", scriptURI);
            errorMsg.push("出错行号：", lineNumber);
            errorMsg.push("出错列号：", columnNumber);
            errorMsg.push("错误详情：", errorObj);

            debugBox.html(errorMsg.join("<br>"));
        }
        return debugBox;
    }
    gm.debug = debug;

}();

;/*!/src/loadImg.js*/
+ function() {
    function loadImg(imgUrl, loadComplete, setLoadingInfo) {
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
            _imgOBJ[_i] = img;
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
                currModel.addClass("hide");
            });
        }
        isRuning = true;
        modalContainer.removeClass("hide");
        newModal.removeClass("hide");
        setTimeout(function() {
            modalContainer.addClass("show");
            newModal.addClass("show");
            newModal.one("webkitTransitionEnd", function() {
                // setTimeout(function() {
                isRuning = false;
                currModel = newModal;
                // }, 300);

                if( _time && _time > 1000 ){
                    setTimeout(function () {
                        _hideModal(_callback);
                    }, _time);
                }
            });
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
            .on("click", '.modal_close', function(e){
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
                currPage.addClass("hide");
            });
        }
        newPage.removeClass("hide");
        setTimeout(function() {
            newPage.addClass("show");
            newPage.one("webkitTransitionEnd", function() {
                // setTimeout(function() {
                    currPage = newPage;
                    isRuning = false;
                // }, 50);
            });
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

    var _icoItem = '<div class="music"></div>';
    var _audioItem = '<audio id="music" src="{{musicUrl}}" {{times}}></audio>';

    var _ico, _audio, _eventList = [];

    function _init(_musicUrl,_once,_noIco) {
        _audioItem = _audioItem.replace('{{musicUrl}}', _musicUrl);
        _audioItem = _once ? _audioItem.replace('{{times}}','') : _audioItem.replace('{{times}}','loop');
        var _html = _noIco ? _audioItem : (_icoItem + _audioItem);
        if( $('#music').length > 1 ) {
            $('#music').remove();
        }
        $('body').append(_html);
        setTimeout(_bind, 100);
    }

    function _bind() {
        _ico = $(".music");
        _ico.on("click", function() {
            if (_ico.hasClass("on")) {
                return _stop();
            }
            _play()
        });
        _audio = $("#music")[0];
        _bindEvent();
    }

    function _onEvent(_e,_cb){
        _eventList.push([_e,_cb]);
    }

    function _bindEvent(){
        $.each(_eventList,function(i){
            _audio.addEventListener(_eventList[i][0],_eventList[i][1],false);
        })
    }

    function _offEvent(_e,_cb){
        _audio.removeEventListener(_e,_cb,false);
    }

    function _play() {
        if (!_audio) {
            setTimeout(_play, 300);
            return;
        }
        _audio.play();
        _ico.addClass("on");
        gm.tracker.event("btn", 'music', 'status', 'play');
    }

    function _stop() {
        _audio.pause();
        _ico.removeClass("on");
        gm.tracker.event("btn", 'music', 'status', 'stop');
    }

    function _end(_cb){
        endFunc = _cb;
    }

    gm.music =  {
        init: _init,
        play: _play,
        stop: _stop,
        on : _onEvent,
        off : _offEvent,
        audio : function(){
            return _audio;
        }
    }
}();

;/*!/src/setSuit.js*/
+ function() {
    function setSuit(height){
        var _height = height || 1038;
        var _viewports = $(".viewport");
        if (_viewports.length) {
            var _s = Math.max(window.innerHeight,$(window).height()) / _height;
            if (_s <= 1) {
                _viewports.css({
                    "-webkit-transform-origin": "center top",
                    "-webkit-transform": "scale(" + _s + "," + _s + ")"
                });
            }
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
            trackEvent("link",_name);
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
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                success: function() {
                    wxData.callback();
                    gm.tracker.page("share/timeline");
                },
                cancel: function() {}
            });
            wx.onMenuShareAppMessage({
                title: wxData.title,
                desc: wxData.singleDesc,
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                type: '',
                dataUrl: '',
                success: function() {
                    wxData.callback();
                    gm.tracker.page("share/appmessage");
                },
                cancel: function() {}
            });
        },
        callback: function() {}
    };

    gm.ready(function(){
        gm.wxData.imgUrl = __defaultWxData.imgUrl;
        gm.wxData.link = __defaultWxData.link;
        gm.wxData.desc = __defaultWxData.desc;
        gm.wxData.title = __defaultWxData.title;
        gm.wxData.singleDesc = __defaultWxData.singleDesc || __defaultWxData.desc;
    });

    gm.wxData = window.wxData = wxData;
}();
