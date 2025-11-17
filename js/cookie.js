function setCookie(name, value, days) {
    const expires = days ? "; expires=" + new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString() : "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return matches ? matches[1] : null;
}

function hideWidget() { document.getElementById('cookie-widget').style.display = 'none'; }
function openModal() { document.getElementById('cookie-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('cookie-modal').style.display = 'none'; }

function runCookieScripts(settings) {
    const scripts = document.querySelectorAll('script[type="text/plain"][data-cookie]');
    scripts.forEach(script => {
        const category = script.getAttribute('data-cookie');
        if (settings[category]) {
            const newScript = document.createElement('script');
            if (script.src) newScript.src = script.src;
            else newScript.textContent = script.textContent;
            document.head.appendChild(newScript);
        }
    });
}

// Проверяем куки безопасно
let consent = getCookie('cookies-consent');
let consentSettings = null;

if (consent) {
    try {
        consentSettings = JSON.parse(consent);
    } catch (e) {
        console.warn("Ошибка при парсинге куки:", e);
    }
}

if (consentSettings) {
    hideWidget(); // Скрываем виджет
    runCookieScripts(consentSettings); // Запускаем разрешённые скрипты
} else {
    document.getElementById('cookie-widget').style.display = 'block';
}

// Основной виджет
document.getElementById('accept-all').onclick = () => {
    const settings = { essential: true, analytics: true, marketing: true };
    setCookie('cookies-consent', JSON.stringify(settings), 365);
    hideWidget();
    runCookieScripts(settings);
    console.log("Все куки приняты");
};

document.getElementById('reject-all').onclick = () => {
    const settings = { essential: true, analytics: false, marketing: false };
    setCookie('cookies-consent', JSON.stringify(settings), 365);
    hideWidget();
    console.log("Все куки отклонены, кроме необходимых");
};

document.getElementById('cookie-settings-btn').onclick = openModal;

// Модальное окно
document.getElementById('close-modal').onclick = closeModal;
document.getElementById('save-settings').onclick = () => {
    const settings = {
        essential: true,
        analytics: document.getElementById('analytics').checked,
        marketing: document.getElementById('marketing').checked
    };
    setCookie('cookies-consent', JSON.stringify(settings), 365);
    closeModal();
    hideWidget();
    runCookieScripts(settings);
    console.log("Настройки куки сохранены:", settings);
};