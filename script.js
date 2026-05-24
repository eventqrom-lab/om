function convertToEnglish(str) {
    if (!str) return str;
    const arabicDigits = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    for (let i = 0; i < 10; i++) {
        str = str.replace(arabicDigits[i], i).replace(persianDigits[i], i);
    }
    return str;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
        .then(registrations => registrations.forEach(registration => registration.unregister()))
        .catch(() => {});
}

const translations = {
    ar: {
        navHome: "الرئيسية",
        navOffers: "للطلب",
        navInquiry: "للاستفسار",
        heroTitleStart: "دعوات رقمية ذكية",
        heroTitleHighlight: " بتقنية QR",
        heroDesc: "ارتقِ بمناسبتك مع دعوات عصرية ومبتكرة تليق بضيوفك. تصميم أنيق، تنظيم سلس، وتجربة لا تُنسى.",
        btnOffers: "اطلب الان",
        btnContact: "تواصل معنا",
        mockupTitle: "دعوة زفاف",
        mockupNames: "أحمد و سارة",
        mockupScan: "امسح الرمز للدخول",
        offersTitle: "للطلب",
        offersDesc: "اختر الكمية وأضف لمستك الخاصة بتصميم يعكس ذوقك الراقي",
        calcQuantityLabel: "عدد البطاقات المطلوبة",
        calcQuantityPlaceholder: "أدخل العدد (الأدنى 30)",
        calcCustomDesignLabel: "إضافة تصميم مخصص",
        perCard: "للبطاقة الواحدة",
        calcMinWarning: "أقل عدد للطلب هو 30 بطاقة وأقصى عدد هو 1000",
        calcMaxWarning: "أقصى عدد للطلب هو 1000 بطاقة",
        calcUnitPriceLabel: "سعر الوحدة:",
        calcTotalPriceLabel: "إجمالي قيمة الطلب:",
        calcOrderBtn: "اطلب الآن",
        calcMsgWithDesign: "مع تصميم مخصص",
        calcMsgWithoutDesign: "بدون تصميم مخصص",
        currency: `<img src="images/IMG_1248 (2).png" alt="ر.ع" style="height: 1.35em; vertical-align: -0.2em;">`,
        inquiryTitle: "للاستفسار",
        inquiryDesc: "نسعد بتواصلكم معنا لتلبية احتياجات مناسباتكم. فريقنا جاهز لخدمتكم.",
        labelName: "الاسم",
        phName: "الاسم الكامل",
        labelPhone: "رقم الجوال",
        phPhone: "أدخل رقم الجوال",
        labelEventType: "نوع المناسبة",
        optSelect: "اختر نوع المناسبة",
        optWedding: "زفاف",
        optBirthday: "عيد ميلاد",
        optParty: "حفلة خاصة",
        optBusiness: "فعالية أعمال",
        optConference: "مؤتمر خاص",
        optOther: "أخرى",
        labelInvitationSize: "مقاس بطاقة الدعوة",
        optSelectSize: "اختر الحجم",
        labelInvitationType: "نوع الدعوة",
        optSelectType: "اختر النوع",
        optDigital: "دعوة إلكترونية",
        optPrinted: "دعوة مطبوعة",
        printedFeeNote: "يوجد رسوم للطباعه",
        printedSmallSizeFee: "(+0.050 للبطاقة)",
        printedLargeSizeFee: "(+0.070 للبطاقة)",
        labelDesignType: "نوع التصميم",
        optReadyTemplate: "نموذج جاهز",
        optCustomDesign: `تصميم مخصص <span class="price-tag price-tag-stacked"><span>+0.040 ر.ع للبطاقة</span></span>`,
        optCustomDesignText: "تصميم مخصص",
        customDesignPrice: "+0.040 ر.ع للبطاقة",
        templateGalleryTitle: "اختر نموذجاً من القائمة",
        selectSizeFirst: "يرجى اختيار مقاس الدعوة لعرض النماذج المناسبة",
        templatesComingSoon: "سيتم إضافة النماذج قريباً",
        labelSecurity: "موظف سكيورتي",
        securityPriceNote: "+25.000 ريال عماني",
        calcSecurityLabel: "رسوم السكيورتي:",
        labelEventDate: "تاريخ المناسبة",
        labelGuests: "عدد الدعوات المتوقع",
        phGuests: "مثال: 100",
        labelMessage: "الرسالة (اختياري)",
        phMessage: "يرجى تزويدنا بتفاصيل التصميم أو الألوان المناسبة، ويمكنك إرسال نموذج التصميم الذي تحتاجه عبر الواتساب.",
        btnSubmit: "إرسال الطلب",
        btnSending: "جاري الإرسال...",
        msgSuccess: "تم إرسال طلبك بنجاح! رقم طلبك هو: <br><strong style='font-size: 1.2em; color: var(--primary-color); display: block; margin: 10px 0;'>{orderId}</strong> سنتواصل معك قريباً لتأكيد الطلب.",
        btnWhatsapp: "تواصل عبر واتساب",
        btnInstagram: "تواصل عبر انستجرام",
        faqTitle: "الأسئلة الشائعة",
        faqQ1: "هل يمكن مشاركة بطاقة الـ QR مع أكثر من شخص؟",
        faqA1: "لا، كل رمز QR يتم إنشاؤه بشكل فريد ومخصص لدخول واحد فقط، لضمان تجربة دخول آمنة ومنظمة لجميع الضيوف.",
        faqQ2: "هل يمكن طلب تصميم مخصص؟",
        faqA2: "نعم، يمكنك إضافة تصميم مخصص مقابل 0.040 ر.ع لكل بطاقة، لنقدّم لك بطاقة QR بتصميم أنيق يعكس هوية مناسبتك بأسلوب راقٍ واحترافي، مع لمسات مميزة تضيف تجربة دخول أكثر فخامة وتنظيماً لضيوفك.",
        faqQ3: "هل يمكن استلام الطلب قبل ٧ أيام؟",
        faqA3: "يعتمد وقت التجهيز على الكمية المطلوبة والتعديلات الخاصة بالتصميم، ولكن في حال عدم وجود ضغط على الطلبات قد يتم تجهيز طلبك قبل المدة المحددة. وفي حال الانتهاء من التجهيز مبكراً، سيتم التواصل معك مباشرة لإبلاغك بموعد الاستلام.",
        footerBrand: "Event QR Tech Tricks",
        footerDesc: "الحل الأمثل لدعوات عصرية وذكية تليق بضيوفك.",
        quickLinks: "روابط سريعة",
        copyright: "&copy; 2026 Event QR Tech Tricks. جميع الحقوق محفوظة.",
        labelLetters: "إضافة أحرف (مخصص للزفاف)",
        labelWeddingPersonalization: "تفاصيل بطاقة الزفاف",
        optWeddingLetters: "أحرف",
        optWeddingNames: "أسماء",
        optLetter1: "الحرف الأول",
        optLetter2: "الحرف الثاني",
        phWeddingName1: "الاسم الأول",
        phWeddingName2: "الاسم الثاني",
        labelAddTime: "إضافة الوقت",
        labelEventTime: "وقت المناسبة",
        timeAM: "صباحاً",
        timePM: "مساءً",
        currencyShort: "ر.ع",
        valLetters: "الرجاء اختيار الحرفين بوضوح",
        valRequiredOptions: "يرجى اختيار خيار واحد من كل قسم: نوع الدعوة، مقاس بطاقة الدعوة، ونوع التصميم.",
        showcaseTitle: "نماذج من بطاقاتنا",
        showcaseDesc: "تصاميم رقمية أنيقة مع QR مخصص لكل مناسبة",
        cardAlt1: "نموذج بطاقة دعوة رقمية 1",
        cardAlt2: "نموذج بطاقة دعوة رقمية 2",
        dateNote: "يشترط عند طلب بطاقة دعوة مطبوعة أن يتم تقديم الطلب قبل موعد استلام البطاقة بما لا يقل عن سبعة أيام",
        dateDayLabel: "اليوم:",
        dateMonthLabel: "الشهر:",
        dateYearLabel: "السنة:",
        customDesignNote: "يمكنك وصف التصميم الذي تريده، أو إرسال نموذج مشابه لنصممه لك.",
        calcBasePriceLabel: "قيمة الباقة الأساسية:",
        calcPrintingPriceLabel: "سعر الطباعه:",
        calcDesignPriceLabel: "رسوم التصميم:",
        calcDeliveryLabel: "رسوم التوصيل:",
        calcFree: "0.000",
        freeBadge: "مجاناً",
        pdfTitle: "فاتورة طلب بطاقات",
        pdfCustomerInfo: "بيانات العميل:",
        pdfLabelName: "الاسم:",
        pdfLabelPhone: "الجوال:",
        pdfLabelEvent: "المناسبة:",
        pdfLabelDate: "التاريخ:",
        pdfLabelTime: "الوقت:",
        pdfLabelColor: "اللون:",
        pdfLabelLetters: "الأحرف:",
        pdfEventDetails: "تفاصيل المناسبة:",
        pdfCostSummary: "ملخص التكلفة:",
        pdfTableHeaderItem: "البند",
        pdfTableHeaderDetail: "التفاصيل",
        pdfTableHeaderPrice: "السعر",
        pdfRowCards: "سعر البطاقات",
        pdfRowDesign: "تصميم مخصص",
        pdfRowDelivery: "سعر التوصيل",
        pdfTotalLabel: "الإجمالي الكلي:",
        pdfYes: "نعم",
        pdfNo: "لا",
        discount15: "خصم 15%",
        discount25: "خصم 25%",
        discount40: "خصم 40%",
        discount50: "خصم 50%",
        invoiceTitle: "ملخص الطلب",
        invoiceThanks: "شكراً لاختيارك لنا",
        invoiceOrderID: "رقم الطلب:",
        invoiceCustomer: "اسم العميل:",
        invoicePhone: "رقم الهاتف:",
        invoiceEvent: "المناسبة:",
        invoiceDate: "التاريخ:",
        invoiceTime: "الوقت:",
        invoiceQuantity: "الكمية:",
        invoiceDesign: "التصميم:",
        invoiceTotal: "المبلغ الإجمالي:",
        invoiceMessage: "سيتم التواصل معك قريباً على رقم هاتفك لتأكيد التفاصيل النهائية.",
        btnNewOrder: "طلب جديد",
        btnCopyOrderId: "نسخ رقم الطلب",
        btnCopiedOrderId: "تم النسخ",
        copyOrderIdFailed: "تعذر النسخ"
    },
    en: {
        navHome: "Home",
        navOffers: "Order",
        navInquiry: "Inquiry",
        heroTitleStart: "Smart Digital Invitations",
        heroTitleHighlight: "with QR Technology",
        heroDesc: "Elevate your event with modern and innovative invitations. Elegant design, seamless organization, and an unforgettable experience.",
        btnOffers: "Order Now",
        btnContact: "Contact Us",
        mockupTitle: "Wedding Invitation",
        mockupNames: "Ahmed & Sarah",
        mockupScan: "Scan to enter",
        offersTitle: "Order",
        offersDesc: "Choose the quantity and add your personal touch with a design that reflects your refined taste.",
        calcQuantityLabel: "Total Cards Requested",
        calcQuantityPlaceholder: "Enter quantity (Min 30)",
        calcCustomDesignLabel: "Add Custom Design",
        perCard: "per unit",
        calcMinWarning: "Minimum order is 30 units, maximum is 1000",
        calcMaxWarning: "Maximum order is 1000 units",
        calcUnitPriceLabel: "Unit Price:",
        calcTotalPriceLabel: "Total Project Value:",
        calcOrderBtn: "Order Now",
        calcMsgWithDesign: "with custom design",
        calcMsgWithoutDesign: "without custom design",
        currency: `<img src="images/IMG_1248 (2).png" alt="OMR" style="height: 1.35em; vertical-align: -0.2em;">`,
        inquiryTitle: "For Inquiries",
        inquiryDesc: "We are happy to hear from you and meet your event needs. Our team is ready to serve you.",
        labelName: "Name",
        phName: "Full Name",
        labelPhone: "Phone Number",
        phPhone: "Enter Phone Number",
        labelEventType: "Event Type",
        optSelect: "Select Event Type",
        optWedding: "Wedding",
        optBirthday: "Birthday",
        optParty: "Private Party",
        optBusiness: "Business Event",
        optConference: "Private Conference",
        optOther: "Other",
        labelInvitationSize: "Invitation Card Size",
        optSelectSize: "Select Size",
        labelInvitationType: "Invitation Type",
        optSelectType: "Select Type",
        optDigital: "Digital Invitation",
        optPrinted: "Printed Invitation",
        printedFeeNote: "Printing fees apply",
        printedSmallSizeFee: "(+0.050 per card)",
        printedLargeSizeFee: "(+0.070 per card)",
        labelDesignType: "Design Type",
        optReadyTemplate: "Ready Template",
        optCustomDesign: `Custom Design <span class="price-tag price-tag-stacked"><span>+0.040 OMR</span><span>per card</span></span>`,
        optCustomDesignText: "Custom Design",
        customDesignPrice: "+0.040 OMR per card",
        templateGalleryTitle: "Choose a template from the list",
        selectSizeFirst: "Please select an invitation size to view suitable templates",
        templatesComingSoon: "Templates will be added soon",
        labelSecurity: "Security Staff",
        securityPriceNote: "+25.000 OMR",
        calcSecurityLabel: "Security Fee:",
        labelEventDate: "Event Date",
        labelGuests: "Expected Number of Invitations",
        phGuests: "e.g. 100",
        labelMessage: "Message (Optional)",
        phMessage: "Please share the design details or suitable colors for the event. You may send a sample via WhatsApp.",
        btnSubmit: "Submit Request",
        btnSending: "Sending...",
        msgSuccess: "Your request has been sent successfully! Your order number is: <br><strong style='font-size: 1.2em; color: var(--primary-color); display: block; margin: 10px 0;'>{orderId}</strong> We will contact you soon to confirm.",
        btnWhatsapp: "Contact via WhatsApp",
        btnInstagram: "Contact via Instagram",
        faqTitle: "Frequently Asked Questions",
        faqQ1: "Can the QR card be shared with more than one person?",
        faqA1: "No, each QR code is generated uniquely and assigned for one entry only, ensuring a secure and organized entry experience for all guests.",
        faqQ2: "Can the design be customized?",
        faqA2: "Yes, you can add a custom design for 0.040 OMR per card. We will create an elegant QR card that reflects your event identity in a refined and professional style, with distinctive touches that make the entry experience more luxurious and organized for your guests.",
        faqQ3: "Can the order be received before 7 days?",
        faqA3: "The preparation time depends on the requested quantity and design adjustments. If there is no high order volume, your order may be prepared before the specified period. If it is completed early, we will contact you directly to inform you of the pickup time.",
        footerBrand: "Event QR Tech Tricks",
        footerDesc: "The perfect solution for modern and smart invitations worthy of your guests.",
        quickLinks: "Quick Links",
        copyright: "&copy; 2026 Event QR Tech Tricks. All rights reserved.",
        labelLetters: "Add Letters (For Weddings)",
        labelWeddingPersonalization: "Wedding Card Details",
        optWeddingLetters: "Letters",
        optWeddingNames: "Names",
        optLetter1: "First Letter",
        optLetter2: "Second Letter",
        phWeddingName1: "First Name",
        phWeddingName2: "Second Name",
        labelAddTime: "Add Time",
        labelEventTime: "Event Time",
        timeAM: "AM",
        timePM: "PM",
        currencyShort: "OMR",
        valLetters: "Please select both letters clearly",
        valRequiredOptions: "Please select one option from each section: invitation type, card size, and design type.",
        showcaseTitle: "Samples of Our Cards",
        showcaseDesc: "Elegant digital designs with QR codes for every occasion",
        cardAlt1: "Digital invitation card sample 1",
        cardAlt2: "Digital invitation card sample 2",
        dateNote: "The event date must be seven days or more after submitting the order",
        dateDayLabel: "Day:",
        dateMonthLabel: "Month:",
        dateYearLabel: "Year:",
        customDesignNote: "You can describe the design you want, or send a similar sample for us to design.",
        calcBasePriceLabel: "Base Package Value:",
        calcPrintingPriceLabel: "Printing Price:",
        calcDesignPriceLabel: "Design Fee:",
        calcDeliveryLabel: "Delivery Fee:",
        calcFree: "0.000",
        freeBadge: "Free",
        pdfTitle: "Order Invoice",
        pdfCustomerInfo: "Customer Information:",
        pdfLabelName: "Name:",
        pdfLabelPhone: "Phone:",
        pdfLabelEvent: "Event:",
        pdfLabelDate: "Date:",
        pdfLabelTime: "Time:",
        pdfLabelColor: "Color:",
        pdfLabelLetters: "Letters:",
        pdfEventDetails: "Event Details:",
        pdfCostSummary: "Cost Summary:",
        pdfTableHeaderItem: "Item",
        pdfTableHeaderDetail: "Details",
        pdfTableHeaderPrice: "Price",
        pdfRowCards: "Cards Price",
        pdfRowDesign: "Custom Design",
        pdfRowDelivery: "Delivery Fee",
        pdfTotalLabel: "Total Amount:",
        pdfYes: "Yes",
        pdfNo: "No",
        discount15: "15% Discount",
        discount25: "25% Discount",
        discount40: "40% Discount",
        discount50: "50% Discount",
        invoiceTitle: "Order Summary",
        invoiceThanks: "Thank you for choosing us",
        invoiceOrderID: "Order ID:",
        invoiceCustomer: "Customer:",
        invoicePhone: "Phone:",
        invoiceEvent: "Event:",
        invoiceDate: "Date:",
        invoiceTime: "Time:",
        invoiceQuantity: "Quantity:",
        invoiceDesign: "Design:",
        invoiceTotal: "Total Amount:",
        invoiceMessage: "We will contact you soon on your phone to confirm final details.",
        btnNewOrder: "New Order",
        btnCopyOrderId: "Copy Order ID",
        btnCopiedOrderId: "Copied",
        copyOrderIdFailed: "Copy failed"
    }
};

