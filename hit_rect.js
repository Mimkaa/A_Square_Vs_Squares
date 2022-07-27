class HitRect{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    check_collision(rect){
        let my_right = this.x + this.width;
        let my_bottom = this.y + this.height;
        let other_right = rect.x + rect.width;
        let other_bottom = rect.y + rect.height;
        if (this.x < other_right && my_right > rect.x && this.y < other_bottom && my_bottom > rect.y){
            return true;
        }
        else{
            return false;
        }
    }
}