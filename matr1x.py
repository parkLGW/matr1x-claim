# coding:utf-8
import asyncio
import json
import random
import re
from web3 import Web3
from loguru import logger
import execjs
from eth_account.account import Account
from eth_account.messages import encode_defunct
from curl_cffi.requests import AsyncSession, BrowserType
from fake_useragent import UserAgent
from mail import ImapEmail


class Matr1x:
    def __init__(self, idx, private_key, user_agent, proxy, email, email_pwd):
        self.idx = idx
        self.address = Account.from_key(private_key).address
        self.private_key = private_key
        self.headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-HK,zh-TW;q=0.9,zh;q=0.8',
            'content-type': 'application/json; charset=UTF-8',
            'origin': 'https://matr1x.io',
            'priority': 'u=1, i',
            'referer': 'https://matr1x.io/',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': user_agent,
        }
        self.proxies = {
            "http": f"socks5://{proxy}",
            "https": f"socks5://{proxy}"
        }
        self.sess = AsyncSession(
            proxies=self.proxies,
            impersonate=BrowserType.chrome124
        )
        self.email = email
        self.email_pwd = email_pwd
        self.receive_addr = self.address if RecvAddr == '' else RecvAddr

    def get_sign_msg(self, message):
        encoded_msg = encode_defunct(text=message)
        signed_msg = Web3().eth.account.sign_message(encoded_msg, private_key=self.private_key)
        signature = signed_msg.signature.hex()

        return signature

    async def get_email_code(self, title_substring):
        email = ImapEmail(self.email, self.email_pwd)
        await email.login()

        email_text = await email.wait_for_email(lambda s: title_substring in s, polling=20)

        pattern = re.compile('[^0-9]+([0-9]{6})\r\n')
        res = pattern.findall(email_text)

        if not res:
            raise Exception(f"account {self.idx} get email code failed ❌")

        await email.logout()

        logger.info(f"account {self.idx} got email code success :{res[0]}")
        return res[0]

    @staticmethod
    async def get_headers_data(req_data, token):
        node = execjs.get()
        f = open('matr1x.js', encoding='utf-8')
        ctx = node.compile(f.read())

        req_id = ctx.call('request_id', '')
        timestamp = ctx.call('gen_timestamp')
        sign = ctx.call('get_sign', req_data, req_id, timestamp, token)

        return req_id, timestamp, sign

    @staticmethod
    async def get_request_data(req_data):
        node = execjs.get()
        f = open('matr1x.js', encoding='utf-8')
        ctx = node.compile(f.read())

        encrypt_data = ctx.call('encrypt_data', req_data)

        return encrypt_data

    @staticmethod
    async def get_withdraw_verify_id(prefix):
        node = execjs.get()
        f = open('matr1x.js', encoding='utf-8')
        ctx = node.compile(f.read())

        withdraw_verify_id = ctx.call('request_id', prefix)

        return withdraw_verify_id

    async def check_airdrop(self):
        req_data = json.dumps({"walletAddress": self.address}, ensure_ascii=False)

        request_id, timestamp, sign = await self.get_headers_data(req_data, '')
        headers = self.headers.copy()
        headers.update({
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-points/points-settlement/overview',
                                        headers=headers, data=data)

        res = json.loads(response.text)

        stages_rewards = res['data']['stages']

        all_max = 0
        for stage in stages_rewards:
            all_max += stage['personalReward']

        claimable_max = stages_rewards[0]['personalReward']

        if claimable_max != 0:
            logger.info(f"account {self.idx} total: {all_max} $MAX ,claimable: {claimable_max} $MAX")

        return claimable_max

    async def _send_email_code(self):
        req_data = json.dumps(
            {
                "email": self.email,
                "type": 1
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, '')
        headers = self.headers.copy()
        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/mail/sendEmailCode', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} send email code failed❌")

        logger.success(f"account {self.idx}  send email code success✔")

    async def register(self):
        await self._send_email_code()
        verify_code = await self.get_email_code("Your verification code is")

        req_data = json.dumps(
            {
                "loginId": self.email,
                "passwd": RegisterPassword,
                "verifyCode": verify_code,
                "method": 8,
                "device": "",
                "system": "Windows"
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, '')
        headers = self.headers.copy()
        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/loginMethod/register', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} register failed❌")

        res = json.loads(response.text)
        self.headers.update({
            'authorization': res['data']['loginToken']
        })
        logger.success(f"account {self.idx} register success✔")

    async def login(self):
        req_data = json.dumps(
            {
                "loginId": self.email,
                "method": 8,
                "passwd": RegisterPassword,
                "device": "",
                "system": "Windows"
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, '')
        headers = self.headers.copy()
        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/loginMethod/login', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} login failed❌")

        res = json.loads(response.text)
        self.headers.update({
            'authorization': res['data']['loginToken']
        })
        logger.success(f"account {self.idx} login success✔")

    async def _get_wallet_sign(self):
        headers = self.headers.copy()
        req_data = json.dumps(
            {},
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/wallet/getWalletSign', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} register failed❌")

        res = json.loads(response.text)
        return res['data']['sign']

    async def _wallet_check(self):
        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "walletAddress": self.address
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/wallet/check', headers=headers, data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} check wallet failed❌")

        logger.info(f"account {self.idx} check wallet success✔")

    async def wallet_add(self):
        sign_message = await self._get_wallet_sign()
        signature = self.get_sign_msg(sign_message)

        await self._wallet_check()

        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "signedMsgInHex": signature,
                "walletAddress": self.address
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/wallet/add', headers=headers, data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx}  wallet add failed❌")

        logger.info(f"account {self.idx} wallet add success ✔")

    async def get_safe_wallet_sign(self):
        headers = self.headers.copy()
        req_data = json.dumps(
            {},
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/getWalletSign', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} get safe wallet sign failed❌")

        res = json.loads(response.text)
        return res['data']['sign']

    async def send_email_code_with_check(self, business_type, op_type):
        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "email": self.email,
                "type": 3,
                "businessType": business_type,
                "opType": op_type
            }
            ,
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/mail/sendEmailCodeWithCheck',
                                        headers=headers, data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} send email code with check failed❌")

        logger.info(f"account {self.idx} send email code with check success ✔")

    async def add_user_account_safe(self, json_data):
        headers = self.headers.copy()
        req_data = json.dumps(
            json_data,
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/addUserAccountSafe', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} add_user_account_safe failed❌")

        res = json.loads(response.text)
        return res['data']['recordNo']

    # query_user_check_safe

    async def check_user_account_safe(self, json_data):
        headers = self.headers.copy()
        req_data = json.dumps(
            json_data,
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/checkUserAccountSafe', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} check user account safe failed❌")

        logger.info(f"account {self.idx} check user account safe success ✔")

    async def auth_user_account_safe(self, record_no, auth_type):
        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "recordNo": record_no,
                "type": auth_type
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/authUserAccountSafe', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} auth user account safe failed❌")

        logger.info(f"account {self.idx} auth user account safe success ✔")

    async def query_user_account_safe(self):
        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "type": 0
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/queryUserAccountSafe', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} query user account safe failed❌")

        logger.info(f"account {self.idx} query user account safe success ✔")

    async def _claim_wallet_sign(self):
        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "signBizType": 1,
                "walletAddress": self.address
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-points/wallets/sign', headers=headers, data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} get claim sign failed❌")

        res = json.loads(response.text)
        return res['data']

    async def claim_max(self):
        sign_message = await self._claim_wallet_sign()

        headers = self.headers.copy()
        req_data = json.dumps(
            {
                "signMsgInHex": self.get_sign_msg(sign_message),
                "walletAddress": self.address,
                "stage": 1
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)
        response = await self.sess.post('https://api.matr1x.io/matr1x-points/points-settlement/claim', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} claim $MAX failed❌")

        logger.info(f"account {self.idx} claim $MAX success ✔")

    async def query_user_check_safe(self, record_no):
        headers = self.headers.copy()

        req_data = json.dumps(
            {
                "recordNo": record_no
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/queryUserCheckSafe', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} query suer check safe failed❌")

        logger.info(f"account {self.idx} query suer check safe success ✔")

    async def check_business_security(self, json_data):
        headers = self.headers.copy()
        req_data = json.dumps(
            json_data,
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-user/safe/checkBusinessSecurity', headers=headers,
                                        data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} check business security failed❌")

        logger.info(f"account {self.idx} check business security success ✔")

    async def bill_withdraw(self, record_no, claimable_amount):
        headers = self.headers.copy()
        trans_no = await self.get_withdraw_verify_id("withDrawMAX")
        req_data = json.dumps(
            {
                "chainName": "polygon",
                "toAddress": self.receive_addr,
                "tokenAmount": round(claimable_amount, 5),
                "tokenName": "MAX",
                "tokenType": 1,
                "transNo": trans_no,
                "securityRecordNo": record_no
            },
            ensure_ascii=False
        )

        request_id, timestamp, sign = await self.get_headers_data(req_data, headers['authorization'])

        headers.update({
            'authority': 'api.matr1x.io',
            'requestid': request_id,
            'timestamp': str(timestamp),
            'sign': sign
        })

        data = await self.get_request_data(req_data)

        response = await self.sess.post('https://api.matr1x.io/matr1x-bill/bill/withdraw', headers=headers, data=data)

        if response.status_code != 200:
            raise Exception(f"account {self.idx} bill withdraw failed❌")

        logger.success(f"account {self.idx} bill withdraw success ✔")

    async def setup_security_verification(self):
        await self.wallet_add()
        wallet_setup_data = {
            "content": self.address,
            "type": 2,
            "device": "",
            "system": "Windows"
        }
        record_no = await self.add_user_account_safe(wallet_setup_data)
        await self.query_user_check_safe(record_no)
        await self.send_email_code_with_check(2, 2)

        verify_code = await self.get_email_code("Change wallet verification")
        check_email_data = {
            "recordNo": record_no,
            "type": "1",
            "content": self.email,
            "verifyCode": verify_code
        }
        await self.check_user_account_safe(check_email_data)
        await self.auth_user_account_safe(record_no, 2)
        await self.query_user_account_safe()

        safety_pwd_setup_data = {
            "content": SafetyPassword,
            "type": 3,
            "device": "",
            "system": "Windows"
        }
        record_no = await self.add_user_account_safe(safety_pwd_setup_data)
        await self.query_user_check_safe(record_no)
        await self.send_email_code_with_check(3, 1)

        verify_code = await self.get_email_code("Setting security password verification")
        check_email_data = {
            "recordNo": record_no,
            "type": "1",
            "content": self.email,
            "verifyCode": verify_code
        }
        await self.check_user_account_safe(check_email_data)
        sign_message = await self.get_safe_wallet_sign()
        check_wallet_data = {
            "recordNo": record_no,
            "type": "2",
            "signedMsgInHex": self.get_sign_msg(sign_message),
            "content": self.address
        }
        await self.check_user_account_safe(check_wallet_data)
        await self.auth_user_account_safe(record_no, 3)
        await self.query_user_account_safe()

        logger.success(f"account {self.idx} set up security verification success ✔")

    async def claim_and_withdraw(self, claimable_amount):
        await self.claim_max()

        record_no = await self.get_withdraw_verify_id("withDrawMAXVerify")
        await self.query_user_check_safe(record_no)

        sign_message = await self.get_safe_wallet_sign()
        wallet_security_data = {
            "recordNo": record_no,
            "type": "2",
            "signedMsgInHex": self.get_sign_msg(sign_message),
            "content": self.address
        }
        await self.check_business_security(wallet_security_data)

        safe_code_security_data = {
            "recordNo": record_no,
            "type": "3",
            "content": SafetyPassword
        }
        await self.check_business_security(safe_code_security_data)
        await self.bill_withdraw(record_no, claimable_amount)


def read_files():
    with open('files/private_keys.txt', 'r', encoding='utf-8') as file:
        accounts = file.read().splitlines()
        accounts = [w.strip().split(',') for w in accounts]
    with open('files/proxies.txt', 'r', encoding='utf-8') as file:
        proxies = file.read().splitlines()
        proxies = [p.strip() for p in proxies]
    with open('files/emails.txt', 'r', encoding='utf-8') as file:
        emails = file.read().splitlines()
        emails = [w.strip().split(',') for w in emails]

    return accounts, proxies, emails


async def start_matr1x(semaphore, idx, private_key, proxy, email, email_pwd):
    async with semaphore:
        user_agent = UserAgent(browsers='chrome').random
        matr1x = Matr1x(idx, private_key, user_agent, proxy, email, email_pwd)
        await asyncio.sleep(random.randint(RandomSleepLeft, RandomSleepRight))
        try:
            claimable_amount = await matr1x.check_airdrop()
            if claimable_amount < 10:
                logger.warning(f"account {matr1x.idx} balance less than 10 $MAX, cannot withdraw")
                return
            # await matr1x.login()
            await matr1x.register()
            await asyncio.sleep(3)

            await matr1x.setup_security_verification()
            await asyncio.sleep(4)

            await matr1x.claim_and_withdraw(claimable_amount)
        except Exception as e:
            logger.error(f"account ({matr1x.idx}) complete quest failed ❌：{e}")


async def main(sync_num):
    accounts, proxies, emails = read_files()

    match_account_num = min([len(accounts), len(proxies), len(emails)])

    semaphore = asyncio.Semaphore(sync_num)
    missions = []

    for idx in range(match_account_num):
        private_key = accounts[idx]
        proxy = proxies[idx]
        email, email_pwd = emails[idx][0], emails[idx][1]

        missions.append(
            asyncio.create_task(
                start_matr1x(semaphore, idx + 1, private_key, proxy, email, email_pwd)))

    await asyncio.gather(*missions)


if __name__ == '__main__':
    SyncNum = 10
    RandomSleepLeft = 10
    RandomSleepRight = 20
    SafetyPassword = ''  # 六位数安全码
    RegisterPassword = ''  # 注册密码
    RecvAddr = ''  # 如果填写则所有账号的$MAX都会转到这个地址，否则默认转到账号对应地址
    asyncio.run(main(SyncNum))
