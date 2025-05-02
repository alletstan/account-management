import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const TransactionHistoryDialog = ({
    account,
    onClose,
}) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open
            onClose={handleClose}>
            <DialogTitle>{account.name}'s Transaction History</DialogTitle>
            <DialogContent>
                {account.history?.map(transaction => {
                    return (
                        <Card>
                            <CardContent>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {transaction}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionHistoryDialog;