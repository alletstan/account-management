import userEvent from "@testing-library/user-event";
import TransactionHistoryDialog from "../TransactionHistoryDialog";

const onClose = vi.fn();
const account = {
    name: "Test Account 1",
    balance: 100,
    history: ["Test History"],
};

const renderComponent = () => {
    return render(<TransactionHistoryDialog
        account={account}
        onClose={onClose} />);
};

describe("Component: TransactionHistoryDialog", () => {
    it("should render", () => {
        const result = renderComponent();
        expect(screen.getByRole('dialog'));
        expect(screen.getByRole("heading", {name: "Test Account 1's Transaction History"})).toBeInTheDocument();
        expect(screen.getByText("Test History")).toBeInTheDocument();
        expect(result).toMatchSnapshot();
    });
    it("should call onClose", async () => {
        renderComponent();
        await userEvent.click(screen.getByRole('button', {name: 'Close'}));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});