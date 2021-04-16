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
  // note — a complete answer would also consider touch events

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