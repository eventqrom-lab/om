(function () {
    const tokenKey = 'eventQrAuthToken';
    const $ = (id) => document.getElementById(id);

    let currentUser = null;
    let continueOrderAfterLogin = false;
    let authMode = 'login';
    let resendTimer = null;
    let ordersLoaded = false;

    const modal = $('account-modal');
    const authView = $('auth-view');
    const profileView = $('profile-view');
    const requestForm = $('otp-request-form');
    const verifyForm = $('otp-verify-form');
    const identifierInput = $('auth-identifier');
    const nameInput = $('auth-name');
    const phoneInput = $('auth-phone');
    const message = $('account-message');
    const orderLoginNotice = $('order-login-notice');
    const resendButton = $('otp-resend');
    const profileDisplayName = $('profile-display-name');
    const profileIdentifier = $('profile-identifier');
    const profileNameInput = $('profile-name-input');
    const profilePhoneInput = $('profile-phone-input');
    const profileEditForm = $('profile-edit-form');
    const profileEditMessage = $('profile-edit-message');
    const ordersPanel = $('orders-panel');
    const ordersList = $('orders-list');
    const deleteRequestForm = $('delete-request-form');
    const deleteVerifyForm = $('delete-verify-form');
    const deleteEmailInput = $('delete-email-input');
    const deleteOtpCode = $('delete-otp-code');
    const deleteOtpMessage = $('delete-otp-message');
    const deleteAccountMessage = $('delete-account-message');
    const token = () => localStorage.getItem(tokenKey);
    const apiBase = window.location.hostname.endsWith('github.io')
        ? 'https://om-production-7de0.up.railway.app'
        : '';

    async function api(path, options = {}) {
        const headers = { ...(options.headers || {}) };
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        if (options.body) headers['Content-Type'] = 'application/json';
        if (token()) headers.Authorization = `Bearer ${token()}`;
        try {
            const response = await fetch(`${apiBase}${path}`, { ...options, headers, signal: controller.signal });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.message || 'حدث خطأ، حاول مرة أخرى.');
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('تأخر الخادم في الرد. تحقق من إعدادات البريد وحاول مرة أخرى.');
            }
            throw error;
        } finally {
            clearTimeout(timeout);
        }
    }

    function showMessage(element, text, isError = false) {
        if (!element) return;
        element.textContent = text;
        element.classList.remove('hidden', 'error');
        if (isError) element.classList.add('error');
    }

    function clearMessage(element) {
        if (!element) return;
        element.classList.add('hidden');
        element.classList.remove('error');
        element.textContent = '';
    }

    function setBusy(button, text) {
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = text;
        return () => {
            button.disabled = false;
            button.textContent = originalText;
        };
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function showAuth() {
        authView.classList.remove('hidden');
        profileView.classList.add('hidden');
        resetProfilePanels();
    }

    function setAuthMode(mode) {
        authMode = mode;
        const isSignup = mode === 'signup';
        $('account-title').textContent = isSignup ? 'إنشاء حساب' : 'تسجيل الدخول';
        $('account-lead').textContent = isSignup
            ? 'أنشئ حسابك باسمك ورقمك وبريدك الإلكتروني بدون كلمة مرور.'
            : 'أدخل بريد حسابك المسجل وسنرسل لك رمز التحقق.';
        $('login-mode-btn').classList.toggle('active', !isSignup);
        $('signup-mode-btn').classList.toggle('active', isSignup);
        $('login-mode-btn').setAttribute('aria-selected', String(!isSignup));
        $('signup-mode-btn').setAttribute('aria-selected', String(isSignup));
        document.querySelectorAll('.signup-field').forEach((field) => field.classList.toggle('hidden', !isSignup));
        nameInput.required = isSignup;
        phoneInput.required = isSignup;
        verifyForm.classList.add('hidden');
        requestForm.classList.remove('hidden');
        clearMessage(message);
    }

    function startResendCountdown(seconds = 30) {
        clearInterval(resendTimer);
        let remaining = seconds;
        resendButton.disabled = true;
        resendButton.textContent = `إرسال رمز جديد بعد ${remaining} ثانية`;
        resendTimer = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
                clearInterval(resendTimer);
                resendTimer = null;
                resendButton.disabled = false;
                resendButton.textContent = 'إرسال رمز جديد';
                return;
            }
            resendButton.textContent = `إرسال رمز جديد بعد ${remaining} ثانية`;
        }, 1000);
    }

    async function requestOtp(button, showVerifyForm = true) {
        clearMessage(message);
        const restoreButton = setBusy(button, 'جاري إرسال رمز التحقق...');
        showMessage(message, 'جاري إرسال رمز التحقق إلى بريدك الإلكتروني...');
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
            $('otp-sent-message').textContent = data.message;
            $('otp-code').value = data.devCode || '';
            if (showVerifyForm) {
                requestForm.classList.add('hidden');
                verifyForm.classList.remove('hidden');
            }
            showMessage(message, 'تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.');
            startResendCountdown();
            $('otp-code').focus();
        } catch (error) {
            showMessage(message, error.message, true);
        } finally {
            if (button !== resendButton || !resendTimer) restoreButton();
        }
    }

    function renderProfileInfo() {
        if (!currentUser) return;
        profileDisplayName.textContent = currentUser.name || 'عميل Event QR';
        profileIdentifier.textContent = currentUser.identifier;
        profileNameInput.value = currentUser.name || '';
        profilePhoneInput.value = currentUser.phone || '';
        deleteEmailInput.value = '';
        deleteOtpCode.value = '';
    }

    function resetProfilePanels() {
        document.querySelectorAll('#profile-view .account-panel').forEach((panel) => panel.classList.add('hidden'));
        document.querySelectorAll('#profile-view [data-account-section]').forEach((trigger) => trigger.classList.remove('active'));
        clearMessage(profileEditMessage);
        clearMessage(deleteAccountMessage);
    }

    function resetDeleteFlow() {
        deleteRequestForm.classList.remove('hidden');
        deleteVerifyForm.classList.add('hidden');
        deleteOtpMessage.textContent = '';
        deleteOtpCode.value = '';
        clearMessage(deleteAccountMessage);
    }

    function showProfileSection(sectionId) {
        resetProfilePanels();
        const section = $(sectionId);
        if (!section) return;
        section.classList.remove('hidden');
        document.querySelectorAll(`#profile-view [data-account-section="${sectionId}"]`).forEach((trigger) => {
            trigger.classList.add('active');
        });
        if (sectionId === 'orders-panel') loadOrders();
        if (sectionId === 'delete-account-section') resetDeleteFlow();
    }

    function formatOrderDate(value) {
        try {
            return new Intl.DateTimeFormat('ar-OM', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
        } catch {
            return '';
        }
    }

    function orderMeta(order) {
        const details = order.details || {};
        const eventType = details['نوع_المناسبة'] || details.eventType || '';
        const quantity = details['عدد_البطاقات'] || details.quantity || '';
        return [
            eventType,
            quantity ? `${quantity} بطاقة` : ''
        ].filter(Boolean).map(escapeHtml).join(' · ');
    }

    async function loadOrders(force = false) {
        if (ordersLoaded && !force) return;
        ordersList.innerHTML = '<p class="orders-empty">جاري تحميل الطلبات...</p>';
        try {
            const data = await api('/api/orders');
            ordersLoaded = true;
            ordersList.innerHTML = data.orders.length ? data.orders.map((order) => {
                const total = Number(order.total_price);
                const totalText = Number.isFinite(total) ? total.toFixed(3) : '0.000';
                const meta = orderMeta(order);
                return `
                    <article class="order-history-item">
                        <div class="order-history-main">
                            <strong>#${escapeHtml(order.order_number)}</strong>
                            <span class="order-history-price">${totalText} ${escapeHtml(order.currency || 'OMR')}</span>
                        </div>
                        ${meta ? `<p class="order-history-meta">${meta}</p>` : ''}
                        <time>${escapeHtml(formatOrderDate(order.created_at))}</time>
                    </article>`;
            }).join('') : '<p class="orders-empty">لا توجد طلبات محفوظة حتى الآن.</p>';
        } catch (error) {
            ordersLoaded = false;
            ordersList.innerHTML = `<p class="orders-empty">${escapeHtml(error.message)}</p>`;
        }
    }

    function showProfile() {
        authView.classList.add('hidden');
        profileView.classList.remove('hidden');
        ordersLoaded = false;
        renderProfileInfo();
        resetProfilePanels();
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
        await requestOtp($('otp-request-btn'));
    });

    verifyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage(message);
        try {
            const data = await api('/api/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({
                    mode: authMode,
                    identifier: identifierInput.value.trim(),
                    code: $('otp-code').value.trim()
                })
            });
            localStorage.setItem(tokenKey, data.token);
            currentUser = data.user;
            updateAccountButton();
            if (continueOrderAfterLogin) {
                continueOrderAfterLogin = false;
                orderLoginNotice.classList.add('hidden');
                close();
                $('inquiry-form')?.requestSubmit();
            } else {
                close();
            }
        } catch (error) {
            showMessage(message, error.message, true);
        }
    });

    profileView.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-account-section]');
        if (!trigger) return;
        event.preventDefault();
        showProfileSection(trigger.dataset.accountSection);
    });

    document.querySelectorAll('[data-account-back]').forEach((button) => {
        button.addEventListener('click', resetProfilePanels);
    });

    profileEditForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage(profileEditMessage);
        const saveButton = $('profile-save-btn');
        const restoreButton = setBusy(saveButton, 'جاري الحفظ...');
        try {
            const data = await api('/api/me', {
                method: 'POST',
                body: JSON.stringify({
                    name: profileNameInput.value.trim(),
                    phone: profilePhoneInput.value.trim()
                })
            });
            currentUser = data.user;
            renderProfileInfo();
            updateAccountButton();
            showMessage(profileEditMessage, 'تم حفظ معلوماتك الشخصية بنجاح.');
        } catch (error) {
            showMessage(profileEditMessage, error.message, true);
        } finally {
            restoreButton();
        }
    });

    deleteRequestForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage(deleteAccountMessage);
        const requestButton = $('delete-otp-request-btn');
        const restoreButton = setBusy(requestButton, 'جاري إرسال الرمز...');
        try {
            const data = await api('/api/me/delete-otp', {
                method: 'POST',
                body: JSON.stringify({ identifier: deleteEmailInput.value.trim() })
            });
            deleteOtpMessage.textContent = data.message;
            deleteOtpCode.value = data.devCode || '';
            deleteRequestForm.classList.add('hidden');
            deleteVerifyForm.classList.remove('hidden');
            deleteOtpCode.focus();
        } catch (error) {
            showMessage(deleteAccountMessage, error.message, true);
        } finally {
            restoreButton();
        }
    });

    deleteVerifyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage(deleteAccountMessage);
        const confirmButton = $('delete-confirm-btn');
        const restoreButton = setBusy(confirmButton, 'جاري حذف الحساب...');
        try {
            await api('/api/me', {
                method: 'DELETE',
                body: JSON.stringify({
                    identifier: deleteEmailInput.value.trim(),
                    code: deleteOtpCode.value.trim()
                })
            });
            localStorage.removeItem(tokenKey);
            currentUser = null;
            updateAccountButton();
            setAuthMode('login');
            showAuth();
            showMessage(message, 'تم حذف حسابك بنجاح.');
        } catch (error) {
            showMessage(deleteAccountMessage, error.message, true);
        } finally {
            restoreButton();
        }
    });

    $('delete-cancel-btn').addEventListener('click', () => {
        resetDeleteFlow();
        resetProfilePanels();
    });

    function updateAccountButton() {
        const button = $('account-btn');
        const label = currentUser ? 'حسابي وطلباتي' : 'تسجيل الدخول';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        button.classList.toggle('is-authenticated', Boolean(currentUser));
        const text = button.querySelector('.sr-only');
        if (text) text.textContent = label;
    }

    $('account-btn').addEventListener('click', () => open());
    $('login-mode-btn').addEventListener('click', () => setAuthMode('login'));
    $('signup-mode-btn').addEventListener('click', () => setAuthMode('signup'));
    $('account-close').addEventListener('click', close);
    resendButton.addEventListener('click', async () => requestOtp(resendButton, false));
    $('otp-back').addEventListener('click', () => {
        verifyForm.classList.add('hidden');
        requestForm.classList.remove('hidden');
        clearMessage(message);
    });
    $('logout-btn').addEventListener('click', () => {
        localStorage.removeItem(tokenKey);
        currentUser = null;
        setAuthMode('login');
        updateAccountButton();
        close();
    });
    modal.addEventListener('click', (event) => {
        if (event.target === modal) close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    (async function initialize() {
        if (token()) {
            try {
                currentUser = (await api('/api/me')).user;
            } catch {
                localStorage.removeItem(tokenKey);
            }
        }
        updateAccountButton();
    })();

    window.eventQrAuth = {
        api,
        open,
        openForOrder: () => open({ continueOrder: true }),
        close,
        isAuthenticated: () => Boolean(currentUser),
        refreshOrders: () => {
            ordersLoaded = false;
            if (currentUser && ordersPanel && !ordersPanel.classList.contains('hidden')) {
                loadOrders(true);
            }
        }
    };
})();
