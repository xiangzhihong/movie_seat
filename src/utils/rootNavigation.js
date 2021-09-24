import * as React from 'react';

function throttle(fn, threshold = 200) {
  let last;
  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date();
    if (last && now < last + threshold) {
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

const navigationRef = React.createRef();
function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
const goBack = throttle(() => {
  navigationRef.current?.goBack();
});
export {navigationRef, navigate, goBack};
