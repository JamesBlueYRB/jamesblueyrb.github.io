const API_KEY = "AIzaSyBr_y9X8gtK7k5bKOvKujeQ0GBh8KrLPEQ";
const MODEL_NAME = "gemini-2.5-flash";
const ADMIN_USER = "VenertMoonk5";
const SYSTEM_PROMPT = `
Bạn là nhân viên hỗ trợ AI của server Minecraft tên là "VieMC".
Phong cách trả lời: Dễ thương siêu cute có emoji, ngắn gọn, thân thiện, xưng là "mình" và gọi khách là "bạn". Đảm bảo cách thêm emoji phù hợp với ngữ cảnh và không thêm emoji kiểu dạng kid
Chủ Server VieMC là VenertMoonk5 (đang học tại MindX)
Thông tin server:
- IP Server (PC): play.viemc.net (Phiên bản 1.21+)
- Discord: https://discord.gg/ZyBRtzs8xd/
- Cách tham gia: Tải Minecraft từ Tlauncher.org -> Install 1.21.4-> Multiplayer -> Add Server -> Nhập IP.
- Server có tính năng: Survival, Skyblock, Minigame, và sự kiện hàng tuần.
Nếu người dùng hỏi câu không liên quan đến Minecraft hoặc VieMC, hãy khéo léo từ chối.
- Đặc biệt, chúng ta có thêm một Server Discord là Vie Tweaks với những app/tools tối ưu pc hay boost fps cho game, chủ server là 1hxngz và VenertMoonk5
- Website của Vie Tweaks (hiện đang đượcl làm bởi VenertMoonk5 và sắp ra mắt)
`;

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    checkLoginStatus();
    loadNotification();

    document.body.classList.add('fade-in');

    updateThemeIcon(savedTheme); 

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    const playerCountEl = document.getElementById('player-count');
    if (playerCountEl) {
        const randomPlayers = Math.floor(Math.random() * 150) + 50;
        playerCountEl.innerText = `${randomPlayers} đang chơi`;
    }

    const ipBox = document.getElementById('ip-box');
    if (ipBox) {
        ipBox.addEventListener('click', () => {
            navigator.clipboard.writeText('play.viemc.net');
            alert('Đã sao chép IP: play.viemc.net');
        });
    }

    const authBtn = document.getElementById('auth-btn');
    const authDropdown = document.getElementById('auth-dropdown');
    
    if(authBtn) {
        authBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (authDropdown && !authBtn.contains(e.target) && !authDropdown.contains(e.target)) {
                authDropdown.classList.remove('active');
            }
        });
    }

    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if(tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => switchTab('login'));
        tabRegister.addEventListener('click', () => switchTab('register'));
        switchTab('login');
    }

    const btnRegister = document.getElementById('btn-register');
    if(btnRegister) {
        btnRegister.addEventListener('click', () => {
            const user = document.getElementById('reg-user').value.trim();
            const pass = document.getElementById('reg-pass').value.trim();
            const passConfirm = document.getElementById('reg-pass-confirm').value.trim();

            if(!user || !pass) return alert("Vui lòng nhập đủ thông tin!");
            if(pass !== passConfirm) return alert("Mật khẩu nhập lại không khớp!");

            let users = JSON.parse(localStorage.getItem('viemc_users')) || [];
            
            const exists = users.find(u => u.username === user);
            if(exists) {
                if(confirm("Tài khoản này đã tồn tại. Bạn có muốn đăng nhập không?")) {
                    switchTab('login');
                    document.getElementById('login-user').value = user;
                }
                return;
            }

            users.push({ username: user, password: pass });
            localStorage.setItem('viemc_users', JSON.stringify(users));
            alert("Đăng ký thành công! Hãy đăng nhập.");
            switchTab('login');
        });
    }

    const btnLogin = document.getElementById('btn-login');
    if(btnLogin) {
        btnLogin.addEventListener('click', () => {
            const user = document.getElementById('login-user').value.trim();
            const pass = document.getElementById('login-pass').value.trim();

            let users = JSON.parse(localStorage.getItem('viemc_users')) || [];
            let account = null;

            if(user === ADMIN_USER) {
                account = { username: user, password: pass, isAdmin: true };
            } else {
                account = users.find(u => u.username === user && u.password === pass);
            }
            
            if(!account) return alert("Sai tên đăng nhập hoặc mật khẩu!");

            localStorage.setItem('viemc_current_user', user);
            location.reload();
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('viemc_current_user');
            location.reload();
        });
    }

    const chatBtn = document.getElementById('chat-btn');
    const chatBox = document.getElementById('chat-box');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMsgs = document.getElementById('chat-messages');

    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatBox.classList.toggle('active');
            if (chatBox.classList.contains('active')) {
                setTimeout(() => chatInput.focus(), 300);
            }
        });

        chatSend.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    if(window.location.pathname.includes('blog.html')) {
        loadBlogList();
    }

    if(window.location.pathname.includes('admin.html')) {
        const currentUser = localStorage.getItem('viemc_current_user');
        if(currentUser !== ADMIN_USER) {
            alert("Bạn không có quyền truy cập!");
            window.location.href = 'index.html';
            return;
        }

        loadAdminBlogs();
        document.getElementById('post-blog').addEventListener('click', handlePostBlog);
        document.getElementById('set-notif').addEventListener('click', handleSetNotification);
        document.getElementById('delete-notif').addEventListener('click', handleDeleteNotification);
    }
});

