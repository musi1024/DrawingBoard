const BASE = `${process.env.REACT_APP_NAME}${process.env.REACT_APP_VERSION}`;
interface p {
  DRAW_BOARD: string;
  COLOR_PICKER: string;
  [propName: string]: any;
}

let storageKey: p = {
  DRAW_BOARD: 'draw_board',
  COLOR_PICKER: 'color_picker'
};

for (const key in storageKey) {
  if (Object.prototype.hasOwnProperty.call(storageKey, key)) {
    storageKey[key] = `${BASE}::${storageKey[key]}`;
  }
}

export default storageKey;
