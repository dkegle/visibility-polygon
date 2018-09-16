Module.onRuntimeInitialized = async _ => {
  var num_bytes = 16;
  var num_elements = 3;
  var ptr = Module._malloc(num_bytes*num_elements);
  var arr = new Int16Array(Module.HEAP16.buffer, ptr, num_elements);

  arr.set([1,2,1]);

  Module._doubling(arr.byteOffset, num_elements);


  var g_ptr = Module._getG();
  var g_size = Module._getGSize();
  var arr2 = new Int16Array(Module.HEAP16.buffer, g_ptr, g_size);
  const result = new Uint16Array(arr2);

  Module._free_result();

  Module._free(ptr);

  console.log(result);
};