function switchTab(type) {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if(type === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    } else {
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
        formLogin.classList.remove('active');
        formRegister.classList.add('active');
    }
}

function checkLoginStatus() {
    const currentUser = localStorage.getItem('viemc_current_user');
    const authContainer = document.querySelector('.auth-container');
    const loggedContainer = document.getElementById('logged-in-container');
    const adminLink = document.getElementById('nav-admin');

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.style.display = 'inline-block');

    if(currentUser) {
        if(authContainer) authContainer.style.display = 'none';
        if(loggedContainer) {
            loggedContainer.style.display = 'flex';
            document.getElementById('user-display').innerText = ` Hellu, ${currentUser}`;
        }

        if(currentUser === ADMIN_USER) {
            if(adminLink) adminLink.style.display = 'inline-block';
        } else {
            if(adminLink) adminLink.style.display = 'none';
        }
    } else {
        if(authContainer) authContainer.style.display = 'block';
        if(loggedContainer) loggedContainer.style.display = 'none';
        if(adminLink) adminLink.style.display = 'none';
    }
}

async function handleChat() {
    const chatInput = document.getElementById('chat-input');
    const chatMsgs = document.getElementById('chat-messages');
    const userText = chatInput.value.trim();
    if (userText === "") return;

    addMessage(userText, 'user');
    chatInput.value = '';
    chatInput.disabled = true;

    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('msg', 'bot');
    loadingDiv.innerText = "Thinking... ☁️";
    chatMsgs.appendChild(loadingDiv);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;

    try {
        const response = await callGeminiAPI(userText);
        chatMsgs.removeChild(loadingDiv);
        addMessage(response, 'bot');
    } catch (error) {
        chatMsgs.removeChild(loadingDiv);
        addMessage("Xin lỗi, AI đang bị lỗi kết nối hoặc API Key bị sai!", 'bot');
    } finally {
        chatInput.disabled = false;
        chatInput.focus();
    }
}

async function callGeminiAPI(userMessage) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    const prompt = `${SYSTEM_PROMPT}\n\nNgười dùng hỏi: "${userMessage}"\nTrả lời:`;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await res.json();
        
        if (data.error) {
            console.error("API Error:", data.error.message);
            return `Server API Error: ${data.error.message.substring(0, 50)}...`;
        }
        
        if (data.candidates && data.candidates.length > 0) {
            let text = data.candidates[0].content.parts[0].text;
            text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            return text;
        } else {
            return "Mình không hiểu câu hỏi lắm, bạn hỏi lại nhé!";
        }
    } catch (e) {
        console.error("Fetch failed:", e);
        return "Connect Error! Please contact VenertMoonk5/Admin.";
    }
}

