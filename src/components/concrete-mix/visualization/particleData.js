export const largeParticles = [];
export const mediumParticles = [];
export const smallParticles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function generate(list, count, radius) {
  for (let i = 0; i < count; i++) {
    list.push({
      radius,

      start: [
        random(-2.95, 2.95),
        random(5, 10),
        random(-2.95, 2.95),
      ],

     target: [
    random(-2.95, 2.95),
    random(-2.95, 2.95),
    random(-2.95, 2.95)
]
    });
  }
}

generate(largeParticles, 700, 0.30);
generate(mediumParticles, 1000, 0.18);
generate(smallParticles, 3000, 0.06);


