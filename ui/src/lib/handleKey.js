export default function handleKey (raw) {
  let components = raw.split('.');
  let key = null;
  let extension = null;

  if (components.length > 1) {
    extension = components.pop();
    key = components.join('.');
  } else {
    key = raw;
  }

  return {
    key,
    extension
  };
};
