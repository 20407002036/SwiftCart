from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import smtplib

from dotenv import load_dotenv

load_dotenv()

class Comms:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER")
        self.smtp_port = os.getenv("SMTP_PORT")
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")


    def send_email(self, to, subject, body):
        msg = MIMEMultipart()
        msg['From'] = self.smtp_user
        msg['To'] = to
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(self.smtp_server, int(self.smtp_port))
        server.starttls()
        server.login(self.smtp_user, self.smtp_password)
        text = msg.as_string()
        server.sendmail(self.smtp_user, to, text)
        server.quit()


    def send_SMS(self, message, to_Phone_Numbers, subject, body):
        pass
