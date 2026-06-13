(function () {
    const tokenKey = 'eventQrAuthToken';
    let currentUser = null;
    const modal = document.getElementById('account-modal');
    const authView = document.getElementById('auth-view');
    const profileView = document.getElementById('profile-view');
    const requestForm = document.getElementById('otp-request-form');
    const verifyForm = document.getElementById('otp-verify-form');
    const identifierInput = document.getElementById('auth-identifier');
    const nameInput = document.getElementById('auth-name');
    const phoneInput = document.getElementById('auth-phone');
    const message = document.getElementById('account-message');
    const orderLoginNotice = document.getElementById('order-login-notice');
    let continueOrderAfterLogin = false;
    let authMode = 'login';
    const token = () => localStorage.getItem(tokenKey);
    const apiBase = window.location.hostname.endsWith('github.io')
        ? 'https://om-production-7de0.up.railway.app'
        : '';

    async function api(path, options = {}) {
        const headers = { ...(options.headers || {}) };
        if (options.body) headers['Content-Type'] = 'application/json';
        if (token()) headers.Authorization = `Bearer ${token()}`;
        const response = await fetch(`${apiBase}${path}`, { ...options, headers });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'حدث خطأ، حاول مرة أخرى.');
        return data;
    }
    function showMessage(text, isError = false) {
        message.textContent = text;
        message.classList.remove('hidden', 'error');
        if (isError) message.classList.add('error');
    }
    const clearMessage = () => message.classList.add('hidden');
    function showAuth() {
        authView.classList.remove('hidden');
        profileView.classList.add('hidden');
    }
    function setAuthMode(mode) {
        authMode = mode;
        const isSignup = mode === 'signup';
        document.getElementById('account-title').textContent = isSignup ? 'إنشاء حساب' : 'تسجيل الدخول';
        document.getElementById('account-lead').textContent = isSignup
            ? 'أنشئ حسابك باسمك ورقمك وبريدك الإلكتروني بدون كلمة مرور.'
            : 'أدخل بريد حسابك المسجل وسنرسل لك رمز التحقق.';
        document.getElementById('login-mode-btn').classList.toggle('active', !isSignup);
        document.getElementById('signup-mode-btn').classList.toggle('active', isSignup);
        document.getElementById('login-mode-btn').setAttribute('aria-selected', String(!isSignup));
        document.getElementById('signup-mode-btn').setAttribute('aria-selected', String(isSignup));
        document.querySelectorAll('.signup-field').forEach((field) => field.classList.toggle('hidden', !isSignup));
        nameInput.required = isSignup;
        phoneInput.required = isSignup;
        verifyForm.classList.add('hidden');
        requestForm.classList.remove('hidden');
        clearMessage();
    }
    async function showProfile() {
        authView.classList.add('hidden');
        profileView.classList.remove('hidden');
        document.getElementById('profile-identifier').textContent = currentUser.name ? `${currentUser.name} - ${currentUser.identifier}` : currentUser.identifier;
        const list = document.getElementById('orders-list');
        list.innerHTML = '<p class="orders-empty">جاري تحميل الطلبات...</p>';
        try {
            const data = await api('/api/orders');
            list.innerHTML = data.orders.length ? data.orders.map((order) => `
                <article class="order-history-item">
                    <strong>#${order.order_number}</strong>
                    <span>${Number(order.total_price).toFixed(3)} ${order.currency}</span>
                    <time>${new Intl.DateTimeFormat('ar-OM', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.created_at))}</time>
                </article>`).join('') : '<p class="orders-empty">لا توجد طلبات محفوظة حتى الآن.</p>';
        } catch (error) {
            list.innerHTML = `<p class="orders-empty">${error.message}</p>`;
        }
    }
    function open(options = {}) {
        continueOrderAfterLogin = Boolean(options.continueOrder);
        orderLoginNotice.classList.toggle('hidden', !continueOrderAfterLogin);
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        currentUser ? showProfile() : showAuth();
    }
    function close() {
        continueOrderAfterLogin = false;
        orderLoginNotice.classList.add('hidden');
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
    requestForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage();
        const button = document.getElementById('otp-request-btn');
        button.disabled = true;
        try {
            const data = await api('/api/auth/request-otp', {
                method: 'POST',
                body: JSON.stringify({
                    mode: authMode,
                    identifier: identifierInput.value.trim(),
                    name: nameInput.value.trim(),
                    phone: phoneInput.value.trim()
                })
            });
            document.getElementById('otp-sent-message').textContent = data.message;
            requestForm.classList.add('hidden');
            verifyForm.classList.remove('hidden');
            if (data.devCode) {
                document.getElementById('otp-code').value = data.devCode;
                showMessage(`وضع التطوير: رمز التحقق ${data.devCode}`);
            }
            document.getElementById('otp-code').focus();
        } catch (error) {
            showMessage(error.message, true);
        } finally {
            button.disabled = false;
        }
    });
    verifyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage();
        try {
            const data = await api('/api/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ mode: authMode, identifier: identifierInput.value.trim(), code: document.getElementById('otp-code').value.trim() })
            });
            localStorage.setItem(tokenKey, data.token);
            currentUser = data.user;
            updateAccountButton();
            if (continueOrderAfterLogin) {
                continueOrderAfterLogin = false;
                orderLoginNotice.classList.add('hidden');
                close();
                document.getElementById('inquiry-form')?.requestSubmit();
            } else {
                close();
            }
        } catch (error) {
            showMessage(error.message, true);
        }
    });
    function updateAccountButton() {
        const button = document.getElementById('account-btn');
        const label = currentUser ? 'حسابي وطلباتي' : 'تسجيل الدخول';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        button.classList.toggle('is-authenticated', Boolean(currentUser));
        const text = button.querySelector('.sr-only');
        if (text) text.textContent = label;
    }
    document.getElementById('account-btn').addEventListener('click', () => open());
    document.getElementById('login-mode-btn').addEventListener('click', () => setAuthMode('login'));
    document.getElementById('signup-mode-btn').addEventListener('click', () => setAuthMode('signup'));
    document.getElementById('account-close').addEventListener('click', close);
    document.getElementById('account-return-btn').addEventListener('click', close);
    document.getElementById('otp-back').addEventListener('click', () => { verifyForm.classList.add('hidden'); requestForm.classList.remove('hidden'); clearMessage(); });
    document.getElementById('logout-btn').addEventListener('click', () => { localStorage.removeItem(tokenKey); currentUser = null; setAuthMode('login'); updateAccountButton(); showAuth(); });
    modal.addEventListener('click', (event) => { if (event.target === modal) close(); });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });
    (async function initialize() {
        if (token()) {
            try { currentUser = (await api('/api/me')).user; } catch { localStorage.removeItem(tokenKey); }
        }
        updateAccountButton();
    })();
    window.eventQrAuth = {
        api,
        open,
        openForOrder: () => open({ continueOrder: true }),
        close,
        isAuthenticated: () => Boolean(currentUser),
        refreshOrders: showProfile
    };
})();
