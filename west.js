function west(module,imports={}){
  let utf8dec = new TextDecoder("utf-8");
  let memory = null;
  function fromCString(start) {
    const str = [];
    let i = start;
    while (memory[i] !== 0) {
      str.push(memory[i]);
      i++;
    }
    return utf8dec.decode(new Uint8Array(str));
  }
  fetch(module)
    .then(response => response.arrayBuffer())
    .then(bytes => {
      imports.console_log = function(message_start) {
        let _message = fromCString(message_start);
        document.querySelector("div").innerHTML += _message + "\n";
      };
      return WebAssembly.instantiate(bytes, {
        env: imports
      });
    })
    .then(results => {
      memory = new Uint8Array(results.instance.exports.memory.buffer);
      Object.keys(results.instance.exports).forEach(x => {
        if (x.indexOf("test") == 0) {
          let result = results.instance.exports[x]();
          document.body.innerHTML +=
            '<span style="' +
            (result == 0 ? "color: green;" : "color: red;") +
            '">⬤</span> ' +
            x +
            "<br>";
          if (result != 0) {
            let _message = fromCString(result);
            document.body.innerHTML += _message + "<br>";
          }
        }
      });
    });
}
