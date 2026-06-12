(function () {
    const tokenKey = 'eventQrAuthToken';
    let authType = 'phone';
    let currentUser = null;
    const modal = document.getElementById('account-modal');
    const authView = document.getElementById('auth-view');
    const profileView = document.getElementById('profile-view');
    const requestForm = document.getElementById('otp-request-form');
    const verifyForm = document.getElementById('otp-verify-form');
    const identifierInput = document.getElementById('auth-identifier');
    const nameInput = document.getElementById('auth-name');
    const message = document.getElementById('account-message');
    const orderLoginNotice = document.getElementById('order-login-notice');
    let continueOrderAfterLogin = false;
    const token = () => localStorage.getItem(tokenKey);

    async function api(path, options = {}) {
        const headers = { ...(options.headers || {}) };
        if (options.body) headers['Content-Type'] = 'application/json';
        if (token()) headers.Authorization = `Bearer ${token()}`;
        const response = await fetch(path, { ...options, headers });
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
    function setAuthType(type) {
        authType = type;
        document.querySelectorAll('[data-auth-type]').forEach((button) => button.classList.toggle('active', button.dataset.authType === type));
        const phone = type === 'phone';
        document.getElementById('auth-identifier-label').textContent = phone ? 'رقم الهاتف' : 'البريد الإلكتروني';
        document.getElementById('auth-phone-wrap').classList.toggle('email-mode', !phone);
        identifierInput.type = phone ? 'tel' : 'email';
        identifierInput.inputMode = phone ? 'numeric' : 'email';
        identifierInput.maxLength = phone ? 8 : 320;
        identifierInput.placeholder = phone ? '96001636' : 'name@example.com';
        document.getElementById('otp-request-btn').textContent = phone ? 'إرسال رمز التحقق عبر واتساب' : 'إرسال رمز التحقق إلى البريد';
        identifierInput.value = '';
        clearMessage();
    }
    requestForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage();
        const button = document.getElementById('otp-request-btn');
        button.disabled = true;
        try {
            const data = await api('/api/auth/request-otp', { method: 'POST', body: JSON.stringify({ type: authType, identifier: identifierInput.value.trim() }) });
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
                body: JSON.stringify({ type: authType, identifier: identifierInput.value.trim(), name: nameInput.value.trim(), code: document.getElementById('otp-code').value.trim() })
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
        document.getElementById('account-btn').textContent = currentUser ? 'حسابي وطلباتي' : 'تسجيل / دخول';
    }
    document.querySelectorAll('[data-auth-type]').forEach((button) => button.addEventListener('click', () => setAuthType(button.dataset.authType)));
    document.getElementById('account-btn').addEventListener('click', () => open());
    document.getElementById('account-close').addEventListener('click', close);
    document.getElementById('account-return-btn').addEventListener('click', close);
    document.getElementById('otp-back').addEventListener('click', () => { verifyForm.classList.add('hidden'); requestForm.classList.remove('hidden'); clearMessage(); });
    document.getElementById('logout-btn').addEventListener('click', () => { localStorage.removeItem(tokenKey); currentUser = null; verifyForm.classList.add('hidden'); requestForm.classList.remove('hidden'); updateAccountButton(); showAuth(); });
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
