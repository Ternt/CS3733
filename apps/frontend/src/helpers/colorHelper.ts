
const hexToRgba = (colour:string, alpha = 1) => {
  const [r, g, b] = colour.match(/\w\w/g)!.map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const rbgToRgba = (colour:string, alpha = 1) => {
  const [r, g, b] = colour.replace(/[^\d,]/g, '').split(',');
  return `rgba(${r},${g},${b},${alpha})`;
};

const deconstructRgba = (rgba:string) => {
  return rgba.replace(/[^\d,]/g, '').split(',').map(x => parseInt(x));
};

const formatRbga = (colour:{r:number, g:number,b:number,a:number}) => {
  return `rgba(${colour.r},${colour.g},${colour.b},${colour.a})`;
};

const interpolateColour = (colourA:string, colourB:string, progress:number) => {
  const [r1, g1, b1, a1] = deconstructRgba(hexToRgba(colourA));
  const [r2, g2, b2, a2] = deconstructRgba(hexToRgba(colourB));
  return formatRbga({
    r: Math.round((r1 + r2) * progress),
    g: Math.round((g1 + g2) * progress),
    b: Math.round((b1 + b2) * progress),
    a: Math.round((a1 + a2) * progress)
  });
};

export {
  interpolateColour,
  hexToRgba,
  rbgToRgba,
  deconstructRgba
};