/* eslint-disable */
export default {
  move(start, distance, dom, type) {
    let dis = 0;
    let speed = 5;
    if (distance < 0) {
      speed *= -1;
    }
    const timer = setInterval(() => {
      if (Math.abs(dis) >= Math.abs(distance)) {
        clearInterval(timer);
      }
      dis += speed;
      dom[type] = start + dis;
    });
  },
};
