class Object {
    constructor(pos, ind, col) {
      this.pos =  pos;
      this.ind = ind;
      this.col = col;

      this.pBuf = null;
      this.iBuf = null;
      this.cBuf = null;
      
      this.mov = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,-4,1];;
    }

    makeBuffers(gl){
        this.pBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.pos), gl.STATIC_DRAW);
        
        this.iBuf = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.ind),gl.STATIC_DRAW);

        this.cBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.cBuf);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.col),gl.STATIC_DRAW);
    }

    move(x,y,z){
        this.mov[12] = this.mov[12] + x;
        this.mov[13] = this.mov[13] + y;
        this.mov[14] = this.mov[14] + z;
    }

    rotateZ(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv0 = this.mov[0], mv4 = this.mov[4], mv8 = this.mov[8];

        this.mov[0] = c*this.mov[0]-s*this.mov[1];
        this.mov[4] = c*this.mov[4]-s*this.mov[5];
        this.mov[8] = c*this.mov[8]-s*this.mov[9];

        this.mov[1]=c*this.mov[1]+s*mv0;
        this.mov[5]=c*this.mov[5]+s*mv4;
        this.mov[9]=c*this.mov[9]+s*mv8;
     }

    rotateX(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv1 = this.mov[1], mv5 = this.mov[5], mv9 = this.mov[9];

        this.mov[1] = this.mov[1]*c-this.mov[2]*s;
        this.mov[5] = this.mov[5]*c-this.mov[6]*s;
        this.mov[9] = this.mov[9]*c-this.mov[10]*s;

        this.mov[2] = this.mov[2]*c+mv1*s;
        this.mov[6] = this.mov[6]*c+mv5*s;
        this.mov[10] = this.mov[10]*c+mv9*s;
     }

    rotateY(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv0 = this.mov[0], mv4 = this.mov[4], mv8 = this.mov[8];

        this.mov[0] = c*this.mov[0]+s*this.mov[2];
        this.mov[4] = c*this.mov[4]+s*this.mov[6];
        this.mov[8] = c*this.mov[8]+s*this.mov[10];

        this.mov[2] = c*this.mov[2]-s*mv0;
        this.mov[6] = c*this.mov[6]-s*mv4;
        this.mov[10] = c*this.mov[10]-s*mv8;
     }
}