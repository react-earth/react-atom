export const remToPx = <T extends object>(tokens: T, fontSize: number): T => {
  const newTokens: any = {};
  Object.entries(tokens).forEach(([key, value]) => {
    if (typeof value === 'object') {
      newTokens[key] = remToPx(value, fontSize);
    } else if (typeof value === 'string' && value.includes('rem')) {
      newTokens[key] = parseFloat(value.replace('rem', '')) * fontSize + 'px';
    } else {
      newTokens[key] = value;
    }
  });
  return newTokens as T;
};

export const extendTokens = <T extends object, P extends object>(tokens: T, newTokens: P): T & P => {
  const finalTokens: any = tokens;
  Object.entries(newTokens).forEach(([key, value]) => {
    if (typeof value === 'object') {
      finalTokens[key] = extendTokens(finalTokens[key] || {}, value);
    } else {
      finalTokens[key] = value;
    }
  });
  return finalTokens as T & P;
};
