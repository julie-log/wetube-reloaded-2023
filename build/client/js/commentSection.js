"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var deleteComments = document.querySelectorAll("#delete__comment");
var addComment = function addComment(text, id) {
  var videoComments = document.querySelector(".video__comments ul");
  var newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  var icon = document.createElement("i");
  icon.className = "fas fa-comment";
  var span = document.createElement("span");
  span.innerText = " ".concat(text);
  var span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.id = "delete__comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};
var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var textarea, text, videoId, response, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault(); // 새로고침 방지
            textarea = form.querySelector("textarea");
            text = textarea.value;
            videoId = videoContainer.dataset.id;
            if (!(text === "")) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return");
          case 6:
            _context.next = 8;
            return fetch("/api/videos/".concat(videoId, "/comment"), {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              // information about request
              body: JSON.stringify({
                text: text
              })
            });
          case 8:
            response = _context.sent;
            if (!(response.status === 201)) {
              _context.next = 18;
              break;
            }
            textarea.value = "";
            _context.next = 13;
            return response.json();
          case 13:
            json = _context.sent;
            // json 추출.
            addComment(text, json.newCommentId);
            deleteComment = document.getElementById("delete__comment");
            deleteComment.removeEventListener("click", handleDeleteComment);
            deleteComment.addEventListener("click", handleDeleteComment);
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();
if (form) {
  form.addEventListener("submit", handleSubmit);
}
var handleDeleteComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var li, commentId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            li = event.srcElement.parentNode;
            commentId = li.dataset.id;
            console.log("commentId : " + commentId);
            _context2.next = 5;
            return fetch("/api/comments/".concat(commentId, "/delete"), {
              method: "DELETE"
            });
          case 5:
            li.remove();
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function handleDeleteComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
if (deleteComments) {
  deleteComments.forEach(function (deleteComment) {
    deleteComment.addEventListener("click", handleDeleteComment);
  });
}