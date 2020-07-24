function vw(px: number, base = 750, unit = true) {
  return (Math.round(px) / base) * 100 + (unit ? 'vw' : '');
}

export default vw;