let currentLang = 'ar';

const templates = {
    "9x5.5cm": [], // e.g. { id: "T001", src: "images/templates/9x5.5/T001.jpg" }
    "9x16cm": []
};

const monthNames = {
    ar: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

const weddingLetterOptions = {
    ar: ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"],
    en: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
};

function getWeddingLetterIndex(select) {
    if (!select || !select.value) return -1;

    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption && selectedOption.dataset.letterIndex) {
        return Number(selectedOption.dataset.letterIndex);
    }

    for (const letters of Object.values(weddingLetterOptions)) {
        const index = letters.indexOf(select.value);
        if (index !== -1) return index;
    }

    return -1;
}

function refreshWeddingLetterOptions() {
    const letterSelects = [
        { element: document.getElementById('letter-1'), placeholderKey: 'optLetter1' },
        { element: document.getElementById('letter-2'), placeholderKey: 'optLetter2' }
    ];

    letterSelects.forEach(({ element, placeholderKey }) => {
        if (!element) return;

        const selectedIndex = getWeddingLetterIndex(element);
        element.innerHTML = '';

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.textContent = translations[currentLang][placeholderKey];
        if (selectedIndex === -1) placeholder.selected = true;
        element.appendChild(placeholder);

        weddingLetterOptions[currentLang].forEach((letter, index) => {
            const option = document.createElement('option');
            option.value = letter;
            option.textContent = letter;
            option.dataset.letterIndex = String(index);
            if (index === selectedIndex) option.selected = true;
            element.appendChild(option);
        });
    });
}

