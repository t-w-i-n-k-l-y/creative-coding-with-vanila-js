window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 600;
    // canvas settings
    console.log(ctx);
    ctx.lineWidth = 50;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'lightblue';

    // Fractals & JavaScript classes
    // for rendering the mathematical shapes
    class Fractal {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.size = this.canvasWidth * 0.4;
            this.sides = 5;
        }

        draw(context) {
            // draw the fractal
            context.save(); // will create a snapshot of the current canvas state
            context.translate(this.canvasWidth/2, this.canvasHeight/2);
            context.scale(1, 1);
            context.rotate(0);
            
            for (let i =0; i < 7; i++) {
                this.#drawLine(context);
                context.rotate((Math.PI * 2)/7);
            }
            
            context.restore();
        }

        #drawLine(context) { // private method
            context.beginPath();
            context.moveTo(0, 0); // start point
            context.lineTo(this.size, 0); 
            context.stroke();
        }
    }

    const fractal1 = new Fractal(canvas.width, canvas.height);
    fractal1.draw(ctx);

    // defining properties and behaviors of individual particles
    class Particle {

    }

    // handle the entire effect
    class Rain {

    }
});