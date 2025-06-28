import unittest
from model.transfer import Transfer
from model.account import Account
from model.account_type import AccountType

class TestTransfer(unittest.TestCase):
    def test_execute_transfers_funds(self):
        src = Account('checking', AccountType.BANK, 100)
        dst = Account('savings', AccountType.BANK, 0)
        transfer = Transfer('move', 60, 2024, src, dst)
        withdrawal = transfer.execute()
        self.assertAlmostEqual(src.balance(), 40.0, places=2)
        self.assertAlmostEqual(dst.balance(), 60.0, places=2)
        self.assertEqual(withdrawal.amount, 60.0)
        self.assertEqual(transfer.transfered_amount, 60.0)

if __name__ == '__main__':
    unittest.main()
