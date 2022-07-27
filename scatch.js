
let loop;
const fps = 60;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let player = new Player(50, 50, 50, 50, "white")

let topleft = new Vector(-10, 0);
let topright = new Vector(10, 0);
let bottomleft = new Vector(-10, 50);
let bottomright = new Vector(10, 50);
let shape = [topleft, topright, bottomright, bottomleft];

let rifle = new Rifle(shape, 20, 50, 0, 0, "red")
var bullets = [];
var enemies = [];
let score = 0;


window.onload = function(){
    loop = setInterval(() => {
        update();
        draw();
    }, 1000/fps);
}

function update(){
    
    player.update();
    let acc = new Vector(0, 0.3);
    player.applyForse(acc);
    player.boundaries(canvas);

    rifle.update(player);

    for (let i = 0; i < enemies.length; i++){
        enemies[i].update(player);
    }

    for (let i = 0; i < bullets.length; i++){
        bullets[i].update();
    }
    let width = canvas.width;
    let height = canvas.height;
    let new_bullets = bullets.filter((a)=>{if(!(a.pos.x < 0 || a.pos.x > width || a.pos.y < 0 || a.pos.y > height)){return a}});
    bullets = new_bullets;

   
    // kill enemies
    let bullets_to_delete = [];
    let enemies_to_delete = [];
    for (let i = 0; i < enemies.length; i++){
        for (let i = 0; i < bullets.length; i++){
            let collire_rect = enemies[i].hit_rect;
            if (bullets[i].hit_rect.check_collision(collire_rect) ){
                bullets_to_delete.push(bullets[i]);
                enemies_to_delete.push(enemies[i]);
                score += 1;
            }
        }
    }
    let new_enemies = enemies.filter((a)=>{if(!(enemies.includes(a) && enemies_to_delete.includes(a))){return a}});
    let new_new_bullets = bullets.filter((a)=>{if(!(bullets.includes(a) && bullets_to_delete.includes(a))){return a}});
    enemies = new_enemies ;
    bullets = new_new_bullets;

    // reset
    let dead = false;
    for (let i = 0; i < enemies.length; i++){
        if (player.hit_rect.check_collision(enemies[i].hit_rect)){
            player.vel = new Vector(0, 0);
            player.pos = new Vector(50, 50);
            score = 0;
            dead = true;
        }

    }
    if (dead) enemies = [];
}

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx); 
    rifle.draw(ctx);
    for (let i = 0; i < bullets.length; i++){
        bullets[i].draw(ctx);
    }
    for (let i = 0; i < enemies.length; i++){
        enemies[i].draw(ctx);
    }
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 10, 50);
}


// events
document.onmousedown = (event) => {
    let mouse_coords = getMousePos(canvas, event);
    let mouse_pos_vec = new Vector(mouse_coords.x, mouse_coords.y);
    mouse_pos_vec.subtract(player.pos);
    mouse_pos_vec.scale_to_lenth(20);
    negative_mouse_pos_vec = mouse_pos_vec.negative();
    player.jump(negative_mouse_pos_vec);
    player.jumped = true

    // create a bullet
    let dir_vec = new Vector(Math.cos(rifle.angle), Math.sin(rifle.angle));
    dir_vec.scale_to_lenth(rifle.lenght);

    let vel = new Vector(-dir_vec.y * 0.3, dir_vec.x * 0.3)

    let colors = ["red","blue","green","yellow"];
    let randomColor = colors[Math.floor(Math.random()*colors.length)];
    let bullet_pos = new Vector((rifle.points[2].x + rifle.points[3].x)/2, (rifle.points[2].y + rifle.points[3].y)/2)
    bullet = new Bullet(10, 10, bullet_pos.x, bullet_pos.y, vel, randomColor);
    bullets.push(bullet);
    
};
document.onmouseup = (event) =>{
    player.jumped = false
}

onmousemove = (event) => { 
    let mouse_coords = getMousePos(canvas, event);
    let mouse_pos_vec = new Vector(mouse_coords.x, mouse_coords.y);
    mouse_pos_vec.subtract(player.pos);
    mouse_pos_vec = new Vector(-mouse_pos_vec.y, mouse_pos_vec.x);
    let negative_mouse_pos_vec = mouse_pos_vec.negative();
    let angle = Math.atan2(negative_mouse_pos_vec.y, negative_mouse_pos_vec.x);
    rifle.set_angle(angle);

};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

// spawn enemies
window.setInterval(setInterval(() => {
    let sides = ["top","down","left","right"];
    let randomSide = sides[Math.floor(Math.random()*sides.length)];

    let width = canvas.width;
    let height = canvas.height;

    if (randomSide === "top"){
        let pos = new Vector(width/2 + randomInteger(-width/2, width/2), -100);
        
        let vel = new Vector(0, randomInteger(5, 20));
        let enemy = new Enemy(50, 50, pos.x, pos.y, "green", vel);
        enemies.push(enemy);
    }
    else if (randomSide === "down"){
        let pos = new Vector(width/2 + randomInteger(-width/2, width/2), height + 100);
        
        let vel = new Vector(0, -randomInteger(5, 20));
        let enemy = new Enemy(50, 50, pos.x, pos.y, "green", vel);
        enemies.push(enemy);
    }
    else if (randomSide === "left"){
        let pos = new Vector(-100, height/2 + randomInteger(-height/2, height/2));
        
        let vel = new Vector(randomInteger(5, 20), 0);
        let enemy = new Enemy(50, 50, pos.x, pos.y, "green", vel);
        enemies.push(enemy);
    }
    else if (randomSide === "right"){
        let pos = new Vector(width + 100, height/2 + randomInteger(-height/2, height/2));
        
        let vel = new Vector(-randomInteger(5, 20), 0);
        let enemy = new Enemy(50, 50, pos.x, pos.y, "green", vel);
        
        enemies.push(enemy);
    }
    
}, randomInteger(1000, 5000)));

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