function addMessage(html, sender) {
    const chatMsgs = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.classList.add('msg', sender);
    div.innerHTML = html;
    chatMsgs.appendChild(div);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function loadNotification() {
    const notifData = JSON.parse(localStorage.getItem('viemc_notification'));
    const notifBar = document.getElementById('notification-bar');
    const notifMsg = document.getElementById('notif-message');
    const notifClose = document.getElementById('notif-close');

    if (!notifData || !notifBar) return;

    const now = Date.now();
    let shouldDisplay = false;

    if (notifData.expires === 'always') {
        shouldDisplay = true;
    } else if (now < notifData.expires) {
        shouldDisplay = true;
    } else {
        localStorage.removeItem('viemc_notification');
    }

    if (shouldDisplay) {
        notifMsg.innerText = notifData.message;
        notifBar.classList.add('active');
        notifClose.addEventListener('click', () => {
            notifBar.classList.remove('active');
        });
    }
}

function loadBlogList() {
    const blogGrid = document.getElementById('blog-grid');
    let blogs = JSON.parse(localStorage.getItem('viemc_blogs')) || [];
    
    if(blogGrid) {
        blogGrid.innerHTML = '';
        if (blogs.length === 0) {
            blogGrid.innerHTML = '<p style="text-align: center; width: 100%;">Chưa có bài viết nào được đăng.</p>';
            return;
        }

        blogs.forEach(blog => {
            const card = document.createElement('div');
            card.classList.add('blog-card');
            card.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}" class="blog-img">
                <div class="blog-content">
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-desc">${blog.desc.substring(0, 100)}...</p>
                    <p style="font-size: 0.8rem; color: #a0aec0; margin-top: 10px;">Ngày đăng: ${blog.date}</p>
                </div>
            `;
            blogGrid.appendChild(card);
        });
    }
}

function handlePostBlog() {
    const title = document.getElementById('blog-title').value;
    const desc = document.getElementById('blog-desc').value;
    const imgUrl = document.getElementById('blog-img-url').value;
    const imgFile = document.getElementById('blog-img-file').files[0];

    if(!title || !desc) return alert("Nhập tiêu đề và nội dung!");

    const saveBlog = (image) => {
        let blogs = JSON.parse(localStorage.getItem('viemc_blogs')) || [];
        blogs.unshift({
            id: Date.now(),
            title,
            desc,
            image: image || '',
            date: new Date().toLocaleDateString('vi-VN')
        });
        localStorage.setItem('viemc_blogs', JSON.stringify(blogs));
        alert("Đăng bài thành công!");
        loadAdminBlogs();
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-desc').value = '';
        document.getElementById('blog-img-url').value = '';
        document.getElementById('blog-img-file').value = '';
    };

    if(imgFile) {
        const reader = new FileReader();
        reader.onloadend = () => saveBlog(reader.result);
        reader.readAsDataURL(imgFile);
    } else {
        saveBlog(imgUrl);
    }
}

function handleSetNotification() {
    const msg = document.getElementById('notif-msg').value;
    const durationVal = document.getElementById('notif-duration').value;
    
    if(!msg) return alert("Nhập nội dung thông báo!");

    let expireTime = 0;
    const now = Date.now();
    
    if(durationVal !== 'always') {
        let hours = 0;
        if (durationVal === '1') hours = 1;
        else if (durationVal === '12') hours = 12;
        else if (durationVal === '24') hours = 24;
        else if (durationVal === '48') hours = 48;
        else if (durationVal === '72') hours = 72;
        
        expireTime = now + (hours * 3600 * 1000);
    } else {
        expireTime = 'always';
    }

    localStorage.setItem('viemc_notification', JSON.stringify({
        message: msg,
        expires: expireTime
    }));
    alert("Đã cập nhật thông báo server! Người dùng sẽ thấy sau khi tải lại trang.");
}

function loadAdminBlogs() {
    const blogList = document.getElementById('admin-blog-list');
    let blogs = JSON.parse(localStorage.getItem('viemc_blogs')) || [];
    
    if(blogList) {
        blogList.innerHTML = '';
        if (blogs.length === 0) {
            blogList.innerHTML = '<p style="text-align: center; width: 100%;">Chưa có bài viết nào.</p>';
            return;
        }

        blogs.forEach(blog => {
            const card = document.createElement('div');
            card.classList.add('blog-card');
            card.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}" class="blog-img">
                <div class="blog-content">
                    <h3 class="blog-title">${blog.title}</h3>
                    <p style="font-size: 0.8rem; color: #a0aec0; margin-top: 10px;">ID: ${blog.id}</p>
                </div>
                <button class="blog-menu-btn" data-id="${blog.id}">⋮</button>
                <div class="blog-menu-dropdown" id="menu-${blog.id}">
                    <button onclick="deleteBlog(${blog.id})">Xóa Blog</button>
                </div>
            `;
            blogList.appendChild(card);

            card.querySelector('.blog-menu-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.blog-menu-dropdown').forEach(d => {
                    if (d.id !== `menu-${blog.id}`) d.style.display = 'none';
                });
                document.getElementById(`menu-${blog.id}`).style.display = document.getElementById(`menu-${blog.id}`).style.display === 'block' ? 'none' : 'block';
            });
        });
        
        document.addEventListener('click', () => {
            document.querySelectorAll('.blog-menu-dropdown').forEach(d => d.style.display = 'none');
        });
    }
}

window.deleteBlog = function(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;
    let blogs = JSON.parse(localStorage.getItem('viemc_blogs')) || [];
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('viemc_blogs', JSON.stringify(blogs));
    alert("Đã xóa bài viết!");
    loadAdminBlogs();
}

function handleDeleteNotification() {
    if (confirm("Bạn có chắc chắn muốn xóa thông báo hiện tại cho TẤT CẢ người dùng không?")) {
        localStorage.removeItem('viemc_notification');
        document.getElementById('notif-msg').value = '';
        alert("Thông báo đã được xóa thành công! Người dùng sẽ không thấy thông báo sau khi tải lại trang.");
    }
}

let updateLogs = JSON.parse(localStorage.getItem('updateLogs')) || [];

function saveLogs() {
    localStorage.setItem('updateLogs', JSON.stringify(updateLogs));
}

function addLog(title, type, description) {
    const newLog = {
        id: Date.now(),
        title: title,
        type: type,
        description: description,
        date: new Date().toLocaleDateString('vi-VN')
    };
    updateLogs.unshift(newLog);
    saveLogs();
    return newLog;
}

function deleteLog(id) {
    updateLogs = updateLogs.filter(log => log.id !== id);
    saveLogs();
}

function editLog(id, newTitle, newType, newDescription) {
    const logIndex = updateLogs.findIndex(log => log.id === id);
    if (logIndex !== -1) {
        updateLogs[logIndex].title = newTitle;
        updateLogs[logIndex].type = newType;
        updateLogs[logIndex].description = newDescription;
        saveLogs();
        return true;
    }
    return false;
}

function createLogHtml(log, isAdmin = false) {
    const typeIcon = {
        added: '✨',
        fixed: '🔧',
        improved: '✅'
    }[log.type] || '📝';

    const listItems = log.description.split('\n')
        .map(item => item.trim())
        .filter(item => item)
        .map(item => `<li>${typeIcon} ${item}</li>`).join('');

    let adminButtons = '';
    if (isAdmin) {
        adminButtons = `
            <div class="admin-actions">
                <button class="btn btn-edit" data-id="${log.id}">Sửa mô tả</button>
                <button class="btn btn-delete" data-id="${log.id}">Xóa</button>
            </div>
        `;
    }
    return `
        <div class="log-item" data-id="${log.id}">
            <div class="log-header">
                <h2>${log.title} <span class="log-date">(${log.date})</span></h2>
                ${adminButtons}
            </div>
            <ul class="log-changes ${log.type}">
                ${listItems}
            </ul>
        </div>
    `;
}

function renderPublicLogs() {
    const publicList = document.getElementById('logs-list-public');
    if (publicList) {
        if (updateLogs.length === 0) {
            publicList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">Chưa có cập nhật nào được đăng. Hãy quay lại sau nhé!</p>';
            return;
        }
        
        publicList.innerHTML = updateLogs.map(log => createLogHtml(log, false)).join('');
    }
}

function renderAdminLogs() {
    const adminList = document.getElementById('logs-list-admin');
    if (adminList) {
        if (updateLogs.length === 0) {
             adminList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">Chưa có nhật ký nào. Hãy tạo một Log mới!</p>';
            return;
        }
        
        adminList.innerHTML = updateLogs.map(log => createLogHtml(log, true)).join('');
        attachAdminListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('logs-list-public')) {
        renderPublicLogs();
    }

    if (document.getElementById('add-log-form')) {
        renderAdminLogs();
        
        document.getElementById('add-log-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('log-title').value;
            const type = document.getElementById('log-type').value;
            const description = document.getElementById('log-description').value;
            
            addLog(title, type, description);
            renderAdminLogs();
            document.getElementById('add-log-form').reset();
            alert('Đã đăng cập nhật thành công!');
        });
    }
});

function attachAdminListeners() {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.onclick = (e) => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Bạn có chắc chắn muốn xóa Log này?')) {
                deleteLog(id);
                renderAdminLogs();
            }
        };
    });

    document.querySelectorAll('.btn-edit').forEach(button => {
        button.onclick = (e) => {
            const id = parseInt(e.target.dataset.id);
            const logToEdit = updateLogs.find(log => log.id === id);
            if (logToEdit) {
                const newDesc = prompt('Sửa Mô tả Log (Các mục cách nhau bằng dòng mới):', logToEdit.description);
                if (newDesc !== null) {
                    editLog(id, logToEdit.title, logToEdit.type, newDesc);
                    renderAdminLogs();
                    alert('Đã cập nhật Log thành công!');
                }
            }
        };
    });
}