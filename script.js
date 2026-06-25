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

const omrSymbol = '<img class="omr-symbol" src="images/omr-symbol.png" alt="ريال عماني">';

const translations = {
    ar: {
        pageTitle: "Event QR Tech Tricks | باقات الدعوات",
        pageDescription: "دعوات رقمية ذكية بتقنية QR للمناسبات والبطاقات المطبوعة والإلكترونية.",
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
        currency: "ر.ع",
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
        printedSmallSizeFee: "(+0.050 ر.ع للبطاقة)",
        printedLargeSizeFee: "(+0.100 ر.ع للبطاقة)",
        labelDesignType: "نوع التصميم",
        optReadyTemplate: "نموذج جاهز",
        optCustomDesign: `تصميم مخصص <span class="price-tag price-tag-stacked"><span>+0.040 ر.ع للبطاقة</span></span>`,
        optCustomDesignText: "تصميم مخصص",
        customDesignPrice: "+0.040 ر.ع للبطاقة",
        templateGalleryTitle: "اختر نموذج",
        templateNumberLabel: "رقم:",
        templateInstagramNote: "يمكنكم الاطلاع على صور النماذج عبر حسابنا على إنستغرام.",
        selectSizeFirst: "يرجى اختيار مقاس الدعوة لعرض النماذج المناسبة",
        templatesComingSoon: "سيتم إضافة النماذج قريباً",
        labelSecurity: "حارس أمن",
        securityPriceNote: "+20.000 ر.ع",
        securityDurationNote: "لراحة ضيوفكم وتنظيم دخولهم بكل سلاسة، تشمل خدمة حارس الأمن 4 ساعات، ويمكنكم تمديد الخدمة بكل مرونة مقابل 5.000 ر.ع لكل ساعة إضافية.",
        calcSecurityLabel: "رسوم حارس الأمن:",
        labelEventDate: "تاريخ المناسبة",
        labelGuests: "عدد الدعوات المتوقع",
        phGuests: "مثال: 100",
        labelMessage: "الرسالة (اختياري)",
        phMessage: "يرجى تزويدنا بتفاصيل التصميم أو الألوان المناسبة، ويمكنك إرسال نموذج التصميم الذي تحتاجه عبر الواتساب.",
        btnSubmit: "إرسال الطلب",
        btnSending: "جاري الإرسال...",
        msgSuccess: "تم إرسال طلبك بنجاح! رقم طلبك هو: <br><strong style='font-size: 1.2em; color: var(--primary-color); display: block; margin: 10px 0;'>{orderId}</strong> سنتواصل معك قريباً لتأكيد الطلب.",
        btnWhatsapp: "تواصل عبر واتساب",
        btnInstagram: "تواصل عبر إنستغرام",
        faqTitle: "الأسئلة الشائعة",
        faqQ1: "هل يمكن مشاركة بطاقة الـ QR مع أكثر من شخص؟",
        faqA1: "لا، كل رمز QR يتم إنشاؤه بشكل فريد ومخصص لدخول واحد فقط، لضمان تجربة دخول آمنة ومنظمة لجميع الضيوف.",
        faqQ2: "هل يمكن طلب تصميم مخصص؟",
        faqA2: "نعم، يمكنك إضافة تصميم مخصص مقابل 0.040 ر.ع لكل بطاقة، لنقدّم لك بطاقة QR بتصميم أنيق يعكس هوية مناسبتك بأسلوب راقٍ واحترافي، مع لمسات مميزة تضيف تجربة دخول أكثر فخامة وتنظيماً لضيوفك.",
        faqQ3: "متى يجب تقديم طلب البطاقات المطبوعة؟",
        faqA3: "يجب أن يتم تقديم طلب البطاقات المطبوعة قبل 7 أيام على الأقل من تاريخ المناسبة أو الاستلام.",
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
        labelAddLocation: "إضافة موقع",
        labelEventLocation: "الموقع أو اسم القاعة",
        phEventLocation: "اكتب الموقع أو اسم القاعة",
        timeAM: "صباحاً",
        timePM: "مساءً",
        currencyShort: "ر.ع",
        valLetters: "الرجاء اختيار الحرفين بوضوح",
        valRequiredOptions: "يرجى اختيار خيار واحد من كل قسم: نوع الدعوة، مقاس بطاقة الدعوة، ونوع التصميم.",
        valRequiredField: "يرجى تعبئة جميع الحقول المطلوبة قبل إرسال الطلب.",
        valRequiredTemplate: "يرجى اختيار رقم النموذج المطلوب.",
        valRequiredWeddingDetails: "يرجى اختيار طريقة تخصيص بطاقة الزفاف وتعبئة التفاصيل المطلوبة.",
        showcaseTitle: "نماذج من بطاقاتنا",
        showcaseDesc: "تصاميم رقمية أنيقة مع QR مخصص لكل مناسبة",
        cardAlt1: "نموذج بطاقة دعوة رقمية 1",
        cardAlt2: "نموذج بطاقة دعوة رقمية 2",
        dateNote: "يجب أن يتم تقديم طلب البطاقات المطبوعة قبل 7 أيام على الأقل من تاريخ المناسبة أو الاستلام.",
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
        discount30: "خصم 30%",
        discount40: "خصم 40%",
        discount35: "خصم 35%",
        discount50: "خصم 50%",
        discount25: "خصم 25%",
        discount15: "خصم 15%",
        discount10: "خصم 10%",
        discount5: "خصم 5%",
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
        invoiceDiscountDetails: "تفاصيل الخصومات",
        invoiceServiceDiscount: "خصم سعر الخدمة:",
        invoicePrintingDiscount: "خصم الطباعة:",
        invoiceDesignDiscount: "خصم التصميم:",
        invoiceDeliveryDiscount: "خصم التوصيل:",
        invoiceTotalDiscount: "إجمالي الخصومات:",
        invoiceMessage: "سيتم التواصل معك قريباً على رقم هاتفك لتأكيد التفاصيل النهائية.",
        btnNewOrder: "طلب جديد",
        btnCopyOrderId: "نسخ رقم الطلب",
        btnCopiedOrderId: "تم النسخ",
        copyOrderIdFailed: "تعذر النسخ"
    },
    en: {
        pageTitle: "Event QR Tech Tricks | Invitation Packages",
        pageDescription: "Smart QR digital invitations for events, printed cards, and digital cards.",
        navHome: "Home",
        navOffers: "Order",
        navInquiry: "Contact",
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
        calcQuantityLabel: "Number of Cards",
        calcQuantityPlaceholder: "Enter quantity (Min 30)",
        calcCustomDesignLabel: "Add Custom Design",
        perCard: "per unit",
        calcMinWarning: "Minimum order is 30 units, maximum is 1000",
        calcMaxWarning: "Maximum order is 1000 units",
        calcUnitPriceLabel: "Unit Price:",
        calcTotalPriceLabel: "Total Order Value:",
        calcOrderBtn: "Order Now",
        calcMsgWithDesign: "with custom design",
        calcMsgWithoutDesign: "without custom design",
        currency: "OMR",
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
        printedSmallSizeFee: "(+0.050 OMR per card)",
        printedLargeSizeFee: "(+0.100 OMR per card)",
        labelDesignType: "Design Type",
        optReadyTemplate: "Ready Template",
        optCustomDesign: `Custom Design <span class="price-tag price-tag-stacked"><span>+0.040 OMR</span><span>per card</span></span>`,
        optCustomDesignText: "Custom Design",
        customDesignPrice: "+0.040 OMR per card",
        templateGalleryTitle: "Choose a template",
        templateNumberLabel: "Number:",
        templateInstagramNote: "You can view template images on our Instagram account.",
        selectSizeFirst: "Please select an invitation size to view suitable templates",
        templatesComingSoon: "Templates will be added soon",
        labelSecurity: "Security Guard",
        securityPriceNote: "+20.000 OMR",
        securityDurationNote: "For your guests' comfort and a smooth, organized entry experience, the security guard service includes 4 hours and can be flexibly extended for 5.000 OMR per additional hour.",
        calcSecurityLabel: "Security Guard Fee:",
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
        faqQ3: "When should printed card orders be placed?",
        faqA3: "Printed card orders must be placed at least 7 days before the event or pickup date.",
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
        labelAddLocation: "Add Location",
        labelEventLocation: "Location or Hall Name",
        phEventLocation: "Enter the location or hall name",
        timeAM: "AM",
        timePM: "PM",
        currencyShort: "OMR",
        valLetters: "Please select both letters clearly",
        valRequiredOptions: "Please select one option from each section: invitation type, card size, and design type.",
        valRequiredField: "Please complete all required fields before submitting your order.",
        valRequiredTemplate: "Please select the required template number.",
        valRequiredWeddingDetails: "Please select a wedding card personalization option and complete the required details.",
        showcaseTitle: "Samples of Our Cards",
        showcaseDesc: "Elegant digital designs with QR codes for every occasion",
        cardAlt1: "Digital invitation card sample 1",
        cardAlt2: "Digital invitation card sample 2",
        dateNote: "Printed card orders must be placed at least 7 days before the event or pickup date.",
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
        discount30: "30% Discount",
        discount40: "40% Discount",
        discount35: "35% Discount",
        discount50: "50% Discount",
        discount25: "25% Discount",
        discount15: "15% Discount",
        discount10: "10% Discount",
        discount5: "5% Discount",
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
        invoiceDiscountDetails: "Discount Details",
        invoiceServiceDiscount: "Service Price Discount:",
        invoicePrintingDiscount: "Printing Discount:",
        invoiceDesignDiscount: "Design Discount:",
        invoiceDeliveryDiscount: "Delivery Discount:",
        invoiceTotalDiscount: "Total Discounts:",
        invoiceMessage: "We will contact you soon on your phone to confirm final details.",
        btnNewOrder: "New Order",
        btnCopyOrderId: "Copy Order ID",
        btnCopiedOrderId: "Copied",
        copyOrderIdFailed: "Copy failed"
    }
};

