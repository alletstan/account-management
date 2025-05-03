import userEvent from "@testing-library/user-event";
import ExistingAccount from "../ExistingAccount";

const onDeposit = vi.fn();
const onTransfer = vi.fn();
const onWithdraw = vi.fn();
const account = {
    name: "Test Account 1",
    balance: 100,
    history: ["Test"],
};

const renderComponent = () => {
    return render(<ExistingAccount
        account={account}
        onDeposit={onDeposit}
        onTransfer={onTransfer}
        onWithdraw={onWithdraw}
    />);
};

describe("Component: ExistingAccount", () => {
    it("should render", () => {
        const result = renderComponent();
        expect(screen.getByRole("spinbutton", { name: "Deposit" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Deposit" })).toBeInTheDocument();
        expect(screen.getByRole("spinbutton", { name: "Withdraw" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Withdraw" })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Transfer To" })).toBeInTheDocument();
        expect(screen.getByRole("spinbutton", { name: "Transfer Amount" })).toBeInTheDocument();
        expect(result).toMatchSnapshot();
    });
    it("should call onDeposit successfully", async () => {
        renderComponent();
        const depositField = screen.getByRole("spinbutton", { name: "Deposit" });
        await userEvent.click(depositField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Deposit" }));
        expect(onDeposit).toHaveBeenCalledWith("Test Account 1", "100");
    });
    it("should call onWithdraw successfully", async () => {
        renderComponent();
        const withdrawField = screen.getByRole("spinbutton", { name: "Withdraw" });
        await userEvent.click(withdrawField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Withdraw" }));
        expect(onWithdraw).toHaveBeenCalledWith("Test Account 1", "100");
    });
    it("should call onTransfer successfully", async () => {
        renderComponent();
        const transferToField = screen.getByRole("textbox", { name: "Transfer To" })
        await userEvent.click(transferToField);
        await userEvent.paste("Account Name 2");
        const transferAmountField = screen.getByRole("spinbutton", { name: "Transfer Amount" });
        await userEvent.click(transferAmountField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Transfer" }));
        expect(onTransfer).toHaveBeenCalledWith("Test Account 1", "Account Name 2", "100");
    });
});