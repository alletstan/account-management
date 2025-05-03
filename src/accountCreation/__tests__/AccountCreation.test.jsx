import userEvent from "@testing-library/user-event";
import AccountCreation from "../AccountCreation";

const onAdd = vi.fn();

const renderComponent = () => {
    return render(<AccountCreation onAdd={onAdd} />)
};

describe('Component: AccountCreation', () => {
    it('should render', () => {
        const result = renderComponent();
        expect(screen.getByText('Add New Account')).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
        expect(screen.getByRole("spinbutton", { name: "Balance" })).toBeInTheDocument();
        expect(result).toMatchSnapshot();
    });
    it('should call onAdd successfully', async () => {
        renderComponent();
        const nameField = screen.getByRole("textbox", { name: "Name" })
        await userEvent.click(nameField);
        await userEvent.paste("Account Name 1");
        const balanceField = screen.getByRole("spinbutton", { name: "Balance" });
        await userEvent.click(balanceField);
        await userEvent.paste("100");
        await userEvent.click(screen.getByRole("button", { name: "Add" }));
        expect(onAdd).toHaveBeenCalledWith('Account Name 1', '100');
    });
});