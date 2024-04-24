const gradient = {
  0:[50, 220, 50],
  50:[255, 190, 0],
  100:[230, 40, 60],
};

export function evaluateHeatGradient(t:number){

  const i1 = (t>.5)?0:50;
  const i2 = (t>.5)?50:100;

  //Get the two closest colors
  const firstcolor = gradient[i1];
  const secondcolor = gradient[i2];

  //Calculate ratio between the two closest colors
  const firstcolor_x = (i1/100);
  const secondcolor_x = (i2/100)-firstcolor_x;
  const ratio = t/secondcolor_x;

  //Get the color with pickHex(thx, less.js's mix function!)
  const result = pickHex( secondcolor,firstcolor, ratio );

  return 'rgb('+result.join()+')';

}

function pickHex(color1:number[], color2:number[], weight:number) {
  const w = weight * 2 - 1;
  const w1 = (w+1) / 2;
  const w2 = 1 - w1;
  return [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
}