let currentLang = 'ar';

const templates = {
    "9x5.5cm": [
        {
            id: "11"
        },
        {
            id: "13"
        }
    ],
    "9.5x14cm": [
        {
            id: "10"
        },
        {
            id: "12"
        },
        {
            id: "14"
        }
    ]
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
    document.title = translations[lang].pageTitle || document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations[lang].pageDescription) {
        metaDescription.setAttribute('content', translations[lang].pageDescription);
    }

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
    window.dispatchEvent(new CustomEvent('eventQrLanguageChange', { detail: { lang } }));
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
            if (designReadyRadio && designReadyRadio.checked) renderTemplates();
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

    document.querySelectorAll('a[href="#pricing"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const pricingSection = document.getElementById('pricing');
            const navbar = document.getElementById('navbar');
            if (!pricingSection || !navbar) return;

            e.preventDefault();
            const extraSpace = window.innerWidth <= 768 ? 36 : 24;
            const targetTop = pricingSection.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight - extraSpace;
            window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
        });
    });

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

            const label = document.createElement('span');
            label.textContent = `${translations[currentLang].templateNumberLabel} #${template.id}`;

            card.appendChild(label);

            card.addEventListener('click', () => {
                templateGrid.querySelectorAll('.template-card').forEach((item) => item.classList.remove('selected'));
                card.classList.add('selected');
                if (selectedTemplateInput) selectedTemplateInput.value = template.id;
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
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        const alphabet = `${letters}${digits}`;
        const randomValues = getCryptoRandomValues(12);
        const chars = [];

        for (let i = 0; i < 8; i++) {
            chars.push(alphabet[randomValues[i] % alphabet.length]);
        }

        const letterIndex = randomValues[8] % chars.length;
        let digitIndex = randomValues[9] % chars.length;
        if (digitIndex === letterIndex) digitIndex = (digitIndex + 1) % chars.length;
        chars[letterIndex] = letters[randomValues[10] % letters.length];
        chars[digitIndex] = digits[randomValues[11] % digits.length];
        return chars.join('');
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
        function setTimeFieldsEnabled(isEnabled) {
            timeGroup.classList.toggle('hidden', !isEnabled);
            [hourSelect, minuteSelect, ampmSelect].forEach((select) => {
                if (!select) return;
                select.disabled = !isEnabled;
                select.required = isEnabled && !select.classList.contains('hidden');
            });
        }

        setTimeFieldsEnabled(toggleTime.checked);
        toggleTime.addEventListener('change', (e) => setTimeFieldsEnabled(e.target.checked));
        if (formatToggle) {
            formatToggle.addEventListener('change', () => setTimeFieldsEnabled(toggleTime.checked));
        }
    }

    // Location Toggle Logic
    const toggleLocation = document.getElementById('toggle-location');
    const locationGroup = document.getElementById('location-group');
    const eventLocationInput = document.getElementById('event-location');

    if (toggleLocation && locationGroup && eventLocationInput) {
        function setLocationFieldEnabled(isEnabled) {
            locationGroup.classList.toggle('hidden', !isEnabled);
            eventLocationInput.disabled = !isEnabled;
            eventLocationInput.required = isEnabled;
            if (!isEnabled) eventLocationInput.value = '';
        }

        setLocationFieldEnabled(toggleLocation.checked);
        toggleLocation.addEventListener('change', (e) => {
            setLocationFieldEnabled(e.target.checked);
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
            },
            {
                name: "تفاصيل_الزفاف",
                containerSelector: ".wedding-detail-options",
                condition: () => {
                    const container = inquiryForm.querySelector(".wedding-detail-options");
                    return container && !container.closest("#letters-group").classList.contains("hidden");
                }
            }
        ];

        function validateRequiredOptionGroups(invalidTargets) {
            requiredOptionGroups.forEach((group) => {
                const shouldValidate = !group.condition || group.condition();
                const selected = inquiryForm.querySelector(`input[name="${group.name}"]:checked`);
                const container = inquiryForm.querySelector(group.containerSelector);
                const isInvalid = shouldValidate && !selected;

                if (container) {
                    container.classList.toggle('option-group-invalid', isInvalid);
                }

                if (isInvalid && container) {
                    invalidTargets.push({
                        target: container,
                        message: group.name === "تفاصيل_الزفاف"
                            ? translations[currentLang].valRequiredWeddingDetails
                            : translations[currentLang].valRequiredOptions
                    });
                }
            });
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
            calcQtyInput.classList.toggle('invalid-input', !isValidQuantity);

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

        function validateRequiredFields(invalidTargets) {
            inquiryForm.querySelectorAll('input[required], select[required], textarea[required]').forEach((field) => {
                if (field.disabled || field.type === 'radio' || field.type === 'checkbox' || field.type === 'hidden') return;

                const isInvalid = !field.value.trim();
                field.classList.toggle('invalid-input', isInvalid);
                if (field.id === 'phone') {
                    const phoneGroup = field.closest('.input-group-with-prefix');
                    if (phoneGroup) phoneGroup.classList.toggle('phone-invalid', isInvalid);
                }
                if (isInvalid) {
                    invalidTargets.push({
                        target: field.closest('.input-group-with-prefix') || field,
                        focusTarget: field,
                        message: translations[currentLang].valRequiredField
                    });
                }
            });
        }

        function validateTemplateSelection(invalidTargets) {
            const readyTemplateSelected = designReadyRadio && designReadyRadio.checked;
            const isInvalid = readyTemplateSelected && selectedTemplateInput && !selectedTemplateInput.value;

            if (templateGrid) templateGrid.classList.toggle('option-group-invalid', Boolean(isInvalid));
            if (isInvalid) {
                invalidTargets.push({
                    target: templateGallery || templateGrid,
                    message: translations[currentLang].valRequiredTemplate
                });
            }
        }

        function getFirstTargetInDocumentOrder(items) {
            return items.reduce((first, item) => {
                if (!first) return item;
                const position = first.target.compareDocumentPosition(item.target);
                return position & Node.DOCUMENT_POSITION_PRECEDING ? item : first;
            }, null);
        }

        function validateCompleteOrder() {
            const invalidTargets = [];
            validateRequiredFields(invalidTargets);
            validateRequiredOptionGroups(invalidTargets);
            validateTemplateSelection(invalidTargets);

            const firstInvalid = getFirstTargetInDocumentOrder(invalidTargets);
            if (!firstInvalid) return true;

            setFormError(firstInvalid.message, firstInvalid.target);
            if (firstInvalid.focusTarget && typeof firstInvalid.focusTarget.focus === 'function') {
                firstInvalid.focusTarget.focus({ preventScroll: true });
            }
            return false;
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

        inquiryForm.querySelectorAll('input, select, textarea').forEach((field) => {
            const clearInvalidState = () => {
                if (field.checkValidity()) field.classList.remove('invalid-input');
                if (field.id === 'phone' && field.value.trim()) {
                    const phoneGroup = field.closest('.input-group-with-prefix');
                    if (phoneGroup) phoneGroup.classList.remove('phone-invalid');
                }
                const formGroup = field.closest('.form-group');
                if (formGroup) formGroup.classList.remove('field-group-invalid');
            };
            field.addEventListener('input', clearInvalidState);
            field.addEventListener('change', clearInvalidState);
        });

        if (templateGrid) {
            templateGrid.addEventListener('click', () => templateGrid.classList.remove('option-group-invalid'));
        }

        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const formMessage = document.getElementById('form-message');

            if (!validateCompleteOrder()) {
                return;
            }

            if (!validateQuantityRange()) {
                return;
            }

            if (!validatePhoneNumber()) {
                return;
            }

            submitBtn.textContent = translations[currentLang]['btnSending'];
            submitBtn.disabled = true;

            // Generate Unique Order Number
            let orderId = generateOrderNumber();
            document.getElementById('order-number-input').value = orderId;
            
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
            }

            const eventLocation = document.getElementById('toggle-location').checked
                ? document.getElementById('event-location').value.trim()
                : "";

            const weddingDetailInput = document.querySelector('input[name="تفاصيل_الزفاف"]:checked');
            const weddingDetailType = weddingDetailInput
                ? (weddingDetailInput.id === 'wedding-letters'
                    ? translations[currentLang].optWeddingLetters
                    : translations[currentLang].optWeddingNames)
                : "";
            const l1 = document.getElementById('letter-1').value;
            const l2 = document.getElementById('letter-2').value;
            const name1 = document.getElementById('wedding-name-1').value.trim();
            const name2 = document.getElementById('wedding-name-2').value.trim();
            const selectedLetters = (l1 && l2) ? `${l1} & ${l2}` : "";
            const selectedNames = (name1 && name2) ? `${name1} & ${name2}` : "";

            const finalPriceValue = parseFloat(document.getElementById('calc-total-price').textContent) || 0;
            const formatAmount = (value) => `${value.toFixed(3)} OMR`;
            const formatAmountHtml = (value) => `${value.toFixed(3)} ${omrSymbol}`;
            // Create organized order details for the database and admin notification.
            const organizedObject = {
                "رقم_الطلب": orderId,
                "اسم_العميل": rawObject["الاسم_الكامل"],
                "رقم_الجوال": "+968 " + rawObject["رقم_الجوال"],
                "نوع_المناسبة": rawObject["نوع_المناسبة"],
                "عدد_الوحدات": rawObject["عدد_البطاقات"],
                "حجم_الدعوة": rawObject["حجم_الدعوة"],
                "نوع_الدعوة": rawObject["نوع_الدعوة"],
                "نوع_التصميم": rawObject["نوع_التصميم"]
            };

            if (isDateEnabled) organizedObject["تاريخ_المناسبة"] = eventDate;
            if (document.getElementById('toggle-time').checked) organizedObject["الوقت"] = eventTime;
            if (document.getElementById('toggle-location').checked && eventLocation.trim()) {
                organizedObject["الموقع"] = eventLocation;
            }
            if (weddingDetailInput) {
                organizedObject["تفاصيل_بطاقة_الزفاف"] = weddingDetailType;
                if (weddingDetailInput.id === 'wedding-letters' && l1 && l2) {
                    organizedObject["الأحرف_المختارة"] = selectedLetters;
                }
                if (weddingDetailInput.id === 'wedding-names' && name1 && name2) {
                    organizedObject["الأسماء_المكتوبة"] = selectedNames;
                }
            }
            if (designReadyRadio && designReadyRadio.checked && selectedTemplateInput.value) {
                organizedObject["رقم_النموذج"] = selectedTemplateInput.value;
            }

            organizedObject["حارس_الأمن"] = document.getElementById('security-toggle').checked
                ? (currentLang === 'ar' ? "نعم" : "Yes")
                : (currentLang === 'ar' ? "لا" : "No");

            if (rawObject["ملاحظات_إضافية"] && rawObject["ملاحظات_إضافية"].trim()) {
                organizedObject["ملاحظات_إضافية"] = rawObject["ملاحظات_إضافية"].trim();
            }

            organizedObject["السعر_النهائي_بعد_الخصم"] = formatAmount(finalPriceValue);
            organizedObject["رابط_الفاتورة"] = "https://om-production-7de0.up.railway.app/admin.html";

            try {
                const databaseDetails = { ...organizedObject };
                const saved = await window.eventQrAuth.api('/api/orders', {
                    method: 'POST',
                    body: JSON.stringify({
                        customerName: rawObject["الاسم_الكامل"],
                        customerPhone: "+968 " + rawObject["رقم_الجوال"],
                        totalPrice: finalPriceValue,
                        details: databaseDetails
                    })
                });
                orderId = saved.order.order_number;
                document.getElementById('order-number-input').value = orderId;
                organizedObject["رقم_الطلب"] = orderId;
            } catch (error) {
                formMessage.textContent = error.message || (currentLang === 'ar' ? "تعذر حفظ الطلب." : "Could not save the order.");
                formMessage.classList.remove('hidden');
                formMessage.classList.add('error');
                submitBtn.textContent = translations[currentLang]['btnSubmit'];
                submitBtn.disabled = false;
                return;
            }

            {
                    const t = translations[currentLang];
                    inquiryForm.closest('.calculator-card')?.classList.add('order-complete');
                    const thankYouMessage = currentLang === 'ar'
                        ? 'شكرًا لاختيارك متجرنا.<br>سنتواصل معك قريبًا لتأكيد الطلب.'
                        : 'Thank you for choosing our store.<br>We will contact you soon to confirm the order.';
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
                                <div class="invoice-divider"></div>
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
                                <div class="invoice-details">
                                    <div class="invoice-total">
                                        <span class="label">${t.invoiceTotal}</span>
                                        <span class="value">${formatAmountHtml(finalPriceValue)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="invoice-footer">
                                <button onclick="window.location.reload()" class="btn btn-primary">${t.btnNewOrder}</button>
                            </div>
                        </div>
                    `;
                    bindCopyOrderButton(orderId);
                    if (window.eventQrAuth?.isAuthenticated()) {
                        window.eventQrAuth.refreshOrders();
                    }
                    inquiryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Removed final .then that resets button automatically to prevent duplicate clicks while showing success
        });
    }

    // Calculator Logic
    const calcWarning = document.getElementById('calc-warning');
    const calcResults = document.getElementById('calc-results');
    const calcTotalPriceSpan = document.getElementById('calc-total-price');
    const calcTotalOldPriceSpan = document.getElementById('calc-total-old-price');
    const calcBasePriceSpan = document.getElementById('calc-base-price');
    const calcBaseOldPriceSpan = document.getElementById('calc-base-old-price');
    const baseDiscountBadge = document.getElementById('base-discount-badge');
    const calcDesignPriceSpan = document.getElementById('calc-design-price');
    const calcDesignOldPriceSpan = document.getElementById('calc-design-old-price');
    const designDiscountBadge = document.getElementById('design-discount-badge');
    const calcDesignRow = document.getElementById('calc-design-row');
    const calcPrintingRow = document.getElementById('calc-printing-row');
    const calcPrintingPriceSpan = document.getElementById('calc-printing-price');
    const calcPrintingOldPriceSpan = document.getElementById('calc-printing-old-price');
    const printingDiscountBadge = document.getElementById('printing-discount-badge');
    const securityToggle = document.getElementById('security-toggle');
    const securityNote = document.getElementById('security-note');
    const calcSecurityRow = document.getElementById('calc-security-row');
    const calcSecurityPriceSpan = document.getElementById('calc-security-price');
    const BASE_CARD_PRICE = 0.213;
    const BASE_CARD_DISCOUNT_200 = 0.05;
    const BASE_CARD_DISCOUNT_500 = 0.10;
    const BASE_CARD_DISCOUNT_1000 = 0.15;
    const PRINTING_SMALL_PRICE = 0.050;
    const PRINTING_LARGE_PRICE = 0.100;
    const PRINTING_SMALL_PRICE_200 = 0.045;
    const PRINTING_LARGE_PRICE_200 = 0.095;
    const PRINTING_SMALL_PRICE_500 = 0.035;
    const PRINTING_LARGE_PRICE_500 = 0.075;
    const PRINTING_SMALL_PRICE_1000 = 0.030;
    const PRINTING_LARGE_PRICE_1000 = 0.065;
    const CUSTOM_DESIGN_PRICE = 0.040;
    const CUSTOM_DESIGN_DISCOUNT_200 = 0.30;
    const CUSTOM_DESIGN_DISCOUNT_500 = 0.50;
    const SECURITY_PRICE = 20;
    const DELIVERY_PRICE = 2;

    function getSelectedInvitationType() {
        return document.querySelector('input[name="نوع_الدعوة"]:checked');
    }

    function getSelectedInvitationSize() {
        return document.querySelector('input[name="حجم_الدعوة"]:checked');
    }

    function getPrintingUnitPrice(discountTier = 0) {
        const selectedInvitationType = getSelectedInvitationType();
        const selectedSize = getSelectedInvitationSize();
        const isPrinted = selectedInvitationType && selectedInvitationType.value === 'دعوة مطبوعة';

        if (!isPrinted || !selectedSize) return 0;
        if (discountTier === 1000) {
            return selectedSize.value === '9.5x14cm' ? PRINTING_LARGE_PRICE_1000 : PRINTING_SMALL_PRICE_1000;
        }
        if (discountTier === 500) {
            return selectedSize.value === '9.5x14cm' ? PRINTING_LARGE_PRICE_500 : PRINTING_SMALL_PRICE_500;
        }
        if (discountTier === 200) {
            return selectedSize.value === '9.5x14cm' ? PRINTING_LARGE_PRICE_200 : PRINTING_SMALL_PRICE_200;
        }
        return selectedSize.value === '9.5x14cm' ? PRINTING_LARGE_PRICE : PRINTING_SMALL_PRICE;
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

        const discountTier = qty >= 1000 ? 1000 : qty >= 500 ? 500 : qty >= 200 ? 200 : 0;
        const hasQuantityDiscount = qty >= 200;
        const originalBasePrice = qty * BASE_CARD_PRICE;
        const baseDiscount = discountTier === 1000 ? BASE_CARD_DISCOUNT_1000 : discountTier === 500 ? BASE_CARD_DISCOUNT_500 : discountTier === 200 ? BASE_CARD_DISCOUNT_200 : 0;
        const basePrice = originalBasePrice * (1 - baseDiscount);
        const originalPrintingUnitPrice = getPrintingUnitPrice();
        const printingUnitPrice = getPrintingUnitPrice(discountTier);
        const originalPrintingPrice = qty * originalPrintingUnitPrice;
        const printingPrice = qty * printingUnitPrice;
        const hasCustomDesign = calcDesignToggle.checked;

        const originalDesignPrice = hasCustomDesign ? qty * CUSTOM_DESIGN_PRICE : 0;
        const designDiscount = discountTier >= 500 ? CUSTOM_DESIGN_DISCOUNT_500 : discountTier === 200 ? CUSTOM_DESIGN_DISCOUNT_200 : 0;
        const designPrice = originalDesignPrice * (1 - designDiscount);

        const hasSecurity = securityToggle && securityToggle.checked;
        const securityPrice = hasSecurity ? SECURITY_PRICE : 0;
        const totalPrice = basePrice + printingPrice + designPrice + securityPrice;
        const originalTotalPrice = originalBasePrice + originalPrintingPrice + originalDesignPrice + securityPrice + DELIVERY_PRICE;

        if (calcBasePriceSpan) calcBasePriceSpan.textContent = basePrice.toFixed(2);
        if (calcBaseOldPriceSpan) {
            calcBaseOldPriceSpan.textContent = originalBasePrice.toFixed(2);
            calcBaseOldPriceSpan.classList.toggle('hidden', !hasQuantityDiscount);
        }
        if (baseDiscountBadge) {
            const baseDiscountKey = discountTier === 1000 ? 'discount15' : discountTier === 500 ? 'discount10' : 'discount5';
            baseDiscountBadge.setAttribute('data-i18n', baseDiscountKey);
            baseDiscountBadge.textContent = translations[currentLang][baseDiscountKey];
            baseDiscountBadge.classList.toggle('hidden', !hasQuantityDiscount);
        }
        if (calcPrintingRow) calcPrintingRow.classList.toggle('hidden', printingPrice <= 0);
        if (calcPrintingPriceSpan) calcPrintingPriceSpan.textContent = printingPrice.toFixed(2);
        if (calcPrintingOldPriceSpan) {
            calcPrintingOldPriceSpan.textContent = originalPrintingPrice.toFixed(2);
            calcPrintingOldPriceSpan.classList.toggle('hidden', !hasQuantityDiscount || printingPrice <= 0);
        }
        if (printingDiscountBadge) {
            const selectedSize = getSelectedInvitationSize();
            const isLargePrinting = selectedSize && selectedSize.value === '9.5x14cm';
            const printingDiscountKey = discountTier === 1000
                ? (isLargePrinting ? 'discount35' : 'discount40')
                : discountTier === 500
                    ? (isLargePrinting ? 'discount25' : 'discount30')
                    : (isLargePrinting ? 'discount5' : 'discount10');
            printingDiscountBadge.setAttribute('data-i18n', printingDiscountKey);
            printingDiscountBadge.textContent = translations[currentLang][printingDiscountKey];
            printingDiscountBadge.classList.toggle('hidden', !hasQuantityDiscount || printingPrice <= 0);
        }

        if (hasCustomDesign) {
            if (calcDesignRow) calcDesignRow.classList.remove('hidden');
            if (calcDesignPriceSpan) calcDesignPriceSpan.textContent = designPrice.toFixed(2);
            if (calcDesignOldPriceSpan) {
                calcDesignOldPriceSpan.textContent = originalDesignPrice.toFixed(2);
                calcDesignOldPriceSpan.classList.toggle('hidden', !hasQuantityDiscount);
            }
            if (designDiscountBadge) {
                const designDiscountKey = discountTier >= 500 ? 'discount50' : 'discount30';
                designDiscountBadge.setAttribute('data-i18n', designDiscountKey);
                designDiscountBadge.textContent = translations[currentLang][designDiscountKey];
                designDiscountBadge.classList.toggle('hidden', !hasQuantityDiscount);
            }
        } else {
            if (calcDesignRow) calcDesignRow.classList.add('hidden');
            if (calcDesignPriceSpan) calcDesignPriceSpan.textContent = '0.00';
            if (calcDesignOldPriceSpan) {
                calcDesignOldPriceSpan.textContent = '0.00';
                calcDesignOldPriceSpan.classList.add('hidden');
            }
            if (designDiscountBadge) designDiscountBadge.classList.add('hidden');
        }

        if (calcSecurityRow) calcSecurityRow.classList.toggle('hidden', !hasSecurity);
        if (calcSecurityPriceSpan) calcSecurityPriceSpan.textContent = securityPrice.toFixed(3);
        if (securityNote) securityNote.classList.toggle('hidden', !hasSecurity);

        calcTotalPriceSpan.textContent = totalPrice.toFixed(2);
        if (calcTotalOldPriceSpan) calcTotalOldPriceSpan.textContent = originalTotalPrice.toFixed(2);
        
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
