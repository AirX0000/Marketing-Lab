import os
from app import create_app
from app.models.base import db
from app.seed import run_seed

app = create_app(os.environ.get("FLASK_ENV", "development"))

with app.app_context():
    # Ensure database tables exist
    db.create_all()
    # Populate seed data if empty
    run_seed()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=app.config.get("DEBUG", False))
