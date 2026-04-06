
from flask import Flask, render_template, request, jsonify

import os

from openai import OpenAI

app = Flask(__name__)


def _cli():
    k = (os.getenv("OPENAI_API_KEY") or "").strip()
    if not k:
        return None
    return OpenAI(api_key=k)


def ask_ai(prompt, lang="uz"):
    c = _cli()
    if not c:
        raise RuntimeError("OPENAI_API_KEY topilmadi")

    prompt = (prompt or "").strip()
    if not prompt:
        return ""

    lang = (lang or "uz").strip().lower()
    sys_uz = (
        "Sen Studygid o'quv yordamchisisan. IELTS/SAT/karyera bo'yicha aniq, amaliy, "
        "qisqa-qisqa qadamlar ber. Keraksiz gap yozma."
    )
    sys_ru = (
        "Ты учебный помощник Studygid. Давай конкретные, практичные, короткие шаги "
        "по IELTS/SAT/карьере. Без воды."
    )
    sys_msg = sys_ru if lang == "ru" else sys_uz

    r = c.chat.completions.create(
        model=os.getenv("OPENAI_MODEL") or "gpt-4o-mini",
        messages=[
            {"role": "system", "content": sys_msg},
            {"role": "user", "content": prompt},
        ],
        max_tokens=550,
    )
    return (r.choices[0].message.content or "").strip()

TRACK_KEYS = ("STEM", "CREATIVE", "PEOPLE", "BUSINESS", "HEALTH", "ANALYTIC")

# For each question index 0..5, list of 4 tuples: (track_name, weight)
QUIZ_WEIGHTS = [
    # Q1 options 0–3: energizes you — STEM / CREATIVE / PEOPLE / BUSINESS
    [
        ("STEM", 3),
        ("CREATIVE", 3),
        ("PEOPLE", 3),
        ("BUSINESS", 3),
    ],
    # Q2: work environment — lab/quiet / studio / collaborative / data desk
    [
        ("STEM", 3),
        ("CREATIVE", 3),
        ("PEOPLE", 3),
        ("ANALYTIC", 3),
    ],
    # Q3: problem-solving style
    [
        ("ANALYTIC", 3),
        ("CREATIVE", 3),
        ("PEOPLE", 3),
        ("BUSINESS", 3),
    ],
    # Q4: favorite subject area
    [
        ("STEM", 3),
        ("CREATIVE", 3),
        ("HEALTH", 3),
        ("BUSINESS", 3),
    ],
    # Q5: impact you want
    [
        ("HEALTH", 3),
        ("PEOPLE", 3),
        ("BUSINESS", 3),
        ("CREATIVE", 3),
    ],
    # Q6: under pressure you
    [
        ("ANALYTIC", 3),
        ("CREATIVE", 3),
        ("PEOPLE", 3),
        ("STEM", 3),
    ],
]

PROFESSION_BY_TRACK = {
    "STEM": "Dasturchi (software muhandisi)",
    "CREATIVE": "Mahsulot dizayneri",
    "PEOPLE": "O'qituvchi / maslahatchi",
    "BUSINESS": "Strategik maslahatchi",
    "HEALTH": "Sog'liq sohasi mutaxassisi",
    "ANALYTIC": "Ma'lumotlar tahlilchisi",
}


def compute_profession(answers):
    """
    answers: list of 6 integers 0-3 (option index per question).
    Returns dict with winning profession and score breakdown.
    """
    if not isinstance(answers, list) or len(answers) != 6:
        return None
    scores = {k: 0 for k in TRACK_KEYS}
    for qi, opt in enumerate(answers):
        if not isinstance(opt, int) or opt < 0 or opt > 3:
            return None
        track, w = QUIZ_WEIGHTS[qi][opt]
        scores[track] = scores.get(track, 0) + w
    winner = max(scores, key=scores.get)
    return {
        "profession": PROFESSION_BY_TRACK[winner],
        "track": winner,
        "scores": scores,
    }


GUIDE_RESPONSES = [
    "IELTS Academic yozish uchun rasmiy Cambridge o'tkazilgan testlar bilan vaqtli mashq qiling — bir hafta Task 2 tuzilishiga (kirish, ikki asosiy paragraf, xulosa) e'tibor bering.",
    "SAT matematika: algebra yadrosi va ma'lumotlarni tahlil qilish mavzularini mustahkamlang; College Board bepul kundalik mashqlaridan foydalaning va xatolarni qisqa jurnalda yozib boring.",
    "IELTS Speaking: haftasiga 2 daqiqalik Part 2 kartochkalariga audio yozing; o'tmish, hozir, kelajak ramkasi bosim ostida ravon gapirishga yordam beradi.",
    "Karyera aniqligi: tugatgan beshta loyihangizni yozing va qaysi ko'nikmalar oson berilganini belgilang; O*NET yoki mamlakat karyera portalidagi kasblar bilan solishtiring.",
    "SAT o'qish: dalil savollarida javobdan oldin aniq jumlani chizing — bu ehtiyotsiz xatolarni kamaytiradi.",
]


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/guide', methods=['GET', 'POST'])
def guide():
    return render_template('guide.html', response=None)

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "")
    return jsonify(
        {
            "ok": True,
            "message": "Kirish (demo) — autentifikatsiya hali ulanmagan.",
            "received_email": bool(email),
        }
    )


@app.route("/api/signup", methods=["POST"])
def api_signup():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "")
    email = data.get("email", "")
    return jsonify(
        {
            "ok": True,
            "message": "Ro'yxatdan o'tish (demo) — foydalanuvchi bazasi hali yo'q.",
            "received": bool(name and email),
        }
    )


@app.route("/api/quiz-results", methods=["POST"])
def api_quiz_results():
    data = request.get_json(silent=True) or {}
    answers = data.get("answers")
    result = compute_profession(answers)
    if result is None:
        return jsonify(
            {"ok": False, "error": "Kutilmoqda: 'answers': 0–3 oralig'ida 6 ta raqam"}
        ), 400
    return jsonify({"ok": True, **result})


@app.route("/api/ask-guide", methods=["POST"])
def api_ask_guide():
    data = request.get_json(silent=True) or {}
    prompt = (data.get("prompt") or "").strip()
    lang = (data.get("lang") or "uz").strip().lower()
    try:
        reply = ask_ai(prompt, lang=lang)
        return jsonify({"ok": True, "reply": reply})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


if __name__ == "__main__":
    print(
        "\n  Studygid — brauzerda oching (Chrome, Edge, Firefox):\n"
        "    http://127.0.0.1:5000\n"
        "  index.html faylini papkadan ochmang; server ishga tushirilgan bo'lishi kerak.\n"
    )
    app.run(debug=True, host="127.0.0.1", port=5000)
