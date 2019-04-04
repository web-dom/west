# West
My super simple tester for web assembly. It iterates through every exported function that starts with "test" and calls the function.

* if it's a 0, it assumes the test passes
* if it's non-zero, it assumes the test failed and the value represents the start of a C-string saying what went wrong

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body></body>
  <script src="west.js"></script>
  <script>
    west("test.wasm");
  </script>
</html>
```

See a demo [here](https://web-dom.github.io/west/)

# What if I have other imports

Other imports can be mocked out to do whatever you like with an additional argument:

```javascript
west("test.wasm",{
  my_imported_function(){
    //do nothing during tests
  });
```
