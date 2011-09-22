(function() {
  this.Textarea = (function() {
    function Textarea(textarea) {
      if ((typeof jQuery !== "undefined" && jQuery !== null) && textarea instanceof jQuery) {
        this.textarea = textarea.get(0);
      } else {
        this.textarea = textarea;
      }
    }
    Textarea.prototype.getValue = function() {
      return this.textarea.value;
    };
    Textarea.prototype.getSelection = function() {
      var clone, e, range, s;
      if (document.selection) {
        range = document.selection.createRange();
        clone = range.duplicate();
        clone.moveToElementText(this.textarea);
        clone.setEndPoint('EndToEnd', range);
        s = clone.text.length - range.text.length;
        e = s + range.text.length;
      } else if (this.textarea.setSelectionRange) {
        s = this.textarea.selectionStart;
        e = this.textarea.selectionEnd;
      }
      return [s, e];
    };
    Textarea.prototype.setSelection = function(start, end) {
      var range, scrollTop;
      scrollTop = this.textarea.scrollTop;
      if (this.textarea.createTextRange) {
        if ($.browser.opera && $.browser.version >= 9.5 && length === 0) {
          return false;
        }
        range = this.textarea.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else if (this.textarea.setSelectionRange) {
        this.textarea.setSelectionRange(start, end);
      }
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.getSelected = function() {
      var end, range, start, _ref;
      if (document.selection) {
        range = document.selection.createRange();
        return range.text;
      } else if (this.textarea.setSelectionRange) {
        _ref = this.getSelection(), start = _ref[0], end = _ref[1];
        return this.textarea.value.substring(start, end);
      }
      return false;
    };
    Textarea.prototype.replaceSelected = function(str, select) {
      var after, before, end, range, scrollTop, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      if (document.selection) {
        this.textarea.focus();
        range = document.selection.createRange();
        range.text = str;
        range.select();
      } else if (this.textarea.setSelectionRange) {
        before = this.textarea.value.substring(0, start);
        after = this.textarea.value.substring(end);
        this.textarea.value = before + str + after;
      }
      end = start + str.length;
      if (!select) {
        start = end;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.insertBeforeSelected = function(str, select) {
      var end, selected, start, _ref;
      if (select == null) {
        select = false;
      }
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      selected = this.getSelected();
      this.replaceSelected(str + selected, false);
      if (select) {
        end = start + str.length;
        this.setSelection(start, end);
        this.textarea.focus();
        return this.textarea.scrollTop = scrollTop;
      }
    };
    Textarea.prototype.insertAfterSelected = function(str, select) {
      var end, selected, start, _ref;
      if (select == null) {
        select = false;
      }
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      selected = this.getSelected();
      this.replaceSelected(selected + str, select);
      if (select) {
        start = start + selected.length;
        end = start + str.length;
        this.setSelection(start, end);
        this.textarea.focus();
        return this.textarea.scrollTop = scrollTop;
      }
    };
    Textarea.prototype.wrapSelected = function(before, after, select) {
      var selected, str;
      if (select == null) {
        select = false;
      }
      selected = this.getSelected();
      if (selected.indexOf(before) === 0 && selected.lastIndexOf(after) === (selected.length - after.length)) {
        str = selected.substring(before.length, selected.length - after.length);
        return this.replaceSelected(str, select);
      } else {
        return this.replaceSelected(before + selected + after, select);
      }
    };
    return Textarea;
  })();
}).call(this);
