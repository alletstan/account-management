import { Button, Card, CardActions, CardContent, ListItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TransactionHistoryDialog from "./TransactionHistoryDialog";

const ExistingAccount = ({
    account,
    onDeposit,
    onTransfer,
    onWithdraw,
}) => {
    const [depositAmount, setDepositAmount] = useState(undefined);
    const [withdrawAmount, setWithdrawAmount] = useState(undefined);
    const [transferAmount, setTransferAmount] = useState(undefined);
    const [toAccount, setToAccount] = useState(undefined);
    const [showTransactionHistoryDialog, setShowTransactionHistoryDialog] = useState(false);

    const handleDepositChange = (event) => {
        setDepositAmount(event?.target?.value);
    }

    const handleDeposit = () => {
        onDeposit(account.name, depositAmount);
    }

    const handleWithdrawChange = (event) => {
        setWithdrawAmount(event?.target?.value);
    }

    const handleWithdraw = () => {
        onWithdraw(account.name, withdrawAmount);
    }

    const handleToAccountChange = (event) => {
        setToAccount(event?.target?.value);
    }

    const handleTransferAmountChange = (event) => {
        setTransferAmount(event?.target?.value);
    }

    const handleTransfer = () => {
        onTransfer(account.name, toAccount, transferAmount);
    };

    const handleViewHistory = () => {
        setShowTransactionHistoryDialog(true);
    };

    const handleCloseDialog = () => {
        setShowTransactionHistoryDialog(false);
    }

    return (
        <>
            <Card variant="outlined" name={account.name}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {account.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        Balance: ${account.balance}
                    </Typography>
                    <Typography variant="body2">
                        <Stack spacing={2}>
                            <ListItem>
                                <TextField
                                    id="input-deposit"
                                    label="Deposit"
                                    type="number"
                                    variant="outlined"
                                    value={depositAmount}
                                    onChange={handleDepositChange}
                                />
                                <Button variant="outlined" onClick={handleDeposit}>Deposit</Button>
                            </ListItem>

                            <ListItem>
                                <TextField
                                    id="input-withdraw"
                                    label="Withdraw"
                                    type="number"
                                    variant="outlined"
                                    value={withdrawAmount}
                                    onChange={handleWithdrawChange}
                                />
                                <Button variant="outlined" onClick={handleWithdraw}>Withdraw</Button>
                            </ListItem>

                            <ListItem>
                                <TextField id="input-transfer-to" label="Transfer To" variant="standard" value={toAccount} onChange={handleToAccountChange} />
                                <TextField
                                    id="input-transfer-amount"
                                    label="Transfer Amount"
                                    type="number"
                                    variant="standard"
                                    value={transferAmount}
                                    onChange={handleTransferAmountChange}
                                />
                                <Button variant="outlined" onClick={handleTransfer}>Transfer</Button>
                            </ListItem>
                        </Stack>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleViewHistory}>View Transaction History</Button>
                </CardActions>
            </Card>

            {showTransactionHistoryDialog &&
                <TransactionHistoryDialog
                    account={account}
                    onClose={handleCloseDialog} />
            }
        </>);
};

export default ExistingAccount;