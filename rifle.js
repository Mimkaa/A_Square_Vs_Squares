class Rifle{
    constructor(points, width, height, x, y, color){
        this.points = points;
        this.points_orig = [];
        for (let i = 0; i < this.points.length; i++){
            this.points_orig[i] = this.points[i].copy();
        }
        this.pos = new Vector(x, y);
        this.color = color;
        this.angle = 0;
        this.width = width;
        this.height = height;
        let x_part = Math.pow(this.width, 2);
        let y_part = Math.pow(this.height, 2);
        this.lenght = Math.sqrt(x_part + y_part);
    

    }

    set_angle(angle){
        this.angle = angle;
    }

    update(player){
        let pos_vec = player.pos.copy();
        let add_vec = new Vector(player.width/2, player.height/2);
        pos_vec.add(add_vec);
        this.pos = pos_vec;
        for (let i = 0; i < this.points.length; i++){
            this.points[i].x = (this.points_orig[i].x * Math.cos(this.angle) - this.points_orig[i].y * Math.sin(this.angle)) + this.pos.x;
            this.points[i].y = (this.points_orig[i].x * Math.sin(this.angle) + this.points_orig[i].y * Math.cos(this.angle)) + this.pos.y;
        }
        

    }
    draw(context){
        context.beginPath();
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.lineTo(this.points[1].x, this.points[1].y);
        ctx.lineTo(this.points[2].x, this.points[2].y);
        ctx.lineTo(this.points[3].x, this.points[3].y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        context.fill();
   
    }

}
    