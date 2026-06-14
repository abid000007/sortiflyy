from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS', 'abidrahim05@gmail.com')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD', '')
RECIPIENT_EMAIL = 'abidrahim05@gmail.com'

@app.route('/api/demo-request', methods=['POST'])
def demo_request():
    try:
        data = request.json

        # Validate required fields
        required_fields = ['name', 'company', 'email', 'industry']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Compose email
        subject = f"New Demo Request from {data['name']} - {data['company']}"

        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #ff5c33; margin-bottom: 20px;">New Demo Request from Sortifly Website</h2>

                    <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #ff5c33; margin-bottom: 20px;">
                        <p><strong>Name:</strong> {data.get('name', 'N/A')}</p>
                        <p><strong>Company:</strong> {data.get('company', 'N/A')}</p>
                        <p><strong>Email:</strong> {data.get('email', 'N/A')}</p>
                        <p><strong>Phone:</strong> {data.get('phone', 'N/A')}</p>
                        <p><strong>Industry:</strong> {data.get('industry', 'N/A')}</p>
                    </div>

                    {f'<div style="background-color: #f9f9f9; padding: 20px; margin-bottom: 20px;"><h3 style="color: #333; margin-top: 0;">Message:</h3><p style="color: #666; line-height: 1.6;">{data.get("message", "No message provided")}</p></div>' if data.get('message') else ''}

                    <p style="color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
                        This is an automated email from your Sortifly website.
                    </p>
                </div>
            </body>
        </html>
        """

        # Send email
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = EMAIL_ADDRESS
            msg['To'] = RECIPIENT_EMAIL

            msg.attach(MIMEText(html_body, 'html'))

            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()

            # Try with email and password if available
            if EMAIL_PASSWORD:
                server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

            server.send_message(msg)
            server.quit()

        except Exception as e:
            print(f"Email error: {str(e)}")
            # Still return success even if email fails
            pass

        return jsonify({
            'success': True,
            'message': 'Demo request received! We will contact you soon.'
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/pricing', methods=['GET'])
def pricing():
    return jsonify({
        'plans': [
            {
                'name': 'Starter',
                'price': '$2,000',
                'description': 'Build your first agent',
                'features': ['1 AI Agent', 'Inbound calling', 'Basic integrations', '24/7 support']
            },
            {
                'name': 'Professional',
                'price': '$5,000',
                'description': 'Scale your automation',
                'features': ['3 AI Agents', 'Inbound + Outbound', 'CRM sync', 'Lead scoring', 'Priority support']
            },
            {
                'name': 'Enterprise',
                'price': 'Custom',
                'description': 'For large organizations',
                'features': ['Unlimited agents', 'Custom workflows', 'Dedicated support', 'SLA guarantee']
            }
        ]
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
