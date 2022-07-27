class Player{
    constructor(width, height, x, y, color){
    	this.width = width;
      	this.height = height;
        this.pos = new Vector(x, y);
        this.color = color;
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.jumped = false;
        this.hit_rect = new HitRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    jump(dir){
        if (! this.jumped){
            this.vel.add(dir);
        }
       
    }
    
    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.hit_rect.x = this.pos.x;
        this.hit_rect.y = this.pos.y;
        this.acc.reset();
       
    }

    applyForse(vec){
        this.acc.add(vec)
    }

    draw(context){
        context.beginPath();
        context.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fillStyle = this.color;
        context.fill();
   
    }

    boundaries(canvas){
        let width = canvas.width;
        let height = canvas.height;
        if (this.pos.x < 0) {
            this.vel.x *= 0.5;
            this.pos.x = width;
        }
        else if(this.pos.x > width){
            this.vel.x *= 0.5;
            this.pos.x = 0;
        }

        if (this.pos.y < 0) {
            this.vel.y = 0;
            this.pos.y = 0;
        }
        if(this.pos.y > height - this.height){
            this.vel.y = 0;
            this.pos.y = height - this.height;
        }

    }



}