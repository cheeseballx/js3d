var time_old = 0;

function loopBeforeStart(gl){
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);
  }
  
function loopBegin(gl,time){
    gl.clear(gl.COLOR_BUFFER_BIT);

    var dt = time - time_old;
    time_old = time;

    return dt;
  }


  function loopDraw(gl,pos,color,move,obj){
  
    // POSITION
    gl.enableVertexAttribArray(pos);
    gl.bindBuffer(gl.ARRAY_BUFFER,obj.pBuf);
    gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);

    // COLOR
    gl.enableVertexAttribArray(color);
    gl.bindBuffer(gl.ARRAY_BUFFER,obj.cBuf);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0);

    // MOVEMENT MATRIX
    gl.uniformMatrix4fv(move,false, obj.mov);
  
    //USE INDICES
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,obj.iBuf);
  
    //DRAW IT
    gl.drawElements(gl.TRIANGLES, obj.ind.length, gl.UNSIGNED_SHORT,0); //type,ind_len,type of ind,0
  }