function setLanguage(lang) {
    currentLang = lang;

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all translatable text
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Update alt tags for images
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (translations[lang][key]) {
            element.alt = translations[lang][key];
        }
    });

    // Update titles for tooltips (color swatches)
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[lang][key]) {
            element.title = translations[lang][key];
        }
    });

    // Update active state of language buttons
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
        langBtn.textContent = lang === 'ar' ? 'English' : 'عربي';
    }

    if (typeof window.refreshMonthOptions === 'function') {
        window.refreshMonthOptions();
    }

    refreshWeddingLetterOptions();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    setLanguage(currentLang);

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        const phoneGroup = phoneInput.closest('.input-group-with-prefix');
        const updatePhoneState = () => {
            const phoneValue = convertToEnglish(phoneInput.value);
            const hasInvalidValue = phoneValue.length > 0 && !/^[97]\d{0,7}$/.test(phoneValue);
            phoneInput.classList.toggle('invalid-input', hasInvalidValue);
            if (phoneGroup) {
                phoneGroup.classList.toggle('phone-invalid', hasInvalidValue);
            }
        };

        phoneInput.addEventListener('input', updatePhoneState);
        updatePhoneState();
    }

    // Language switcher event
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const contactHeroBtn = document.querySelector('[data-i18n="btnContact"][href="#contact"]');
    const contactCard = document.querySelector('#contact .contact-info');
    if (contactHeroBtn && contactCard) {
        contactHeroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion (if we want them expandable later, but for minimal let's keep them static or add simple toggle)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const icon = q.querySelector('.faq-icon');

            // Close others
            faqQuestions.forEach(otherQ => {
                if (otherQ !== q) {
                    otherQ.nextElementSibling.style.maxHeight = null;
                    otherQ.classList.remove('active');
                    const otherIcon = otherQ.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                q.classList.remove('active');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                q.classList.add('active');
                if (icon) icon.style.transform = 'rotate(45deg)';
            }
        });
    });

    // Conditional logic for Add Letters
    const eventTypeSelect = document.getElementById('event-type');
    const lettersGroup = document.getElementById('letters-group');
    const weddingLettersRadio = document.getElementById('wedding-letters');
    const weddingNamesRadio = document.getElementById('wedding-names');
    const weddingLettersFields = document.getElementById('wedding-letters-fields');
    const weddingNamesFields = document.getElementById('wedding-names-fields');
    const letter1 = document.getElementById('letter-1');
    const letter2 = document.getElementById('letter-2');
    const weddingName1 = document.getElementById('wedding-name-1');
    const weddingName2 = document.getElementById('wedding-name-2');

    if (eventTypeSelect && lettersGroup) {
        function updateWeddingDetailFields() {
            const useLetters = weddingLettersRadio && weddingLettersRadio.checked;
            const useNames = weddingNamesRadio && weddingNamesRadio.checked;

            if (weddingLettersFields) weddingLettersFields.classList.toggle('hidden', !useLetters);
            if (weddingNamesFields) weddingNamesFields.classList.toggle('hidden', !useNames);

            if (letter1 && letter2) {
                letter1.toggleAttribute('required', useLetters);
                letter2.toggleAttribute('required', useLetters);
                if (!useLetters) {
                    letter1.value = '';
                    letter2.value = '';
                }
            }

            if (weddingName1 && weddingName2) {
                weddingName1.toggleAttribute('required', useNames);
                weddingName2.toggleAttribute('required', useNames);
                if (!useNames) {
                    weddingName1.value = '';
                    weddingName2.value = '';
                }
            }
        }

        function updateWeddingOptions() {
            const isWedding = eventTypeSelect.value === 'زفاف';
            const customDesignRadio = document.getElementById('design-custom');
            const isCustomDesign = customDesignRadio && customDesignRadio.checked;
            const shouldShowWeddingDetails = isWedding && !isCustomDesign;

            if (shouldShowWeddingDetails) {
                lettersGroup.classList.remove('hidden');
                if (weddingLettersRadio) weddingLettersRadio.setAttribute('required', 'required');
                if (weddingNamesRadio) weddingNamesRadio.setAttribute('required', 'required');
            } else {
                lettersGroup.classList.add('hidden');
                if (weddingLettersRadio) {
                    weddingLettersRadio.removeAttribute('required');
                    weddingLettersRadio.checked = false;
                }
                if (weddingNamesRadio) {
                    weddingNamesRadio.removeAttribute('required');
                    weddingNamesRadio.checked = false;
                }
            }

            updateWeddingDetailFields();
        }

        // Initial setup on load
        updateWeddingOptions();

        eventTypeSelect.addEventListener('change', () => {
            updateWeddingOptions();
        });

        document.querySelectorAll('input[name="نوع_التصميم"]').forEach((radio) => {
            radio.addEventListener('change', updateWeddingOptions);
        });

        [weddingLettersRadio, weddingNamesRadio].forEach((radio) => {
            if (radio) radio.addEventListener('change', updateWeddingDetailFields);
        });
    }

    const invitationSizeInputs = document.querySelectorAll('input[name="حجم_الدعوة"]');
    const invitationTypeInputs = document.querySelectorAll('input[name="نوع_الدعوة"]');
    const printedSizePrices = document.querySelectorAll('.printed-size-price');
    const designReadyRadio = document.getElementById('design-ready');
    const designCustomRadio = document.getElementById('design-custom');
    const templateGallery = document.getElementById('template-gallery');
    const templateGrid = document.getElementById('template-grid');
    const selectSizeFirstMsg = document.getElementById('select-size-first-msg');
    const selectedTemplateInput = document.getElementById('selected-template');
    const customDesignNote = document.getElementById('custom-design-note');
    const templateLightbox = document.getElementById('template-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    function updatePrintedSizePrices() {
        const selectedInvitationType = document.querySelector('input[name="نوع_الدعوة"]:checked');
        const isPrinted = selectedInvitationType && selectedInvitationType.value === 'دعوة مطبوعة';

        printedSizePrices.forEach((price) => {
            price.classList.toggle('hidden', !isPrinted);
        });
    }

    invitationTypeInputs.forEach((input) => {
        input.addEventListener('change', updatePrintedSizePrices);
    });
    updatePrintedSizePrices();

    function openTemplateLightbox(src) {
        if (!templateLightbox || !lightboxImage || !src) return;
        lightboxImage.src = src;
        templateLightbox.classList.add('active');
        templateLightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    }

    function closeTemplateLightbox() {
        if (!templateLightbox || !lightboxImage) return;
        templateLightbox.classList.remove('active');
        templateLightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        document.body.classList.remove('lightbox-open');
    }

    function renderTemplates() {
        if (!templateGallery || !templateGrid || !selectSizeFirstMsg) return;

        const selectedSizeInput = document.querySelector('input[name="حجم_الدعوة"]:checked');
        const size = selectedSizeInput ? selectedSizeInput.value : "";
        if (selectedTemplateInput) selectedTemplateInput.value = "";
        templateGrid.innerHTML = "";

        if (!size) {
            templateGrid.classList.add('hidden');
            selectSizeFirstMsg.classList.remove('hidden');
            return;
        }

        const sizeTemplates = templates[size] || [];
        templateGrid.classList.remove('hidden');
        selectSizeFirstMsg.classList.add('hidden');

        if (sizeTemplates.length === 0) {
            const placeholder = document.createElement('p');
            placeholder.className = 'template-size-msg';
            placeholder.textContent = translations[currentLang].templatesComingSoon;
            templateGrid.appendChild(placeholder);
            return;
        }

        sizeTemplates.forEach((template) => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.dataset.templateId = template.id;

            const image = document.createElement('img');
            image.src = template.src;
            image.alt = `${currentLang === 'ar' ? 'نموذج' : 'Template'} #${template.id}`;

            const label = document.createElement('span');
            label.textContent = `${currentLang === 'ar' ? 'نموذج' : 'Template'} #${template.id}`;

            card.appendChild(image);
            card.appendChild(label);

            card.addEventListener('click', () => {
                templateGrid.querySelectorAll('.template-card').forEach((item) => item.classList.remove('selected'));
                card.classList.add('selected');
                if (selectedTemplateInput) selectedTemplateInput.value = template.id;
                openTemplateLightbox(template.src);
            });

            templateGrid.appendChild(card);
        });
    }

    function syncDesignType() {
        const calcDesignToggle = document.getElementById('calc-design');
        const isCustom = designCustomRadio && designCustomRadio.checked;
        const isReady = designReadyRadio && designReadyRadio.checked;

        if (calcDesignToggle) {
            calcDesignToggle.checked = isCustom;
            calcDesignToggle.value = isCustom ? "1" : "0";
            calcDesignToggle.dispatchEvent(new Event('change'));
        }

        if (customDesignNote) customDesignNote.classList.toggle('hidden', !isCustom);
        if (templateGallery) templateGallery.classList.toggle('hidden', !isReady);
        if (isReady) renderTemplates();
    }

    [designReadyRadio, designCustomRadio].forEach((radio) => {
        if (radio) radio.addEventListener('change', syncDesignType);
    });

    invitationSizeInputs.forEach((input) => {
        input.addEventListener('change', () => {
            if (designReadyRadio && designReadyRadio.checked) renderTemplates();
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeTemplateLightbox);
    if (templateLightbox) {
        templateLightbox.addEventListener('click', (event) => {
            if (event.target === templateLightbox) closeTemplateLightbox();
        });
    }

    function getCryptoRandomValues(length) {
        const values = new Uint32Array(length);
        if (window.crypto && window.crypto.getRandomValues) {
            window.crypto.getRandomValues(values);
        } else {
            for (let i = 0; i < length; i++) {
                values[i] = Math.floor(Math.random() * 0xFFFFFFFF);
            }
        }
        return values;
    }

    function createShortOrderId() {
        const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const timePart = Date.now().toString(36).toUpperCase().slice(-7);
        const randomValues = getCryptoRandomValues(7);
        let randomPart = '';

        for (let i = 0; i < randomValues.length; i++) {
            randomPart += alphabet[randomValues[i] % alphabet.length];
        }

        return `${timePart}${randomPart}`.slice(0, 14);
    }

    function rememberOrderId(orderId) {
        const storageKey = 'eventQrOrderIds';
        const savedIds = JSON.parse(localStorage.getItem(storageKey) || '[]').slice(-200);
        savedIds.push(orderId);
        localStorage.setItem(storageKey, JSON.stringify(savedIds));
    }

    function wasOrderIdUsed(orderId) {
        const storageKey = 'eventQrOrderIds';
        const savedIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
        return savedIds.includes(orderId);
    }

    function generateOrderNumber() {
        let orderId = createShortOrderId();

        while (wasOrderIdUsed(orderId)) {
            orderId = createShortOrderId();
        }

        rememberOrderId(orderId);
        return orderId;
    }

    function copyTextToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.top = '-999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();

        return new Promise((resolve, reject) => {
            try {
                document.execCommand('copy') ? resolve() : reject();
            } catch (error) {
                reject(error);
            } finally {
                document.body.removeChild(textArea);
            }
        });
    }

    function bindCopyOrderButton(orderId) {
        const copyBtn = document.getElementById('copy-order-id');
        const copyText = copyBtn ? copyBtn.querySelector('.copy-text') : null;
        if (!copyBtn || !copyText) return;

        copyBtn.addEventListener('click', () => {
            copyTextToClipboard(`#${orderId}`)
                .then(() => {
                    copyBtn.classList.add('copied');
                    copyText.textContent = translations[currentLang].btnCopiedOrderId;
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyText.textContent = translations[currentLang].btnCopyOrderId;
                    }, 1800);
                })
                .catch(() => {
                    copyText.textContent = translations[currentLang].copyOrderIdFailed;
                    setTimeout(() => {
                        copyText.textContent = translations[currentLang].btnCopyOrderId;
                    }, 1800);
                });
        });
    }

    // Hide today and tomorrow from the event date selectors.
    const daySelect = document.getElementById('event-day');
    const monthSelect = document.getElementById('event-month');
    const yearSelect = document.getElementById('event-year');

    if (daySelect && monthSelect && yearSelect) {
        function getMinAllowedDate() {
            const date = new Date();
            date.setDate(date.getDate() + 2);
            date.setHours(0, 0, 0, 0);
            return date;
        }

        function populateYears() {
            const minAllowed = getMinAllowedDate();
            const selectedYear = yearSelect.value;
            const startYear = new Date().getFullYear();
            const endYear = startYear + 7;

            yearSelect.innerHTML = '';
            for (let year = startYear; year <= endYear; year++) {
                const opt = document.createElement('option');
                opt.value = year;
                opt.textContent = year;
                yearSelect.appendChild(opt);
            }

            if (selectedYear && Number(selectedYear) >= startYear && Number(selectedYear) <= endYear) {
                yearSelect.value = selectedYear;
            } else {
                yearSelect.value = startYear;
            }
        }

        function populateMonths() {
            const minAllowed = getMinAllowedDate();
            const selectedMonth = monthSelect.value;
            const selectedYear = Number(yearSelect.value);
            const startMonth = selectedYear === minAllowed.getFullYear() ? minAllowed.getMonth() + 1 : 1;

            monthSelect.innerHTML = '';
            for (let month = startMonth; month <= 12; month++) {
                const opt = document.createElement('option');
                const val = String(month).padStart(2, '0');
                opt.value = val;
                opt.textContent = monthNames[currentLang][month - 1];
                monthSelect.appendChild(opt);
            }

            if (selectedMonth && Number(selectedMonth) >= startMonth) {
                monthSelect.value = selectedMonth;
            } else {
                monthSelect.value = String(startMonth).padStart(2, '0');
            }
        }

        function updateDays() {
            const minAllowed = getMinAllowedDate();
            const selectedYear = Number(yearSelect.value);
            const selectedMonth = Number(monthSelect.value);
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            const currentDay = daySelect.value;
            const startDay = selectedYear === minAllowed.getFullYear() && selectedMonth === minAllowed.getMonth() + 1
                ? minAllowed.getDate()
                : 1;

            daySelect.innerHTML = '';
            for (let day = startDay; day <= daysInMonth; day++) {
                const opt = document.createElement('option');
                const val = String(day).padStart(2, '0');
                opt.value = val;
                opt.textContent = val;
                daySelect.appendChild(opt);
            }

            if (currentDay && Number(currentDay) >= startDay && Number(currentDay) <= daysInMonth) {
                daySelect.value = currentDay;
            } else {
                daySelect.value = String(startDay).padStart(2, '0');
            }
        }

        function refreshDateSelectors() {
            populateYears();
            populateMonths();
            updateDays();
        }

        window.refreshMonthOptions = () => {
            populateMonths();
            updateDays();
        };

        yearSelect.addEventListener('change', () => {
            populateMonths();
            updateDays();
        });
        monthSelect.addEventListener('change', updateDays);

        refreshDateSelectors();
    }

    // Date Toggle Logic
    const toggleDate = document.getElementById('toggle-date');
    const dateGroup = document.getElementById('date-group');

    if (toggleDate && dateGroup && daySelect && monthSelect && yearSelect) {
        function setDateFieldsEnabled(isEnabled) {
            dateGroup.classList.toggle('hidden', !isEnabled);
            [daySelect, monthSelect, yearSelect].forEach((select) => {
                select.disabled = !isEnabled;
                select.required = isEnabled;
            });
        }

        setDateFieldsEnabled(toggleDate.checked);
        toggleDate.addEventListener('change', (e) => {
            setDateFieldsEnabled(e.target.checked);
        });
    }


    // Time Selection Logic
    const hourSelect = document.getElementById('event-hour');
    const minuteSelect = document.getElementById('event-minute');
    const ampmSelect = document.getElementById('event-ampm');
    const formatToggle = document.getElementById('toggle-format');
    const formatLabel = document.getElementById('format-label');

    function populateHours() {
        if (!hourSelect) return;
        const is24h = formatToggle.checked;
        const currentVal = hourSelect.value;
        hourSelect.innerHTML = '';

        const start = is24h ? 0 : 1;
        const end = is24h ? 23 : 12;

        for (let i = start; i <= end; i++) {
            const opt = document.createElement('option');
            const val = i < 10 ? '0' + i : i;
            opt.value = val;
            opt.textContent = val;
            hourSelect.appendChild(opt);
        }

        if (is24h) {
            ampmSelect.classList.add('hidden');
            formatLabel.textContent = '24h';
        } else {
            ampmSelect.classList.remove('hidden');
            formatLabel.textContent = '12h';
        }

        if (currentVal) hourSelect.value = currentVal;
    }

    if (hourSelect && minuteSelect) {
        // Populate Minutes
        for (let i = 0; i < 60; i += 5) {
            const opt = document.createElement('option');
            const val = i < 10 ? '0' + i : i;
            opt.value = val;
            opt.textContent = val;
            minuteSelect.appendChild(opt);
        }
        populateHours();
        formatToggle.addEventListener('change', populateHours);
    }

    // Time Toggle Logic
    const toggleTime = document.getElementById('toggle-time');
    const timeGroup = document.getElementById('time-group');

    if (toggleTime && timeGroup) {
        toggleTime.addEventListener('change', (e) => {
            if (e.target.checked) {
                timeGroup.classList.remove('hidden');
            } else {
                timeGroup.classList.add('hidden');
            }
        });
    }

    // Form Submission Handling
    const inquiryForm = document.getElementById('inquiry-form');
    const formMessage = document.getElementById('form-message');
    const calcQtyInput = document.getElementById('calc-qty');
    const calcDesignToggle = document.getElementById('calc-design');

    if (inquiryForm) {
        const requiredOptionGroups = [
            {
                name: "نوع_الدعوة",
                containerSelector: ".invitation-type-options"
            },
            {
                name: "حجم_الدعوة",
                containerSelector: ".invitation-size-options"
            },
            {
                name: "نوع_التصميم",
                containerSelector: ".design-type-options"
            }
        ];

        function validateRequiredOptionGroups() {
            let firstInvalidGroup = null;

            requiredOptionGroups.forEach((group) => {
                const selected = inquiryForm.querySelector(`input[name="${group.name}"]:checked`);
                const container = inquiryForm.querySelector(group.containerSelector);
                const isInvalid = !selected;

                if (container) {
                    container.classList.toggle('option-group-invalid', isInvalid);
                }

                if (isInvalid && !firstInvalidGroup) {
                    firstInvalidGroup = container;
                }
            });

            if (firstInvalidGroup) {
                if (formMessage) {
                    formMessage.textContent = translations[currentLang].valRequiredOptions;
                    formMessage.classList.remove('hidden');
                    formMessage.classList.add('error');
                }
                firstInvalidGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return false;
            }

            return true;
        }

        function setFormError(message, target) {
            if (formMessage) {
                formMessage.textContent = message;
                formMessage.classList.remove('hidden');
                formMessage.classList.add('error');
            }

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (typeof target.focus === 'function') {
                    target.focus({ preventScroll: true });
                }
            }
        }

        function validateQuantityRange() {
            if (!calcQtyInput) return true;

            const qtyValue = convertToEnglish(calcQtyInput.value.trim());
            const qty = Number(qtyValue);
            const isValidQuantity = /^\d+$/.test(qtyValue) && qty >= 30 && qty <= 1000;

            if (!isValidQuantity) {
                const message = currentLang === 'ar'
                    ? 'أقل عدد للطلب هو 30 بطاقة وأقصى عدد هو 1000'
                    : 'Minimum order is 30 cards and maximum is 1000.';
                const warningText = document.querySelector('#calc-warning span');
                if (warningText) warningText.textContent = message;
                if (calcWarning) calcWarning.classList.remove('hidden');
                if (calcResults) calcResults.classList.add('hidden');
                if (formMessage) {
                    formMessage.classList.add('hidden');
                    formMessage.classList.remove('error');
                    formMessage.textContent = '';
                }
                calcQtyInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                calcQtyInput.focus({ preventScroll: true });
                return false;
            }

            if (calcWarning) calcWarning.classList.add('hidden');
            return true;
        }

        function validatePhoneNumber() {
            const phoneField = document.getElementById('phone');
            if (!phoneField) return true;

            const phoneVal = convertToEnglish(phoneField.value.trim());
            const isValidPhone = /^[97]\d{7}$/.test(phoneVal);
            const phoneGroup = phoneField.closest('.input-group-with-prefix');

            phoneField.classList.toggle('invalid-input', !isValidPhone);
            if (phoneGroup) phoneGroup.classList.toggle('phone-invalid', !isValidPhone);

            if (!isValidPhone) {
                setFormError(
                    currentLang === 'ar'
                        ? 'رقم الجوال يجب أن يكون 8 أرقام ويبدأ بـ 9 أو 7'
                        : 'Phone number must be 8 digits and start with 9 or 7.',
                    phoneField
                );
                return false;
            }

            return true;
        }

        requiredOptionGroups.forEach((group) => {
            inquiryForm.querySelectorAll(`input[name="${group.name}"]`).forEach((input) => {
                input.addEventListener('change', () => {
                    const container = inquiryForm.querySelector(group.containerSelector);
                    if (container) container.classList.remove('option-group-invalid');
                    if (formMessage && formMessage.classList.contains('error')) {
                        formMessage.classList.add('hidden');
                        formMessage.classList.remove('error');
                    }
                });
            });
        });

        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const formMessage = document.getElementById('form-message');

            if (!validateRequiredOptionGroups()) {
                return;
            }

            if (!validateQuantityRange()) {
                return;
            }

            if (!validatePhoneNumber()) {
                return;
            }
            
            // Basic validation check
            if (!inquiryForm.checkValidity()) {
                inquiryForm.reportValidity();
                return;
            }

            submitBtn.textContent = translations[currentLang]['btnSending'];
            submitBtn.disabled = true;

            // Generate Unique Order Number
            const orderId = generateOrderNumber();
            document.getElementById('order-number-input').value = orderId;
            
            // Set dynamic subject
            const subjectInput = document.getElementById('email-subject');
            if (subjectInput) {
                subjectInput.value = `New Order #${orderId}`;
            }

            const formData = new FormData(inquiryForm);
            const rawObject = Object.fromEntries(formData);
            
            // Format specific fields
            let eventDate = "";
            const isDateEnabled = document.getElementById('toggle-date').checked;
            if (isDateEnabled) {
                const eventDay = document.getElementById('event-day').value;
                const eventMonthSelect = document.getElementById('event-month');
                const eventMonth = eventMonthSelect.options[eventMonthSelect.selectedIndex].textContent;
                const eventYear = document.getElementById('event-year').value;
                eventDate = `${eventDay}-${eventMonth}-${eventYear}`;
            } else {
                eventDate = currentLang === 'ar' ? "لم يحدد" : "Not specified";
            }

            let eventTime = "";
            if (document.getElementById('toggle-time').checked) {
                const h = document.getElementById('event-hour').value;
                const m = document.getElementById('event-minute').value;
                const is24h = document.getElementById('toggle-format').checked;
                if (is24h) {
                    eventTime = `${h}:${m}`;
                } else {
                    const ampm = document.getElementById('event-ampm').value;
                    const ampmText = ampm === 'AM' ? translations[currentLang].timeAM : translations[currentLang].timePM;
                    eventTime = `${h}:${m} ${ampmText}`;
                }
            } else {
                eventTime = currentLang === 'ar' ? "لم يحدد" : "Not specified";
            }

            const weddingDetailInput = document.querySelector('input[name="تفاصيل_الزفاف"]:checked');
            const weddingDetailType = weddingDetailInput
                ? (weddingDetailInput.id === 'wedding-letters'
                    ? translations[currentLang].optWeddingLetters
                    : translations[currentLang].optWeddingNames)
                : (currentLang === 'ar' ? "لا يوجد" : "None");
            const l1 = document.getElementById('letter-1').value;
            const l2 = document.getElementById('letter-2').value;
            const name1 = document.getElementById('wedding-name-1').value.trim();
            const name2 = document.getElementById('wedding-name-2').value.trim();
            const selectedLetters = (l1 && l2) ? `${l1} & ${l2}` : (currentLang === 'ar' ? "لا يوجد" : "None");
            const selectedNames = (name1 && name2) ? `${name1} & ${name2}` : (currentLang === 'ar' ? "لا يوجد" : "None");

            const basePackagePrice = document.getElementById('calc-base-price').textContent + " OMR";
            const printingPrice = document.getElementById('calc-printing-price').textContent + " OMR";
            const designPrice = document.getElementById('calc-design-price').textContent + " OMR";
            const finalPrice = document.getElementById('calc-total-price').textContent + " OMR";

            // Create Organized Object for Web3Forms (Labels in Arabic for professional email)
            const organizedObject = {
                "access_key": rawObject["access_key"],
                "subject": `New Order #${orderId}`,
                "from_name": rawObject["from_name"],
                "botcheck": rawObject["botcheck"],
                "---": "---", // Separator
                "رقم_الطلب": orderId,
                "اسم_العميل": rawObject["الاسم_الكامل"],
                "رقم_الجوال": "+968 " + rawObject["رقم_الجوال"],
                "نوع_المناسبة": rawObject["نوع_المناسبة"],
                "تاريخ_المناسبة": eventDate,
                "الوقت": eventTime,
                "تفاصيل_بطاقة_الزفاف": weddingDetailType,
                "الأحرف_المختارة": selectedLetters,
                "الأسماء_المكتوبة": selectedNames,
                "عدد_الوحدات": rawObject["عدد_البطاقات"],
                "حجم_الدعوة": rawObject["حجم_الدعوة"],
                "نوع_الدعوة": rawObject["نوع_الدعوة"],
                "نوع_التصميم": rawObject["نوع_التصميم"],
                "النموذج_المختار": document.getElementById('selected-template').value || (currentLang === 'ar' ? "لا يوجد" : "None"),
                "السكيورتي": document.getElementById('security-toggle').checked ? (currentLang === 'ar' ? "نعم (+25.000 ريال عماني)" : "Yes (+25.000 OMR)") : (currentLang === 'ar' ? "لا" : "No"),
                "قيمة_الباقة_الأساسية": basePackagePrice,
                "سعر_الطباعه": printingPrice,
                "رسوم_التصميم": designPrice,
                "السعر_النهائي": finalPrice,
                "ملاحظات_إضافية": rawObject["ملاحظات_إضافية"] || (currentLang === 'ar' ? "لا يوجد" : "None"),
                "رابط_الفاتورة": "https://eventqrom-lab.github.io/bill/"
            };

            const json = JSON.stringify(organizedObject);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let result = await response.json();
                if (response.status == 200) {
                    const t = translations[currentLang];
                    const thankYouMessage = currentLang === 'ar'
                        ? 'شكرًا لاختيارك متجرنا.<br>نؤكد لك أننا سنقوم بالرد عليك في أقرب وقت ممكن، وسنعمل على تجهيز طلبيتك بكل حرص واهتمام.'
                        : 'Thank you for choosing our store.<br>We confirm that we will respond to you as soon as possible and prepare your order with care and attention.';
                    inquiryForm.innerHTML = `
                        <div class="order-invoice">
                            <div class="invoice-header">
                                <div class="status-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <h3>${currentLang === 'ar' ? 'تم استلام طلبك بنجاح' : 'Your Order Has Been Received'}</h3>
                                <p class="invoice-thanks">${thankYouMessage}</p>
                            </div>
                            
                            <div class="invoice-body">
                                <div class="invoice-main-id">
                                    <span class="label">${t.invoiceOrderID}</span>
                                    <div class="order-id-actions">
                                        <span class="value">#${orderId}</span>
                                        <button type="button" class="copy-order-btn" id="copy-order-id" aria-label="${t.btnCopyOrderId}">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                            <span class="copy-text">${t.btnCopyOrderId}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="invoice-footer">
                                <button onclick="window.location.reload()" class="btn btn-primary">${t.btnNewOrder}</button>
                            </div>
                        </div>
                    `;
                    bindCopyOrderButton(orderId);
                    inquiryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    console.log(response);
                    formMessage.textContent = result.message;
                    formMessage.classList.remove('hidden');
                    formMessage.classList.add('error');
                    submitBtn.textContent = translations[currentLang]['btnSubmit'];
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.log(error);
                formMessage.textContent = currentLang === 'ar' ? "عذراً، حدث خطأ ما." : "Something went wrong!";
                formMessage.classList.remove('hidden');
                formMessage.classList.add('error');
                submitBtn.textContent = translations[currentLang]['btnSubmit'];
                submitBtn.disabled = false;
            });
            // Removed final .then that resets button automatically to prevent duplicate clicks while showing success
        });
    }

    // Calculator Logic
    const calcWarning = document.getElementById('calc-warning');
    const calcResults = document.getElementById('calc-results');
    const calcTotalPriceSpan = document.getElementById('calc-total-price');
    const calcBasePriceSpan = document.getElementById('calc-base-price');
    const calcDesignPriceSpan = document.getElementById('calc-design-price');
    const calcDesignOldPriceSpan = document.getElementById('calc-design-old-price');
    const designDiscountBadge = document.getElementById('design-discount-badge');
    const calcDesignRow = document.getElementById('calc-design-row');
    const calcPrintingRow = document.getElementById('calc-printing-row');
    const calcPrintingPriceSpan = document.getElementById('calc-printing-price');
    const securityToggle = document.getElementById('security-toggle');
    const calcSecurityRow = document.getElementById('calc-security-row');
    const calcSecurityPriceSpan = document.getElementById('calc-security-price');
    const BASE_CARD_PRICE = 0.040;
    const PRINTING_SMALL_PRICE = 0.050;
    const PRINTING_LARGE_PRICE = 0.070;
    const CUSTOM_DESIGN_PRICE = 0.040;
    const SECURITY_PRICE = 25;

    function getSelectedInvitationType() {
        return document.querySelector('input[name="نوع_الدعوة"]:checked');
    }

    function getSelectedInvitationSize() {
        return document.querySelector('input[name="حجم_الدعوة"]:checked');
    }

    function getPrintingUnitPrice() {
        const selectedInvitationType = getSelectedInvitationType();
        const selectedSize = getSelectedInvitationSize();
        const isPrinted = selectedInvitationType && selectedInvitationType.value === 'دعوة مطبوعة';

        if (!isPrinted || !selectedSize) return 0;
        return selectedSize.value === '9x16cm' ? PRINTING_LARGE_PRICE : PRINTING_SMALL_PRICE;
    }

    function updateCalculator() {
        if (!calcQtyInput || !calcDesignToggle) return;

        const qtyValue = convertToEnglish(calcQtyInput.value);
        const qty = parseInt(qtyValue, 10);

        if (!qtyValue || isNaN(qty)) {
            calcWarning.classList.add('hidden');
            calcResults.classList.add('hidden');
            return;
        }

        if (qty < 30 || qty > 1000) {
            calcWarning.classList.remove('hidden');
            calcResults.classList.add('hidden');
            return;
        }

        // Valid quantity
        calcWarning.classList.add('hidden');

        const basePrice = qty * BASE_CARD_PRICE;
        const printingUnitPrice = getPrintingUnitPrice();
        const printingPrice = qty * printingUnitPrice;
        const hasCustomDesign = calcDesignToggle.checked;

        let designPrice = 0;
        let originalDesignPrice = 0;
        let discountPercent = 0;
        let discountKey = "";

        if (hasCustomDesign) {
            originalDesignPrice = qty * CUSTOM_DESIGN_PRICE;

            if (qty >= 500) {
                discountPercent = 0.40;
                discountKey = "discount40";
            } else if (qty >= 300) {
                discountPercent = 0.25;
                discountKey = "discount25";
            } else if (qty >= 200) {
                discountPercent = 0.15;
                discountKey = "discount15";
            }

            designPrice = originalDesignPrice * (1 - discountPercent);
        }

        const hasSecurity = securityToggle && securityToggle.checked;
        const securityPrice = hasSecurity ? SECURITY_PRICE : 0;
        const totalPrice = basePrice + printingPrice + designPrice + securityPrice;

        if (calcBasePriceSpan) calcBasePriceSpan.textContent = basePrice.toFixed(2);
        if (calcPrintingRow) calcPrintingRow.classList.toggle('hidden', printingPrice <= 0);
        if (calcPrintingPriceSpan) calcPrintingPriceSpan.textContent = printingPrice.toFixed(2);

        if (hasCustomDesign) {
            if (calcDesignRow) calcDesignRow.classList.remove('hidden');
            if (calcDesignPriceSpan) calcDesignPriceSpan.textContent = designPrice.toFixed(2);

            if (discountPercent > 0) {
                if (calcDesignOldPriceSpan) {
                    calcDesignOldPriceSpan.textContent = originalDesignPrice.toFixed(2);
                    calcDesignOldPriceSpan.style.display = 'inline';
                }
                if (designDiscountBadge) {
                    designDiscountBadge.classList.remove('hidden');
                    designDiscountBadge.setAttribute('data-i18n', discountKey);
                    designDiscountBadge.textContent = translations[currentLang][discountKey];
                }
            } else {
                if (calcDesignOldPriceSpan) calcDesignOldPriceSpan.style.display = 'none';
                if (designDiscountBadge) designDiscountBadge.classList.add('hidden');
            }
        } else {
            if (calcDesignRow) calcDesignRow.classList.add('hidden');
        }

        if (calcSecurityRow) calcSecurityRow.classList.toggle('hidden', !hasSecurity);
        if (calcSecurityPriceSpan) calcSecurityPriceSpan.textContent = securityPrice.toFixed(3);

        calcTotalPriceSpan.textContent = totalPrice.toFixed(2);
        
        // Sync with hidden input for form submission
        const hiddenPrice = document.getElementById('hidden-total-price');
        if (hiddenPrice) hiddenPrice.value = totalPrice.toFixed(2);

        calcResults.classList.remove('hidden');
    }

    if (calcQtyInput && calcDesignToggle) {
        calcQtyInput.addEventListener('input', updateCalculator);
        calcDesignToggle.addEventListener('change', updateCalculator);
        invitationTypeInputs.forEach((input) => input.addEventListener('change', updateCalculator));
        invitationSizeInputs.forEach((input) => input.addEventListener('change', updateCalculator));
        if (securityToggle) securityToggle.addEventListener('change', updateCalculator);
    }
});
