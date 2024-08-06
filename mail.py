import asyncio
import email
from email.header import decode_header
from email.message import Message
from typing import Optional
from loguru import logger
from aioimaplib import aioimaplib


class ImapEmail:
    def __init__(self, email_address, password):
        self.email_address = email_address
        self.password = password
        self.mail = aioimaplib.IMAP4_SSL("imap-mail.outlook.com")

    async def login(self):
        await self.mail.wait_hello_from_server()
        await self.mail.login(self.email_address, self.password)

    async def logout(self):
        await self.mail.logout()

    async def _find_email(self, folder: str, subject_condition_func) -> Optional[str]:
        _, messages = await self.mail.select(folder)
        msg_cnt = 0
        for message in messages:
            if message.endswith(b'EXISTS'):
                msg_cnt = int(message.split()[0])
                break
        for i in range(msg_cnt, 0, -1):
            res, msg = await self.mail.fetch(str(i), '(RFC822)')
            if res != 'OK':
                continue
            raw_email = msg[1]
            msg = email.message_from_bytes(raw_email)
            subject, encoding = decode_header(msg['Subject'])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else 'utf-8')
            if subject_condition_func(subject):
                return self.get_email_body(msg)
        return None

    def get_email_body(self, msg: Message):
        if msg.is_multipart():
            return self.get_email_body(msg.get_payload(0))
        return msg.get_payload(decode=True).decode()

    async def find_email(self, subject_condition_func) -> Optional[str]:
        try:
            result = await self._find_email('INBOX', subject_condition_func)
            if result is not None:
                return result
            return None
        except Exception as e:
            raise Exception(f'Find email failed: {str(e)}')

    async def wait_for_email(self, subject_condition_func, timeout=90, polling=10) -> Optional[str]:
        exc_cnt = 0
        for t in range(0, timeout + 1, polling):
            await asyncio.sleep(polling)
            try:
                result = await self.find_email(subject_condition_func)
                exc_cnt = 0
            except Exception as e:
                exc_cnt += 1
                if exc_cnt > 2:
                    raise Exception(f'Wait for email failed: {str(e)}')
                logger.warning(f'Wait for email failed: {str(e)}')
                result = None

            if result is not None:
                return result

            logger.info(f'Email not found. Waiting for {polling}s')

        raise Exception(f'Email was not found')
