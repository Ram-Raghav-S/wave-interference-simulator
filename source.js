class Source {
  
    constructor(amplitude, wavelength, frequency, x, y) {
      this.amplitude = amplitude;
      this.wavelength = wavelength;
      this.frequency = frequency;
      this.x = x;
      this.y = y;
      this.timeElapsed = 0;
    }
  
    getDistanceToPoint(pointX, pointY) {
      return (
        Math.sqrt(Math.pow(pointX - this.x, 2) + Math.pow(pointY - this.y, 2)) * distancePerPixel
      );
    }
  
    getDisplacement(x, y) {
      let distance = this.getDistanceToPoint(x, y);
  
      if (distance > this.timeElapsed * this.wavelength * this.frequency) return 0;
  
      let currentPhase =
        (6.28 / this.wavelength) * distance - 6.28 * this.frequency * this.timeElapsed;
      return this.amplitude * Math.cos(currentPhase);
    }
  }
  