// Wellcome Here you can Configure your Site with Ease 

export let yourServerName = "KinderMC Network"; // Change this to Your Server name
let yourDiscordLink = "https://discord.gg/kindermc"; // Your Discord Link (Make sure to include https://)
let yourSupportEmail = "kindermcsp@gmail.com"; // Your Support Email 
export let ServerIP = "kindermc.xyz"; // Your Server IP



export const staffData = {
    "Owner": ["KaneIsMe"], // Put your staff members username in respected place
    "Admin": ["VenertMoonk5", "CaKhia1234"],
    "Mod": ["Lunar"],
    "Helper": ["Doremine"]
};

// Rank colors (modifiable)
export const rankColors = {
    "Owner": "#e74c3c",  // Here you can change the color of the ranks with ease
    "Admin": "#3498db",
    "Mod": "#2ecc71",
    "Helper": "#95a5a6"
};


// You can add as much rules as you want, but make sure to keep the format the same

export const rules = {
    serverName: "Your Server",
    rulesList: [
        {
            rule: "No cheating or hacking.",
            details: "Using any third-party software to gain an unfair advantage is strictly prohibited.",
            punishment: "Permanent ban."
        },
        {
            rule: "Be respectful to other players.",
            details: "Toxicity, harassment, or bullying will not be tolerated.",
            punishment: "Warning → Mute → Temporary ban."
        },
        {
            rule: "No spamming in chat.",
            details: "Avoid excessive messages, caps, or repeated commands.",
            punishment: "Mute for 30 minutes → Longer mute for repeat offenses."
        },
        {
            rule: "Do not exploit bugs or glitches.",
            details: "If you find a bug, report it instead of abusing it.",
            punishment: "Temporary ban → Permanent ban if repeated."
        },
        {
            rule: "No offensive language or harassment.",
            details: "Hate speech, slurs, or threats will result in punishment.",
            punishment: "Immediate mute → Ban for severe cases."
        },
        {
            rule: "Follow staff instructions at all times.",
            details: "Disrespecting staff may lead to punishments.",
            punishment: "Warning → Kick → Temporary ban."
        },
        {
            rule: "No advertising other servers.",
            details: "Promoting other servers in chat or DMs is not allowed.",
            punishment: "Immediate mute → Ban for repeated offenses."
        },
        {
            rule: "Do not use inappropriate usernames or skins.",
            details: "Names or skins containing offensive content must be changed.",
            punishment: "Kick → Ban if not changed."
        }
    ]
};



export const faq = {
    sectionTitle: "Frequently Asked Questions",
    questionsList: [
        {
            question: "How do I join the server?",
            answer: "Use our server IP: <code>play.example.com</code> in your Minecraft client."
        },
        {
            question: "What version does the server support?",
            answer: "We support Minecraft Java Edition 1.20.1 and above."
        },
        {
            question: "How can I become a staff member?",
            answer: "Apply on our Discord server when applications are open. You need to be an active member for at least 1 month."
        },
        {
            question: "Are there any banned items?",
            answer: "Check our #server-info Discord channel for the current list of restricted items."
        },
        {
            question: "How do I report a player?",
            answer: "Use <code>/report <player> <reason></code> in-game or make a ticket on Discord."
        }
        
    ]
};



// -------------------------------------------------------------------------------------------------------

// Don't change anything Here!

let discordDisplayText = yourDiscordLink.replace(/^https?:\/\//, "");


function updateServerName() {
    document.querySelectorAll(".config-server-name").forEach(el => {
        el.textContent = yourServerName;
    });
}

updateServerName();


function updateDiscordButton() {
    document.querySelectorAll(".config-discord-btn").forEach(el => {
        el.href = yourDiscordLink;
    });
}

updateDiscordButton();

function updateDiscordFooter() {
    document.querySelector(".config-support-email").innerHTML = 
        `<i class="fas fa-envelope"></i> ${yourSupportEmail}`;

    let footerElement = document.querySelector(".config-discord-footer");
    footerElement.innerHTML = `<i class="fab fa-discord"></i> <a href="${yourDiscordLink}" target="_blank">${discordDisplayText}</a>`;
}

updateDiscordFooter();

