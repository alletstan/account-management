import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, TextField } from "@mui/material";
import { useState } from "react";

const AccountCreation = ({
    onAdd,
}) => {
    const [name, setName] = useState(undefined);
    const [balance, setBalance] = useState(undefined);

    const handleNameChange = (event) => {
        setName(event?.target?.value);
    }

    const handleBalanceChange = (event) => {
        setBalance(event?.target?.value);
    }

    const handleAddAccount = () => {
        onAdd(name, balance);
    }

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Add New Account
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        <TextField id="input-name" label="Name" variant="standard" value={name} onChange={handleNameChange} />
                        <TextField
                            id="input-balance"
                            label="Balance"
                            type="number"
                            variant="standard"
                            value={balance}
                            onChange={handleBalanceChange}
                        />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={handleAddAccount}>Add</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default AccountCreation;
