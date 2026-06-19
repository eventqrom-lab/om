(function () {
    const tokenKey = 'eventQrAuthToken';
    const $ = (id) => document.getElementById(id);
    const accountTranslations = {
        ar: {
            close: 'إغلاق',
            accountType: 'نوع الحساب',
            login: 'تسجيل الدخول',
            signup: 'إنشاء حساب',
            loginLead: 'أدخل بريد حسابك المسجل وسنرسل لك رمز التحقق.',
            signupLead: 'أنشئ حسابك باسمك ورقمك وبريدك الإلكتروني بدون كلمة مرور.',
            orderLoginNotice: 'سجل الدخول أولاً لإرسال طلبك. ستبقى جميع تفاصيل الطلب والسعر محفوظة.',
            name: 'الاسم',
            fullName: 'الاسم الكامل',
            phone: 'رقم الهاتف',
            email: 'البريد الإلكتروني',
            requestOtp: 'إرسال رمز التحقق إلى البريد',
            otpCode: 'رمز التحقق',
            verifyLogin: 'تحقق ودخول',
            resendOtp: 'إرسال رمز جديد',
            resendOtpAfter: 'إرسال رمز جديد بعد {seconds} ثانية',
            changeEmail: 'تغيير البريد الإلكتروني',
            userAccount: 'حساب المستخدم',
            myAccount: 'حسابي',
            accountAndOrders: 'حسابي وطلباتي',
            customerFallback: 'عميل Event QR',
            editProfile: 'تعديل المعلومات الشخصية',
            orders: 'طلباتي',
            deleteAccount: 'حذف حسابي',
            contactUs: 'تواصل معنا',
            logout: 'تسجيل الخروج',
            back: 'عودة',
            saveChanges: 'حفظ التغييرات',
            registeredEmail: 'البريد الإلكتروني المسجل',
            deleteWarning: 'للتأكيد، اكتب نفس بريد حسابك المسجل. سنرسل لك رمز OTP، وبعد إدخاله سيتم حذف الحساب.',
            requestDeleteCode: 'إرسال رمز الحذف',
            deleteForever: 'حذف الحساب نهائيا',
            cancel: 'إلغاء',
            phoneError: 'يرجى كتابة رقم الهاتف بالشكل الصحيح.',
            sendingOtp: 'جاري إرسال رمز التحقق...',
            sendingOtpMessage: 'جاري إرسال رمز التحقق إلى بريدك الإلكتروني...',
            otpSent: 'تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.',
            deleteOtpSent: 'تم إرسال رمز الحذف إلى بريدك الإلكتروني.',
            loadingOrders: 'جاري تحميل الطلبات...',
            noOrders: 'لا توجد طلبات محفوظة حتى الآن.',
            cardUnit: 'بطاقة',
            saving: 'جاري الحفظ...',
            profileSaved: 'تم حفظ معلوماتك الشخصية بنجاح.',
            sendingCode: 'جاري إرسال الرمز...',
            deletingAccount: 'جاري حذف الحساب...',
            accountDeleted: 'تم حذف حسابك بنجاح.',
            genericError: 'حدث خطأ، حاول مرة أخرى.',
            timeoutError: 'تأخر الخادم في الرد. تحقق من إعدادات البريد وحاول مرة أخرى.'
        },
        en: {
            close: 'Close',
            accountType: 'Account type',
            login: 'Log In',
            signup: 'Create Account',
            loginLead: 'Enter your registered email and we will send you a verification code.',
            signupLead: 'Create an account with your name, phone number, and email. No password needed.',
            orderLoginNotice: 'Log in first to submit your order. Your order details and price will stay saved.',
            name: 'Name',
            fullName: 'Full Name',
            phone: 'Phone Number',
            email: 'Email Address',
            requestOtp: 'Send Verification Code',
            otpCode: 'Verification Code',
            verifyLogin: 'Verify and Log In',
            resendOtp: 'Send New Code',
            resendOtpAfter: 'Send New Code in {seconds}s',
            changeEmail: 'Change Email',
            userAccount: 'User Account',
            myAccount: 'My Account',
            accountAndOrders: 'My Account & Orders',
            customerFallback: 'Event QR Customer',
            editProfile: 'Edit Personal Information',
            orders: 'My Orders',
            deleteAccount: 'Delete My Account',
            contactUs: 'Contact Us',
            logout: 'Log Out',
            back: 'Back',
            saveChanges: 'Save Changes',
            registeredEmail: 'Registered Email',
            deleteWarning: 'To confirm, enter the same email registered to your account. We will send an OTP, then the account will be deleted after verification.',
            requestDeleteCode: 'Send Delete Code',
            deleteForever: 'Delete Account Permanently',
            cancel: 'Cancel',
            phoneError: 'Please enter a valid phone number.',
            sendingOtp: 'Sending verification code...',
            sendingOtpMessage: 'Sending the verification code to your email...',
            otpSent: 'A new verification code has been sent to your email.',
            deleteOtpSent: 'The delete code has been sent to your email.',
            loadingOrders: 'Loading orders...',
            noOrders: 'No saved orders yet.',
            cardUnit: 'card',
            saving: 'Saving...',
            profileSaved: 'Your personal information has been saved successfully.',
            sendingCode: 'Sending code...',
            deletingAccount: 'Deleting account...',
            accountDeleted: 'Your account has been deleted successfully.',
            genericError: 'Something went wrong. Please try again.',
            timeoutError: 'The server took too long to respond. Check the email settings and try again.'
        }
    };

    const lang = () => document.documentElement.lang === 'en' ? 'en' : 'ar';
    const t = (key, replacements = {}) => {
        let value = accountTranslations[lang()][key] || accountTranslations.ar[key] || key;
        Object.entries(replacements).forEach(([name, replacement]) => {
            value = value.replace(`{${name}}`, replacement);
        });
        return value;
    };
    const serverErrorTranslations = {
        'يرجى تسجيل الدخول أولاً.': 'Please log in first.',
        'غير مصرح لك بالدخول إلى لوحة الإدارة.': 'You are not authorized to access the admin panel.',
        'البريد الإلكتروني غير صحيح.': 'The email address is invalid.',
        'اختر تسجيل الدخول أو إنشاء حساب.': 'Choose log in or create account.',
        'لا يوجد حساب مسجل بهذا البريد. اختر إنشاء حساب أولاً.': 'No account is registered with this email. Create an account first.',
        'هذا البريد مسجل مسبقاً. اختر تسجيل الدخول.': 'This email is already registered. Please log in.',
        'يرجى كتابة رقم الهاتف بالشكل الصحيح.': 'Please enter a valid phone number.',
        'انتظر 30 ثانية قبل طلب رمز جديد.': 'Please wait 30 seconds before requesting a new code.',
        'خدمة إرسال رمز التحقق غير مهيأة حالياً.': 'The verification email service is not configured right now.',
        'خدمة إرسال رمز التحقق غير مهيأة حاليا.': 'The verification email service is not configured right now.',
        'بيانات التحقق غير صحيحة.': 'The verification details are invalid.',
        'انتهت صلاحية الرمز. اطلب رمزاً جديداً.': 'The code has expired. Request a new code.',
        'انتهت صلاحية الرمز. اطلب رمزا جديدا.': 'The code has expired. Request a new code.',
        'رمز التحقق غير صحيح.': 'The verification code is incorrect.',
        'تم استخدام رمز التحقق مسبقاً.': 'This verification code has already been used.',
        'تم استخدام رمز التحقق مسبقا.': 'This verification code has already been used.',
        'بيانات إنشاء الحساب غير مكتملة. اطلب رمزاً جديداً.': 'The account details are incomplete. Request a new code.',
        'لم يعد هذا الحساب موجوداً.': 'This account no longer exists.',
        'لم يعد هذا الحساب موجودا.': 'This account no longer exists.',
        'يرجى إدخال الاسم ورقم هاتف صحيح.': 'Please enter a name and a valid phone number.',
        'اكتب نفس بريد حسابك المسجل لتأكيد الحذف.': 'Enter the same email registered to your account to confirm deletion.',
        'بيانات تأكيد الحذف غير صحيحة.': 'The deletion confirmation details are invalid.',
        'رقم الطلب غير صالح.': 'The order number is invalid.',
        'تعذر العثور على الفاتورة.': 'The invoice could not be found.',
        'بيانات الطلب غير مكتملة.': 'The order details are incomplete.',
        'تعذر إنشاء رقم الطلب.': 'Could not create the order number.',
        'حدث خطأ في الخادم. حاول مرة أخرى.': 'A server error occurred. Please try again.'
    };
    const translateServerMessage = (message) => {
        if (!message) return '';
        return lang() === 'en' ? (serverErrorTranslations[message] || message) : message;
    };

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
    const phoneGroup = $('auth-phone-group');
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
            if (!response.ok) throw new Error(translateServerMessage(data.message) || t('genericError'));
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error(t('timeoutError'));
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

    function setText(selector, value) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) element.textContent = value;
    }

    function applyAccountLanguage() {
        $('account-close')?.setAttribute('aria-label', t('close'));
        document.querySelector('.auth-mode-switch')?.setAttribute('aria-label', t('accountType'));
        setText($('login-mode-btn'), t('login'));
        setText($('signup-mode-btn'), t('signup'));
        setText($('order-login-notice'), t('orderLoginNotice'));
        setText('label[for="auth-name"]', t('name'));
        setText('label[for="auth-phone"]', t('phone'));
        setText('label[for="auth-identifier"]', t('email'));
        setText('label[for="otp-code"]', t('otpCode'));
        setText('#otp-verify-form .btn-primary', t('verifyLogin'));
        setText($('otp-back'), t('changeEmail'));
        setText('.account-kicker', t('userAccount'));
        setText('.account-profile-top h2', t('myAccount'));
        $('account-user-card')?.setAttribute('aria-label', t('editProfile'));
        setText('#profile-edit-btn > span:last-child', t('editProfile'));
        setText('#orders-open-btn > span:last-child', t('orders'));
        setText('#delete-account-open-btn > span:last-child', t('deleteAccount'));
        setText('#account-whatsapp-link > span:last-child', t('contactUs'));
        setText('#logout-btn > span:last-child', t('logout'));
        setText($('profile-edit-title'), t('editProfile'));
        setText('label[for="profile-name-input"]', t('name'));
        setText('label[for="profile-phone-input"]', t('phone'));
        setText($('profile-save-btn'), t('saveChanges'));
        setText($('orders-heading'), t('orders'));
        setText($('delete-account-title'), t('deleteAccount'));
        setText('.delete-account-warning', t('deleteWarning'));
        setText('label[for="delete-email-input"]', t('registeredEmail'));
        setText($('delete-otp-request-btn'), t('requestDeleteCode'));
        setText('label[for="delete-otp-code"]', t('otpCode'));
        setText($('delete-confirm-btn'), t('deleteForever'));
        setText($('delete-cancel-btn'), t('cancel'));
        document.querySelectorAll('[data-account-back]').forEach((button) => {
            button.textContent = t('back');
        });
        if (nameInput) nameInput.placeholder = t('fullName');
        if (profileNameInput) profileNameInput.placeholder = t('fullName');
        if (!resendTimer) setText(resendButton, t('resendOtp'));
        if (!authMode || authMode === 'login' || authMode === 'signup') {
            renderAuthModeText();
        }
        updateAccountButton();
        renderProfileInfo();
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

    function normalizeAuthPhoneDigits(value) {
        const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        return String(value || '')
            .replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit))
            .replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit))
            .replace(/\D/g, '')
            .slice(0, 8);
    }

    function setAuthPhoneInvalid(isInvalid) {
        phoneInput.classList.toggle('invalid-input', isInvalid);
        phoneGroup?.classList.toggle('phone-invalid', isInvalid);
    }

    function getValidSignupPhone() {
        const digits = normalizeAuthPhoneDigits(phoneInput.value);
        phoneInput.value = digits;
        const isValid = /^[97]\d{7}$/.test(digits);
        setAuthPhoneInvalid(!isValid);
        return isValid ? `+968 ${digits}` : null;
    }

    function showAuth() {
        authView.classList.remove('hidden');
        profileView.classList.add('hidden');
        resetProfilePanels();
    }

    function renderAuthModeText() {
        const isSignup = authMode === 'signup';
        $('account-title').textContent = isSignup ? t('signup') : t('login');
        $('account-lead').textContent = isSignup ? t('signupLead') : t('loginLead');
        $('otp-request-btn').textContent = t('requestOtp');
    }

    function setAuthMode(mode) {
        authMode = mode;
        const isSignup = mode === 'signup';
        renderAuthModeText();
        $('login-mode-btn').classList.toggle('active', !isSignup);
        $('signup-mode-btn').classList.toggle('active', isSignup);
        $('login-mode-btn').setAttribute('aria-selected', String(!isSignup));
        $('signup-mode-btn').setAttribute('aria-selected', String(isSignup));
        document.querySelectorAll('.signup-field').forEach((field) => field.classList.toggle('hidden', !isSignup));
        nameInput.required = isSignup;
        phoneInput.required = isSignup;
        setAuthPhoneInvalid(false);
        verifyForm.classList.add('hidden');
        requestForm.classList.remove('hidden');
        clearMessage(message);
    }

    function startResendCountdown(seconds = 30) {
        clearInterval(resendTimer);
        let remaining = seconds;
        resendButton.disabled = true;
        resendButton.textContent = t('resendOtpAfter', { seconds: remaining });
        resendTimer = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
                clearInterval(resendTimer);
                resendTimer = null;
                resendButton.disabled = false;
                resendButton.textContent = t('resendOtp');
                return;
            }
            resendButton.textContent = t('resendOtpAfter', { seconds: remaining });
        }, 1000);
    }

    async function requestOtp(button, showVerifyForm = true) {
        clearMessage(message);
        const signupPhone = authMode === 'signup' ? getValidSignupPhone() : '';
        if (authMode === 'signup' && !signupPhone) {
            showMessage(message, t('phoneError'), true);
            phoneInput.focus();
            return;
        }
        const restoreButton = setBusy(button, t('sendingOtp'));
        showMessage(message, t('sendingOtpMessage'));
        try {
            const data = await api('/api/auth/request-otp', {
                method: 'POST',
                body: JSON.stringify({
                    mode: authMode,
                    identifier: identifierInput.value.trim(),
                    name: nameInput.value.trim(),
                    phone: signupPhone
                })
            });
            $('otp-sent-message').textContent = t('otpSent');
            $('otp-code').value = data.devCode || '';
            if (showVerifyForm) {
                requestForm.classList.add('hidden');
                verifyForm.classList.remove('hidden');
            }
            showMessage(message, t('otpSent'));
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
        profileDisplayName.textContent = currentUser.name || t('customerFallback');
        profileIdentifier.textContent = currentUser.identifier;
        profileNameInput.value = currentUser.name || '';
        profilePhoneInput.value = currentUser.phone || '';
        deleteEmailInput.value = '';
        deleteOtpCode.value = '';
    }

    function resetProfilePanels() {
        document.querySelectorAll('#profile-view .account-panel').forEach((panel) => panel.classList.add('hidden'));
        document.querySelectorAll('#profile-view [data-account-section]').forEach((trigger) => trigger.classList.remove('active'));
        profileView.classList.remove('is-section-open');
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
        profileView.classList.add('is-section-open');
        section.classList.remove('hidden');
        document.querySelectorAll(`#profile-view [data-account-section="${sectionId}"]`).forEach((trigger) => {
            trigger.classList.add('active');
        });
        if (sectionId === 'orders-panel') loadOrders();
        if (sectionId === 'delete-account-section') resetDeleteFlow();
    }

    function formatOrderDate(value) {
        try {
            return new Intl.DateTimeFormat(lang() === 'ar' ? 'ar-OM' : 'en-OM', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
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
            quantity ? `${quantity} ${t('cardUnit')}` : ''
        ].filter(Boolean).map(escapeHtml).join(' · ');
    }

    async function loadOrders(force = false) {
        if (ordersLoaded && !force) return;
        ordersList.innerHTML = `<p class="orders-empty">${escapeHtml(t('loadingOrders'))}</p>`;
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
            }).join('') : `<p class="orders-empty">${escapeHtml(t('noOrders'))}</p>`;
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
        const restoreButton = setBusy(saveButton, t('saving'));
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
            showMessage(profileEditMessage, t('profileSaved'));
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
        const restoreButton = setBusy(requestButton, t('sendingCode'));
        try {
            const data = await api('/api/me/delete-otp', {
                method: 'POST',
                body: JSON.stringify({ identifier: deleteEmailInput.value.trim() })
            });
            deleteOtpMessage.textContent = t('deleteOtpSent');
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
        const restoreButton = setBusy(confirmButton, t('deletingAccount'));
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
            showMessage(message, t('accountDeleted'));
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
        const label = currentUser ? t('accountAndOrders') : t('login');
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        button.classList.toggle('is-authenticated', Boolean(currentUser));
        const text = button.querySelector('.sr-only');
        if (text) text.textContent = label;
    }

    $('account-btn').addEventListener('click', () => open());
    $('login-mode-btn').addEventListener('click', () => setAuthMode('login'));
    $('signup-mode-btn').addEventListener('click', () => setAuthMode('signup'));
    phoneInput.addEventListener('input', () => {
        phoneInput.value = normalizeAuthPhoneDigits(phoneInput.value);
        if (phoneInput.value.length === 0) {
            setAuthPhoneInvalid(false);
            if (message.textContent === t('phoneError')) clearMessage(message);
            return;
        }
        const hasInvalidStart = !/^[97]\d{0,7}$/.test(phoneInput.value);
        setAuthPhoneInvalid(hasInvalidStart);
        if (hasInvalidStart) {
            showMessage(message, t('phoneError'), true);
        } else if (message.textContent === t('phoneError')) {
            clearMessage(message);
        }
    });
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
    window.addEventListener('eventQrLanguageChange', applyAccountLanguage);

    applyAccountLanguage();

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
        setLanguage: applyAccountLanguage,
        isAuthenticated: () => Boolean(currentUser),
        refreshOrders: () => {
            ordersLoaded = false;
            if (currentUser && ordersPanel && !ordersPanel.classList.contains('hidden')) {
                loadOrders(true);
            }
        }
    };
})();
