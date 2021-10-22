import { browser } from "$app/env";
export const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
      return idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
  };

export const shuffleArray = arr => {
    return arr.map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
}

export function longpress(node, threshold = 500) {
// Implémenter les touch events
  const handle_mousedown = () => {
    const timeout = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, threshold);

    const cancel = () => {
      clearTimeout(timeout);
      node.removeEventListener('mousemove', cancel);
      node.removeEventListener('mouseup', cancel);
    };

    node.addEventListener('mousemove', cancel);
    node.addEventListener('mouseup', cancel);
  }

  node.addEventListener('mousedown', handle_mousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handle_mousedown);
    }
  };
}

export const theRightDef = (w) => {
  let res = 400;
    switch (w) {
			case w >= 1344 :
				res = 1000
				break;
			case w < 1344 && w >= 768 :
				res = 600
				break;
			case w < 768 :
				res = 400
				break;
			default :
				break;
		}
  return res;
};

export const isMobileDevice = () => {
  if(browser)
    return (screen.width <= 801) ||  (window.matchMedia && window.matchMedia('only screen and (max-width: 801px)').matches)
  else return false;
//  return (typeof window !== 'undefined') && (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
}

export function getFileName(str){
  if (!str) return "paillasse-sur-mesure-02";
  const file = str.split('/').pop();
  return file.substr(0,file.lastIndexOf('.'))
}

