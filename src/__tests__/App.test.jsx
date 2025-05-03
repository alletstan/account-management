import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Component: App", () => {
    it("should render", () => {
        const result = render(<App />);
        screen.getByRole("heading", { name: "Bank Account Management" });
        screen.getByText("Add New Account");
        expect(result).toMatchSnapshot();
    });
    it("should create a new bank account", async () => {
        const result = render(<App />);
        const nameField = screen.getByRole("textbox", { name: "Name" })
        await userEvent.click(nameField);
        await userEvent.paste("Account Name 1");
        const balanceField = screen.getByRole("spinbutton", { name: "Balance" });
        await userEvent.click(balanceField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        await screen.findByText("Balance: $100");
        expect(result).toMatchSnapshot();
    });
    it("should deposit money", async () => {
        render(<App />);
        const nameField = screen.getByRole("textbox", { name: "Name" })
        await userEvent.click(nameField);
        await userEvent.paste("Account Name 1");
        const balanceField = screen.getByRole("spinbutton", { name: "Balance" });
        await userEvent.click(balanceField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        await screen.findByText("Balance: $100");
        const depositField = screen.getByRole("spinbutton", { name: "Deposit" });
        await userEvent.click(depositField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Deposit" }));
        await screen.findByText("Balance: $200");
    });
    it("should withdraw money", async () => {
        render(<App />);
        const nameField = screen.getByRole("textbox", { name: "Name" })
        await userEvent.click(nameField);
        await userEvent.paste("Account Name 1");
        const balanceField = screen.getByRole("spinbutton", { name: "Balance" });
        await userEvent.click(balanceField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        await screen.findByText("Balance: $100");
        const withdrawField = screen.getByRole("spinbutton", { name: "Withdraw" });
        await userEvent.click(withdrawField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Withdraw" }));
        await screen.findByText("Balance: $0");
    });
    it("should transfer money", async () => {
        render(<App />);
        const nameField = screen.getByRole("textbox", { name: "Name" })
        const balanceField = screen.getByRole("spinbutton", { name: "Balance" });
        await userEvent.click(nameField);
        await userEvent.paste("Account Name 1");
        await userEvent.click(balanceField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        await screen.findByText("Balance: $100");
        await userEvent.click(nameField);
        await userEvent.clear(nameField);
        await userEvent.paste("Account Name 2");
        await userEvent.click(balanceField);
        await userEvent.clear(balanceField);
        await userEvent.paste("200");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        await screen.findByText("Balance: $200");
        const transferToField = screen.getAllByRole("textbox", { name: "Transfer To Transfer To" })[0]
        await userEvent.click(transferToField);
        await userEvent.paste("Account Name 2");
        const transferAmountField = screen.getAllByRole("spinbutton", { name: "Transfer Amount Transfer Amount" })[0];
        await userEvent.click(transferAmountField);
        await userEvent.paste("10");
        await userEvent.click(screen.getAllByRole("button", { name: "Transfer" })[0]);
        await screen.findByText("Balance: $90"); // Account Name 1
        await screen.findByText("Balance: $210"); // Account Name 2
    });
    it("should show transaction history", async () => {
        const result = render(<App />);
        const nameField = screen.getByRole("textbox", { name: "Name" })
        const balanceField = screen.getByRole("spinbutton", { name: "Balance" });
        await userEvent.click(nameField);
        await userEvent.paste("Account Name 1");
        await userEvent.click(balanceField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        await screen.findByText("Balance: $100");
        await userEvent.click(screen.getByRole("button", { name: "View Transaction History" }));
        await screen.findByRole("dialog");
        await screen.findByRole("heading", { name: "Account Name 1's Transaction History" });
    });
});