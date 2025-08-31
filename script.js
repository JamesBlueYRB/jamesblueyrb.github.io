document.addEventListener('DOMContentLoaded', function() {
    const options = {
        root: null,
        threshold: 0.1,
    };
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // ngung theo doi phan tu do de chay hieu ung 1 lan
                observer.unobserve(entry.target);
            }
        });
    }, options);
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });
});

/* api de ket noi den minecraft server */
document.addEventListener("DOMContentLoaded", function() {
    const serverIP = "31.hcm04.asakacloud.vn";
    const serverPort = "25565";

    const playersOnlineElement = document.getElementById("players-online");
    const serverStatusElement = document.getElementById("server-status");

    function fetchServerStatus() {
        fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`)
            .then(response => response.json())
            .then(data => {
                if (data.online) {
                    if (playersOnlineElement) {
                        playersOnlineElement.textContent = data.players.online;
                    }
                    if (serverStatusElement) {
                        serverStatusElement.textContent = "Online";
                        serverStatusElement.classList.remove("status-offline");
                        serverStatusElement.classList.add("status-online");
                    }
                } else {
                    if (playersOnlineElement) {
                        playersOnlineElement.textContent = "0";
                    }
                    if (serverStatusElement) {
                        serverStatusElement.textContent = "Offline";
                        serverStatusElement.classList.remove("status-online");
                        serverStatusElement.classList.add("status-offline");
                    }
                }
            })
            .catch(error => {
                console.error("Error. check lai script.js deee", error);
                if (playersOnlineElement) {
                    playersOnlineElement.textContent = "N/A";
                }
                if (serverStatusElement) {
                    serverStatusElement.textContent = "Offline";
                    serverStatusElement.classList.remove("status-online");
                    serverStatusElement.classList.add("status-offline");
                }
            });
    }

    fetchServerStatus();
    setInterval(fetchServerStatus, 30000);
});

function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const textToCopy = element.textContent.trim();

            navigator.clipboard.writeText(textToCopy).then(function() {
                alert("Đã copy: " + textToCopy);
            }, function(err) {
                console.error("Không thể copy: ", err);
            });
        }

document.addEventListener('DOMContentLoaded', (event) => {
    const music = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music'); // khi nhan vao nut, se kiem tra trang thai nhac
    const musicIcon = toggleMusicBtn.querySelector('i');
    music.play().catch(error => {
        console.log("Autoplay was prevented: ", error);
    });

    toggleMusicBtn.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        } else {
            music.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const textElements = document.querySelectorAll('.hu1');

    textElements.forEach(element => {
        const textToType = element.getAttribute('text'); // lay noi dung tu "text" class
        let i = 0;
        element.innerHTML = '';
        
        function typeWriter() {
            if (i < textToType.length) {
                element.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 20); // sau 20 mili s se them tung ki tu
            }
        }
        
        typeWriter();
    });
});