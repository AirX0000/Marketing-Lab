from flask import Blueprint, request, jsonify, current_app
from app.models.base import db
from app.models.user import User

webhook_bp = Blueprint("webhook", __name__, url_prefix="/api/v1/webhooks")

@webhook_bp.route("/telegram", methods=["POST"])
def telegram_webhook():
    """Process incoming updates from Phoenix Telegram Bot."""
    update = request.get_json(silent=True)
    if not update or "message" not in update:
        return jsonify({"ok": True}), 200

    message = update["message"]
    chat_id = message.get("chat", {}).get("id")
    text = (message.get("text") or "").strip()
    from_user = message.get("from", {})
    username = from_user.get("username", "")

    if not chat_id:
        return jsonify({"ok": True}), 200

    # Command Router
    reply_text = ""
    if text.startswith("/start"):
        # Check for deep-linking user token: e.g. /start user_id_123
        parts = text.split()
        if len(parts) > 1:
            token_user_id = parts[1]
            user = db.session.query(User).filter_by(id=token_user_id).first()
            if user:
                user.telegram_id = str(chat_id)
                user.telegram_username = username
                user.xp_points += 50  # Telegram sync bonus
                db.session.commit()
                reply_text = f"🔥 Welcome, {user.full_name}! Your Phoenix account has been linked. You earned +50 XP bonus!\n\nUse /progress to view your CEFR level and streak, or /daily for today's IT English challenge."
            else:
                reply_text = "Welcome to Phoenix Learning Center Bot! To link your web profile, log in at https://phoenix-edtech.io and click 'Connect Telegram'."
        else:
            reply_text = "🦅 *Phoenix English Bot for Tech & Business*\n\nCommands:\n• /progress — View your CEFR rank, streak & XP\n• /daily — Receive today's IT standup idiom & micro-quiz\n• /support — Contact student advisor"

    elif text == "/progress":
        user = db.session.query(User).filter_by(telegram_id=str(chat_id)).first()
        if user:
            reply_text = (
                f"📊 *Phoenix Student Progress*\n\n"
                f"👤 Name: {user.full_name}\n"
                f"🎯 CEFR Level: {user.cefr_level or 'Diagnostic pending'}\n"
                f"⚡ XP Points: {user.xp_points}\n"
                f"🔥 Daily Streak: {user.streak_days} days\n"
                f"💼 Domain: {user.target_domain} English\n\n"
                f"Keep up the momentum! Complete your next module on the web platform."
            )
        else:
            reply_text = "⚠️ You have not connected your Phoenix web account yet. Use the link on your web dashboard to sync your progress."

    elif text == "/daily":
        reply_text = (
            "💡 *Daily Tech English Micro-Bite*\n\n"
            "*Phrase:* 'To deprecate gracefully'\n"
            "*Meaning:* To phase out a software feature or API endpoint systematically while offering backward compatibility.\n\n"
            "*Example in Tech Standup:*\n"
            "\"We're deprecating the v1 auth endpoint gracefully by routing fallback headers, so mobile clients have two sprints to upgrade.\"\n\n"
            "Earn +20 XP on the web portal by taking today's vocabulary drill!"
        )

    else:
        reply_text = "Unknown command. Try /progress or /daily."

    # In production, Telegram Bot API `sendMessage` is called using current_app.config['TELEGRAM_BOT_TOKEN'].
    # For robust webhook handling, we return structured acknowledgment.
    return jsonify({
        "ok": True,
        "chat_id": chat_id,
        "reply_preview": reply_text
    }), 200
