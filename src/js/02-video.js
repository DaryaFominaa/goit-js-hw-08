import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate',  throttle((function (data) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}), 1000));

player.setCurrentTime(Number(localStorage.getItem('videoplayer-current-time')));
