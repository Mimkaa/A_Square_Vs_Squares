class Enemy{
    constructor(width, height, x, y, color, vel){
        this.width = width;
      	this.height = height;
        this.pos = new Vector(x, y);
        this.color = color;
        this.vel = vel;
        this.acc = new Vector(0, 0);
        this.maxSpeed = 3;
        this.hit_rect = new HitRect(this.pos.x, this.pos.y, this.width, this.height)
        
        
    }
    update(player){
        let ideal_dir = new Vector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
        ideal_dir.scale_to_lenth(this.maxSpeed);
        let steering = new Vector(ideal_dir.x - this.vel.x, ideal_dir.y - this.vel.y);

        this.acc.add(steering);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.hit_rect.x = this.pos.x;
        this.hit_rect.y = this.pos.y;
        this.acc.reset();


    }
    draw(context){
        context.beginPath();
        context.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fillStyle = this.color;
        context.fill();
        
   
    }
}