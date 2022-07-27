class Bullet{
    constructor(width, height, x, y, vel, color){
    	this.width = width;
      	this.height = height;
        this.pos = new Vector(x, y);
        this.color = color;
        this.vel = vel
        this.hit_rect = new HitRect(this.pos.x, this.pos.y, this.width, this.height)
        
    }
    update(){
        this.pos.add(this.vel);
        this.hit_rect.x = this.pos.x;
        this.hit_rect.y = this.pos.y;
    }
    draw(context){
        context.beginPath();
        context.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fillStyle = this.color;
        context.fill();
   
    }
}