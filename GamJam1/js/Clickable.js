class Clickable {
    //Create general animal object
      constructor(visual, x, y, radius) {
        this.x = x;
        this.y = y;
        this.image = visual;
        this.clicked = false;
        this.radius = radius;
        this.overlap = false;
        this.isVisible = false;
      }
    
    //Add movement to the racing animals
      checkOverlap() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d<= this.radius) {
          this.overlap = true;
          visual.cursorImg = visual.l5HandClosed;
        }
        else {
          this.overlap = false;
          visual.cursorImg = visual.l5Hand;
        }
      }
    
     // Display the animal image
      display() {
        
        if (this.overlap === true) {
          image(this.image, 0, 0);
          this.isVisible = true;
        }
       
      }
    }