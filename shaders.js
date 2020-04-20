var fragmend_shader2d = ""+
    "precision mediump float; "+
    "varying vec3 vColor;"  +
    "  void main() { "+
    "    gl_FragColor = vec4(vColor,1.0);"+
    "  } ";

var vertex_shader3d = ""+
    "attribute vec3 objCoords; " +
    "uniform mat4 objMovement; " +
    "uniform mat4 cam;" +
    "uniform mat4 projection;" +
    "varying vec3 vColor;" + 
    "attribute vec3 color;"+
    "void main() {"+
    "  gl_Position = projection * objMovement * vec4(objCoords,1.);" +
    "  vColor = color;" + 
    "}";



function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}