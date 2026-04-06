(function () {
  "use strict";

  const API = {
    login: "/api/login",
    signup: "/api/signup",
    quizResults: "/api/quiz-results",
    askGuide: "/api/ask-guide",
  };

  var LANG_KEY = "studygid_lang";
  var I18N = {
    uz: {
      nav_about: "Biz haqimizda",
      nav_ai: "AI yo'riq",
      nav_quiz: "Testlar",
      nav_contact: "Aloqa",
      nav_auth: "Kirish / Ro'yxatdan o'tish",
      footer_copy: "© {year} Studygid. Iste'dodli talabalar uchun xotirjam vositalar.",

      title_home: "Studygid — imtihon va karyera uchun sokin hamroh",
      hero_eyebrow: "Baholardan ham ko'proqni istagan talabalar uchun",
      hero_title:
        "Kasb bitirishni kutmaydi — <span class=\"accent\">aniqlik</span> bugundan boshlanishi mumkin.",
      hero_lead:
        "IELTS, SAT va «yo'l tanlash» bosimi o'rtasida orqada qolganingizni his qilish oson. Studygid rejalar tuzish, mashq qilish va nafas olish uchun yumshoq, sifatli maydon.",
      hero_cta_ai: "AI yo'riqni ochish",
      hero_cta_quiz: "Testni boshlash",

      sec_ai_h2: "AI yo'riq",
      sec_ai_sub:
        "IELTS, SAT va karyera yo'nalishi uchun diqqatli yordamchi — keraksiz shovqin emas, shu hafta qo'llashingiz mumkin bo'lgan aniq qadamlar.",
      card_ai_h3: "Maqsadingizga mos o'quv materiallari",
      card_ai_p:
        "O'qish mashqlari, speaking mavzulari, matematika rejasi yoki mutaxassislikni qanday o'rganish haqida so'rang. Tavsiyalar amaliy va imtihonga mos bo'lib qoladi.",
      card_ai_link: "AI yo'riqni sinab ko'ring",

      about_h2: "Biz haqimizda",
      about_sub:
        "Studygid talaba stressi «odatiy hol» bo'lishi shart emas, deb yaratilgan. Yengil qahvaxonaga o'xshash tinchlik va vaqtingizni hurmat qiladigan vositalarni birlashtiramiz.",
      about_p:
        "Vazifamiz oddiy: yuqori stavkali imtihonlar va karyera tanlovlarida aniqlik bilan yordam berish — kamroq varaq, aniqroq qadamlar va sevimli qahvaxoningizdek yoqimli interfeys.",
      about_li1: "Inson markazidagi matn — ortiqcha shoshilinch ishlash madaniyatisiz",
      about_li2: "Imtihonlarga mos yo'riq (IELTS / SAT)",
      about_li3: "O'yinchoqsiz karyerani kashf etish",

      quiz_teaser_h2: "Karyera testi",
      quiz_teaser_p:
        "Oltita o'ylantiruvchi savol: qanday ishlaysiz, o'rganasiz va g'amxo'rlik qilasiz — javoblaringiz <strong>kelajakdagi kasb</strong> haqida qisqa tasvir beradi. Tez, qiziq va shaxsiy.",
      quiz_teaser_btn: "Boshlash",

      contact_h2: "Biz bilan aloqa",
      contact_sub: "Qisqa xabar ham kifoya. Har bir murojaatni o'qiymiz.",
      contact_name: "Ism",
      contact_name_ph: "Ismingiz",
      contact_email: "Elektron pochta",
      contact_email_ph: "siz@maktab.edu",
      contact_msg: "Xabar",
      contact_msg_ph: "Qanday yordam bera olamiz?",
      contact_send: "Yuborish",
      contact_hint:
        "Rahmat — bu demo hali email yubormaydi; xabaringiz mahalliy eslab qolindi.",

      title_guide: "AI yo'riq — Studygid",
      guide_h1: "AI yo'riq",
      guide_sub:
        "Nimaga tayyorlanayotganingizni yozing — IELTS, SAT yoki karyera qadami. Aniq o'quv g'oyalari olasiz (demo javoblar).",
      guide_hi:
        "Salom — men Studygid yo'riqchisiman. IELTS yoki SAT mashqlari, yoki karyera yo'lini qanday o'rganish haqida so'rang. Nima ustida ishlayapsiz?",
      guide_ph: "Masalan: IELTS yozish uchun 2 haftalik reja kerak…",
      guide_send: "Yuborish",
      guide_note:
        "Bu demoda javoblar simulyatsiya qilinadi. Tayyor bo'lganda AI provayderni <code>/api/ask-guide</code> orqali ulang.",

      title_quiz: "Karyera testi — Studygid",
      quiz_h1: "Karyerani kashf etish testi",
      quiz_sub: "Oltita savol. O'zingizga eng yaqinini tanlang — noto'g'ri javob yo'q.",
      quiz_back: "Orqaga",
      quiz_next: "Keyingisi",
      quiz_res_h2: "Kelajakdagi kasbingiz (qisqa tasvir)",
      quiz_home: "Bosh sahifaga",

      think: "O'ylayapman…",
      noAns: "Javob yo'q.",
      netErr: "Serverga ulanib bo'lmadi. Flask ishlayotganini tekshiring.",
    },
    ru: {
      nav_about: "О нас",
      nav_ai: "AI‑помощник",
      nav_quiz: "Тесты",
      nav_contact: "Контакты",
      nav_auth: "Войти / Регистрация",
      footer_copy: "© {year} Studygid. Спокойные инструменты для талантливых студентов.",

      title_home: "Studygid — спокойный помощник для экзаменов и карьеры",
      hero_eyebrow: "Для студентов, которым нужно больше, чем оценки",
      hero_title:
        "Карьера не ждёт — <span class=\"accent\">ясность</span> может начаться уже сегодня.",
      hero_lead:
        "Между IELTS, SAT и давлением «выбрать путь» легко почувствовать, что отстаёшь. Studygid — мягкое, качественное пространство, чтобы планировать, практиковаться и выдыхать.",
      hero_cta_ai: "Открыть AI‑помощника",
      hero_cta_quiz: "Начать тест",

      sec_ai_h2: "AI‑помощник",
      sec_ai_sub:
        "Внимательный помощник для IELTS, SAT и выбора направления — без шума, только конкретные шаги, которые можно применить уже на этой неделе.",
      card_ai_h3: "Материалы под вашу цель",
      card_ai_p:
        "Спросите про упражнения по чтению, темы для speaking, план по математике или как исследовать специальность. Советы будут практичными и ближе к формату экзамена.",
      card_ai_link: "Попробовать AI‑помощника",

      about_h2: "О нас",
      about_sub:
        "Studygid создан с мыслью, что стресс студента не обязан быть «нормой». Мы объединяем спокойствие и инструменты, которые уважают ваше время.",
      about_p:
        "Наша задача проста: помогать с ясностью в высокоставочных экзаменах и выборе карьеры — меньше хаоса, больше конкретики и интерфейс, приятный как любимая кофейня.",
      about_li1: "Текст с заботой о человеке — без культуры вечной спешки",
      about_li2: "Подготовка под формат экзаменов (IELTS / SAT)",
      about_li3: "Исследование карьеры без игрушечности",

      quiz_teaser_h2: "Тест по карьере",
      quiz_teaser_p:
        "Шесть вопросов: как вы работаете, учитесь и заботитесь — ответы дадут короткое описание <strong>будущей профессии</strong>. Быстро, интересно и лично.",
      quiz_teaser_btn: "Начать",

      contact_h2: "Связаться с нами",
      contact_sub: "Достаточно короткого сообщения. Мы читаем каждое обращение.",
      contact_name: "Имя",
      contact_name_ph: "Ваше имя",
      contact_email: "Почта",
      contact_email_ph: "you@school.edu",
      contact_msg: "Сообщение",
      contact_msg_ph: "Чем можем помочь?",
      contact_send: "Отправить",
      contact_hint:
        "Спасибо — это демо пока не отправляет email; сообщение сохранено локально.",

      title_guide: "AI‑помощник — Studygid",
      guide_h1: "AI‑помощник",
      guide_sub:
        "Напишите, к чему готовитесь — IELTS, SAT или шаг в карьере. Получите конкретные идеи (демо‑ответы).",
      guide_hi:
        "Привет — я помощник Studygid. Спроси про IELTS/SAT или как разобраться с выбором карьеры. Над чем работаешь?",
      guide_ph: "Например: нужен план на 2 недели для IELTS Writing…",
      guide_send: "Отправить",
      guide_note:
        "В этом демо ответы симулируются. Когда будете готовы, подключите провайдера AI через <code>/api/ask-guide</code>.",

      title_quiz: "Тест по карьере — Studygid",
      quiz_h1: "Тест: исследование карьеры",
      quiz_sub: "Шесть вопросов. Выберите то, что ближе — неправильных ответов нет.",
      quiz_back: "Назад",
      quiz_next: "Дальше",
      quiz_res_h2: "Ваша будущая профессия (кратко)",
      quiz_home: "На главную",

      think: "Думаю…",
      noAns: "Нет ответа.",
      netErr: "Не удалось подключиться к серверу. Проверьте, что Flask запущен.",
    },
  };

  function getLang() {
    var v = (localStorage.getItem(LANG_KEY) || "uz").toLowerCase();
    return v === "ru" ? "ru" : "uz";
  }

  function setLang(v) {
    v = (v || "uz").toLowerCase();
    var next = v === "ru" ? "ru" : "uz";
    localStorage.setItem(LANG_KEY, next);
    applyLang(next);
  }

  function applyLang(lg) {
    var uzBtn = document.querySelector('.lang-btn[data-lang="uz"]');
    var ruBtn = document.querySelector('.lang-btn[data-lang="ru"]');
    if (uzBtn) {
      uzBtn.classList.toggle("is-on", lg === "uz");
      uzBtn.setAttribute("aria-pressed", lg === "uz" ? "true" : "false");
    }
    if (ruBtn) {
      ruBtn.classList.toggle("is-on", lg === "ru");
      ruBtn.setAttribute("aria-pressed", lg === "ru" ? "true" : "false");
    }

    var t = I18N[lg] || I18N.uz;
    document.documentElement.setAttribute("lang", lg === "ru" ? "ru" : "uz");
    document.documentElement.setAttribute("data-lang", lg);

    var year = String(new Date().getFullYear());
    $all("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = t[k];
      if (!v) return;
      v = String(v).replace("{year}", year);
      el.innerHTML = v;
    });
    $all("[data-i18n-placeholder]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-placeholder");
      var v = t[k];
      if (!v) return;
      el.setAttribute("placeholder", v);
    });
  }

  const TRACK_LABEL_UZ = {
    STEM: "texnika va IT",
    CREATIVE: "ijodiy dizayn",
    PEOPLE: "odamlar bilan ishlash",
    BUSINESS: "biznes va strategiya",
    HEALTH: "sog'liq va tibbiyot",
    ANALYTIC: "ma'lumotlar tahlili",
  };

  /** Quiz copy matches backend QUIZ_WEIGHTS option order (0–3 per question). */
  const QUIZ_QUESTIONS = [
    {
      q: "Bo'sh vaqtingizda sizni eng ko'p nima hayajonlantiradi?",
      options: [
        "Nimadir tuzatish, sinab ko'rish yoki qanday ishlashini o'rganish",
        "Chizish, yozish yoki chiroyli narsa yaratish",
        "Odamlar bilan suhbatlashish va ularni tushunishga yordam berish",
        "Reja tuzish va jamoani maqsadga yetaklash",
      ],
    },
    {
      q: "Qanday ish muhiti sizga eng yoqadi?",
      options: [
        "Tinchoq laboratoriya, ustaxona yoki chuqur fokus stoli",
        "Yorqin studiya yoki erkin ijodiy maydon",
        "Sinf, klinika yoki hamkorlik uchun ochiq ofis",
        "Jadval, hisobot va aniq ko'rsatkichlar bilan ish stoli",
      ],
    },
    {
      q: "Qiyin muammo oldingizda odatda siz…",
      options: [
        "Uni qismlarga bo'lasiz va gipotezalarni tekshirasiz",
        "Bir nechta g'ayrioddiy yo'nalishlarni o'ylaysiz",
        "Ishonchli odam bilan muhokama qilasiz",
        "Muvaffaqiyatni aniqlaysiz, keyin eng muhimini tanlaysiz",
      ],
    },
    {
      q: "Qaysi fan yo'nalishi sizda yashirincha yoqardi?",
      options: [
        "Matematika, tabiat fanlari yoki dasturlash",
        "San'at, til yoki media",
        "Biologiya, psixologiya yoki sog'liq",
        "Iqtisod, munozara yoki liderlik loyihalari",
      ],
    },
    {
      q: "Ko'proq qanday ta'sir ko'rsatishni xohlaysiz?",
      options: [
        "Boshqalarning sog'lig'i va farovonligini yaxshilash",
        "O'qitish, yo'l-yo'riq yoki o'sishga yordam",
        "Tashkilot, mahsulot yoki biznes qurish",
        "Dunyoqarashni o'zgartiradigan g'oyalarni ifodalash",
      ],
    },
    {
      q: "Stress ostida siz odatda…",
      options: [
        "Ma'lumotlarni qayta tekshirasiz va biroz sekinlaysiz",
        "Improvizatsiya qilasiz va o'z sezgingizga ishonasiz",
        "Boshqalar bilan bog'lanasiz va muvofiqlashtirasiz",
        "Aniq bir narsa — prototip yoki tuzatish — tayyorlaysiz",
      ],
    },
  ];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* Footer year */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  var header = $(".site-header");
  var navToggle = $(".nav-toggle");
  if (header && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
    });
    $all(".nav-main a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menyuni ochish");
      });
    });
  }

  /* Auth modal */
  var authModal = $("#auth-modal");
  function openAuth() {
    if (!authModal) return;
    authModal.classList.add("is-open");
    authModal.setAttribute("aria-hidden", "false");
  }
  function closeAuth() {
    if (!authModal) return;
    authModal.classList.remove("is-open");
    authModal.setAttribute("aria-hidden", "true");
  }
  $all("[data-open-auth]").forEach(function (btn) {
    btn.addEventListener("click", openAuth);
  });
  $all("[data-close-auth]").forEach(function (el) {
    el.addEventListener("click", closeAuth);
  });
  if (authModal) {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && authModal.classList.contains("is-open")) closeAuth();
    });
  }

  var formLogin = $("#form-login");
  var formSignup = $("#form-signup");
  var loginStatus = $("#login-status");
  var signupStatus = $("#signup-status");
  $all(".auth-tabs .tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-tab");
      $all(".auth-tabs .tab").forEach(function (t) {
        t.classList.toggle("active", t === tab);
      });
      if (name === "login") {
        if (formLogin) formLogin.classList.remove("hidden");
        if (formSignup) formSignup.classList.add("hidden");
      } else {
        if (formLogin) formLogin.classList.add("hidden");
        if (formSignup) formSignup.classList.remove("hidden");
      }
    });
  });

  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(formLogin);
      var body = { email: fd.get("email"), password: fd.get("password") };
      if (loginStatus) loginStatus.textContent = "Yuborilmoqda…";
      fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (loginStatus) loginStatus.textContent = data.message || "Tayyor.";
        })
        .catch(function () {
          if (loginStatus) loginStatus.textContent = "Tarmoq xatosi.";
        });
    });
  }

  if (formSignup) {
    formSignup.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(formSignup);
      var body = {
        name: fd.get("name"),
        email: fd.get("email"),
        password: fd.get("password"),
      };
      if (signupStatus) signupStatus.textContent = "Yuborilmoqda…";
      fetch(API.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (signupStatus) signupStatus.textContent = data.message || "Tayyor.";
        })
        .catch(function () {
          if (signupStatus) signupStatus.textContent = "Tarmoq xatosi.";
        });
    });
  }

  /* Contact form (client-only confirmation) */
  var contactForm = $("#contact-form");
  var contactHint = $("#contact-hint");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactForm.reset();
      if (contactHint) {
        contactHint.hidden = false;
      }
    });
  }

  /* Guide AI */
  var guideForm = $("#guide-form");
  var guideChat = $("#guide-chat");
  var guidePrompt = $("#guide-prompt");
  if (guideForm && guideChat && guidePrompt) {
    guideForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = guidePrompt.value.trim();
      if (!text) return;
      guidePrompt.value = "";
      appendChat("user", text);
      var lg = getLang();
      var t = I18N[lg] || I18N.uz;
      var tmp = appendChat("assistant", t.think);
      var sendBtn = $("#guide-send");
      if (sendBtn) sendBtn.disabled = true;
      fetch(API.askGuide, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, lang: lg }),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data || !data.ok) throw new Error((data && data.error) || "x");
          replaceChat(tmp, data.reply || t.noAns);
        })
        .catch(function (e2) {
          var msg = (e2 && e2.message) || "";
          if (msg && msg !== "x") {
            replaceChat(tmp, msg);
          } else {
            replaceChat(tmp, t.netErr);
          }
        })
        .finally(function () {
          if (sendBtn) sendBtn.disabled = false;
        });
    });
  }

  function appendChat(role, text) {
    var wrap = document.createElement("div");
    wrap.className = "chat-msg " + role;
    var bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = text;
    wrap.appendChild(bubble);
    guideChat.appendChild(wrap);
    guideChat.scrollTop = guideChat.scrollHeight;
    return wrap;
  }

  function replaceChat(node, text) {
    if (!node) return;
    var b = node.querySelector(".chat-bubble");
    if (b) b.textContent = text;
  }

  $all(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.getAttribute("data-lang"));
    });
  });
  applyLang(getLang());

  /* Quiz */
  var quizContainer = $("#quiz-questions");
  var quizNext = $("#quiz-next");
  var quizBack = $("#quiz-back");
  var quizProgress = $("#quiz-progress-bar");
  var quizStepNum = $("#quiz-step-num");
  var quizResult = $("#quiz-result");
  var resultProfession = $("#result-profession");
  var resultNote = $("#result-note");
  var quizCard = $("#quiz-container");

  if (quizContainer && quizNext) {
    var step = 0;
    var answers = [];

    function renderStep() {
      quizContainer.innerHTML = "";
      var item = QUIZ_QUESTIONS[step];
      var h = document.createElement("h2");
      h.className = "quiz-question-title";
      h.textContent = item.q;
      quizContainer.appendChild(h);
      var opts = document.createElement("div");
      opts.className = "quiz-options";
      var name = "q" + step;
      var selected = answers[step];
      item.options.forEach(function (label, i) {
        var lab = document.createElement("label");
        lab.className = "quiz-option" + (selected === i ? " selected" : "");
        var inp = document.createElement("input");
        inp.type = "radio";
        inp.name = name;
        inp.value = String(i);
        inp.checked = selected === i;
        var span = document.createElement("span");
        span.textContent = label;
        lab.appendChild(inp);
        lab.appendChild(span);
        lab.addEventListener("click", function () {
          answers[step] = i;
          $all(".quiz-option", opts).forEach(function (el) {
            el.classList.remove("selected");
          });
          lab.classList.add("selected");
          inp.checked = true;
        });
        opts.appendChild(lab);
      });
      quizContainer.appendChild(opts);

      if (quizStepNum) quizStepNum.textContent = String(step + 1);
      if (quizProgress) quizProgress.style.width = ((step + 1) / 6) * 100 + "%";
      if (quizBack) quizBack.hidden = step === 0;
      quizNext.textContent =
        step === QUIZ_QUESTIONS.length - 1 ? "Natijani ko'rish" : "Keyingisi";
    }

    quizNext.addEventListener("click", function () {
      if (answers[step] === undefined) {
        return;
      }
      if (step < QUIZ_QUESTIONS.length - 1) {
        step += 1;
        renderStep();
        return;
      }
      fetch(API.quizResults, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answers }),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data.ok) throw new Error(data.error || "Server javobi xato");
          if (quizCard) quizCard.classList.add("hidden");
          if (quizResult) quizResult.classList.remove("hidden");
          if (resultProfession) resultProfession.textContent = data.profession;
          if (resultNote) {
            var t = TRACK_LABEL_UZ[data.track] || data.track;
            resultNote.textContent =
              "Javoblaringiz asosida natija " +
              t +
              " yo'nalishiga yaqin. Bu qisqa ko'ngil ochish — rasmiy karyera maslahati emas.";
          }
        })
        .catch(function () {
          alert(
            "Test natijasini olish mumkin emas. Server ishlayotganini tekshiring."
          );
        });
    });

    if (quizBack) {
      quizBack.addEventListener("click", function () {
        if (step > 0) {
          step -= 1;
          renderStep();
        }
      });
    }

    renderStep();
  }
})();
