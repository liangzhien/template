define(function(require, exports, module) {
    var lufyTouch = function(_mc, _type, _cb) {
        var _startX = 0,
            _startY = 0,
            _endX = 0,
            _endY = 0,
            _dict = 100;
            
        var isEventMatch = function(_sx, _sy, _ex, _ey) {
            if (_sx == 0 && _sy == 0) {
                return false;
            }
            if (_type == "tap") {
                if (Math.abs(_ex) < 10 && Math.abs(_ey) < 10) {
                    return true;
                }
                return false;
            }
            if (_type.indexOf("swipe") > -1) {
                if (Math.abs(_ex) <= _dict && Math.abs(_ey) <= _dict) {
                    return false;
                }
                if (_type == "swipeup") {
                    return _ey < -_dict && _ey < _ex;
                }
                if (_type == "swipedown") {
                    return _ey > _dict && _ey > _ex
                }
                if (_type == "swipeleft") {
                    return _ex < -_dict && _ex < _ey
                }
                if (_type == "swiperight") {
                    return _ex > _dict && _ex > _ey
                }
            }
        }
        _mc.addEventListener(LMouseEvent.MOUSE_DOWN, function(e) {
            _startX = e.offsetX;
            _startY = e.offsetY;
        }, false);
        _mc.addEventListener(LMouseEvent.MOUSE_UP, function(e) {
            _endX = e.offsetX - _startX;
            _endY = e.offsetY - _startY;
            isEventMatch(_startX, _startY, _endX, _endY) && _cb(e);
            _startY = 0;
            _startX = 0;
        }, false);
    }

    module.exports = lufyTouch;
});
