class Vector{
    constructor(x, y){
    	this.x = x;
      	this.y = y;
    }
    add(vec){
        this.x += vec.x;
        this.y += vec.y;
    }
    
    reset(){
        this.x = 0;
        this.y = 0;
    }

    negative(){
        return new Vector(-this.x, - this.y);
    }

    copy(){
        return new Vector(this.x, this.y);
    }

    mult(val){
        this.x *= val;
        this.y *= val;
    }

    scale_to_lenth(length){
        
        let ratio = length / this.length();
        this.mult(ratio);
        
    }

    length(){
        let x_part = Math.pow(this.x, 2);
        let y_part = Math.pow(this.y, 2);
        return Math.sqrt(x_part + y_part);
    }

    subtract(vec){
        this.x -= vec.x;
        this.y -= vec.y;

    }
    subtract_simple(x, y){
        this.x -= x;
        this.y -= y;

    }

}