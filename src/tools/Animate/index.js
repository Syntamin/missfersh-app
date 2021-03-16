import Vue from 'vue';
import component from './index.vue';

const Animate = Vue.extend(component);
export default function createImgAnimate({
  src, width, height, startX, startY, endX, endY,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        src,
        moveX: startX,
        moveY: startY,
        opacity: 1,
        sx: 1,
        sy: 1,
        width,
        height,
        exist: true,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.opacity = 0;
    app.sx = 0.1;
    app.sy = 0.1;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1100);
}
