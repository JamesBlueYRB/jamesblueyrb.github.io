const audio = document.createElement('audio');
audio.src = 'Met Her on the internet.mp3';
audio.loop = true;
audio.autoplay = true;
audio.id = 'myAudio';
document.body.appendChild(audio);