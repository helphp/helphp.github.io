class Hypnotize {
    constructor() {
        this.init();
        this.run();
        this.resized = false;
    }
    init(lineWidth = 30, maxFactor = 1.2, start = 0, startIncrement = -0.2) {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.center = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.ctx = this.canvas.getContext("2d");
        // Let's create a inner line width so that it remembers what linewidth is on resize
        this.ctx.lineWidth = this.lineWidth = lineWidth;
        this.ctx.lineCap = this.lineCap = "round"; // fixes that weird bubble in the middle
        this.maxFactor = maxFactor;
        this.start = start;
        this.startIncrement = startIncrement;
    }
    draw() {
        // Check if window wasn't resized
        if (this.canvas.width == window.innerWidth && this.canvas.height == window.innerHeight) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear if not resized
        }

        let max = Math.max(this.canvas.width, this.canvas.height) * this.maxFactor;

        this.ctx.beginPath();
        let t = this.start;
        let x, y;
        let a = 1; //1/2;
        let r;
        for (let i = 0; (i < max && !this.resized); ++i) {
            r = i * a; // save some processing time
            x = r * Math.cos(t) + this.center.x;
            y = r * Math.sin(t) + this.center.y;
            this.ctx.lineTo(x, y);
            t += 0.1;
        }
        this.ctx.stroke();
        this.start += this.startIncrement;

        if(this.resized) {
            this.resized = false;
            this.init();
        }
    }
    toggleDir() {
        this.startIncrement *= -1;
    }
    display() {
        let animate = () => {
            requestAnimationFrame(animate);
            this.draw();
        }
        requestAnimationFrame(animate);
    }
    resize() {
        if(!this.resized)
            this.resized = true;
    }
    run() {
        this.display();
        window.addEventListener("resize", () => { this.resize(); }, false);
        this.canvas.addEventListener("click", () => { this.toggleDir(); }, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const hypnotize = new Hypnotize();

            const divText = document.getElementById('github-text')
            divText.classList.remove('github-text-off');
            divText.classList.add('github-text-on');
            messagesDisplayed = true;

        document.getElementById('github-text-span').innerHTML = 'If you lived<br>here, you'd<br>already be<br>home'
    }
    setTimeout(display_message, 5000);
}
});
