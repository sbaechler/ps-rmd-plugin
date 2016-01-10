(function(){
  var csInterface = new CSInterface();
  
  function sayHello(){
    alert("hello from ExtendScript");
  };

    
  function init() {
    themeManager.init();

    var button = document.getElementById("btn_test");
    button.onclick = function () {
      csInterface.evalScript('sayHello()');
    };
  };

  init();
})();
