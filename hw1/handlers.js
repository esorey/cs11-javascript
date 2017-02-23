function toggleStyle(el, styleName, value) {
  // If the value of the field corresponding to styleName on the
  // element's style field is '', then set it to value. Otherwise, reset it to
  // ''. e.g. if styleName = "color", we are trying to access the color field
  // on the style field of element.
  var curr_style = el.style[styleName];
  if (curr_style === '') {
    el.style[styleName] = value;
  }

  else {
    el.style[styleName] = '';
  }
}

function onFormSubmit(e) {
  var form = e.target;
  // Prevent the form from actually submitting!
  e.preventDefault();

  // Print values of foo input and bar input together to response div.
  var foo_val = form.foo.value;
  var bar_val = form.bar.value;
  var span = document.getElementById("response");
  span.innerHTML = foo_val + ' ' + bar_val;
}

function formAlert(e) {
  var form = e.target.form;
  var foo_val = form.foo.value;
  var bar_val = form.bar.value;
  alert("foo: " + foo_val + "\n" + "bar: " + bar_val);
}

function toggleBox(e) {
  var box = document.getElementById("box");
  toggleStyle(box, 'display', 'none');
}

function rotateColors(e) {
  var box = document.getElementById("box");
  var clr = box.style.backgroundColor;
  if (clr === "red") {
    box.style.backgroundColor = "blue";
  }
  else if (clr === "blue") {
    box.style.backgroundColor = "green";
  }
  else {
    box.style.backgroundColor = "red";
  }
}

function onTagButtonClick(e) {
  var targ = e.target;
  var tagsEl = document.getElementById("tags");
  var id = targ.id;
  // Check for the id here and determine which values to toggle. Then
  // loop over all the tags you find and toggle the appropriate values.
  if (id === 'bold-btn') {
    var els = document.getElementsByTagName('b');
    for (i = 0; i < els.length; i++) {
      toggleStyle(els[i], "color", "red");
    }
  }

  else if (id === 'italic-btn') {
    var els = document.getElementsByTagName('i');
    for (i = 0; i < els.length; i++) {
      toggleStyle(els[i], "backgroundColor", "gray");
    }
  }

  else {
    var els = document.getElementsByTagName('u');
    for (i = 0; i < els.length; i++) {
      toggleStyle(els[i], "border", "1px solid blue");
    }
  }
}

function initCanvas() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, c.width, c.height);
}

function randomColor() {
  var r = (Math.random() * 256 | 0).toString(16);
  var g = (Math.random() * 256 | 0).toString(16);
  var b = (Math.random() * 256 | 0).toString(16);
  return "#" + r + g + b;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawBox(e) {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");

  // Firefox doesn't set offsetX/offsetY.
  if(!e.hasOwnProperty('offsetX')) {
    e.offsetX = e.layerX - e.currentTarget.offsetLeft;
    e.offsetY = e.layerY - e.currentTarget.offsetTop;
  }
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  // Fill a rectangle with a random color, with a width between 50 and
  // 200 and a height between 50 and 100, such that it is centered around the
  // point (mouseX, mouseY)
  var clr = randomColor();
  var width = getRandomInt(50, 201);
  var height = getRandomInt(50, 101);
  ctx.fillStyle = clr;
  ctx.fillRect(mouseX - width / 2, mouseY - height / 2, width, height);
}
