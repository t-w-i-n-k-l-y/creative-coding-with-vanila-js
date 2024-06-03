window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;
    
    // canvas settings
    console.log(ctx);
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'lightblue';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 30;
    ctx.shadowOffsetY = 10;

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;


    // Fractals & JavaScript classes
    // for rendering the mathematical shapes
    class Fractal {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.size = this.canvasWidth * 0.25;
            this.sides = 5;
            this.maxLevel = 3;
            this.scale = 0.5;
            this.spread = Math.random() * 0.5 - 0.9
            this.branches = 2;
            this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';   // hue, saturation, lightness
        }

        draw(context) {
            context.strokeStyle = this.color;
            context.fillStyle = this.color;

            // draw the fractal
            context.save();
            context.translate(this.canvasWidth/2, this.canvasHeight/2);
            context.scale(1, 1);
            context.rotate(0)
            for (let i = 0; i < this.sides; i++){
                this.#drawCircle(context, 0);
                context.rotate((Math.PI * 2)/this.sides);
            }
            context.restore();
        }

        #drawCircle(context, level) { // private method

            if (level > this.maxLevel) return;

            // draw a circle instead of a line
            context.beginPath();
            context.arc(0, 0, this.size, 0, Math.PI * 2);
            context.stroke();

            //context.beginPath();
            //context.moveTo(0, 0);
            //context.lineTo(this.size, 0);
            //context.stroke();

            // to draw some circles
            context.beginPath();
            context.arc(this.size * 1.5, 0, 50, 0, Math.PI * 2);
            context.fill();
            
            for (let i = 0; i < this.branches; i++) {
                context.save(); // to get one shape keep this uncommented, for different shapes, comment this.
                
                // the + and - in the translate method is to give space between the branches (- will look the shape as whole, while + will make the shape display the branches separately)
                context.translate(this.size - (this.size/this.branches) * i, 0); 
                context.scale(this.scale, this.scale);

                context.save();
                context.rotate(this.spread);
                this.#drawCircle(context, level + 1);
                context.restore();

                context.restore();  // to get one shape keep this uncommented, for different shapes, comment this.
            }
        }
    }

    // defining properties and behaviors of individual particles
    class Particle { 
        constructor(canvasWidth, canvasHeight, image) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = image;
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.sizeModifier = Math.random() * 0.2 + 0.1;
            this.width = this.image.width * this.sizeModifier;
            this.height = this.image.height * this.sizeModifier;
            this.speed = Math.random() * 1 + 0.9;
            this.angle = 1;
            this.va = Math.random() * 0.01 - 0.005;
        }       

        update() {
            this.angle += this.va;
            this.x += this.speed;
            if (this.x > this.canvasWidth + this.width) {
                this.x = - this.width;
            }
            this.y += this.speed;

            if (this.y > this.canvasHeight + this.height) {
                this.y = - this.height;
            }
        }

        draw(context) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, -this.width, -this.height, this.width, this.height);
            context.restore();
        }
    }

    // handle the entire effect
    class Rain {
        constructor(canvasWidth, canvasHeight, image) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = image;
            this.numberOfParticles = 10;
            this.particles = [];   
            this.#initialize(); 
        }

        #initialize() {
            for (let i = 0; i < this.numberOfParticles; i++) {
                this.particles.push(new Particle(this.canvasWidth, this.canvasHeight, this.image));
            }
        }

        run(context) {
            this.particles.forEach(particle => {
                particle.draw(context);
                particle.update();
            });
        }
    }

    const fractal1 = new Fractal(canvas.width, canvas.height);
    fractal1.draw(ctx);
    const fractalImage = new Image(); // create a simple img element
    fractalImage.src = canvas.toDataURL(); // convert the canvas to an image

    fractalImage.onload = function() {
        const rainEffect = new Rain(canvas2.width, canvas2.height, fractalImage);
        console.log(rainEffect);
    
        function animate() {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            rainEffect.run(ctx2);
            requestAnimationFrame(animate);
        }
    
        animate();
    }
});