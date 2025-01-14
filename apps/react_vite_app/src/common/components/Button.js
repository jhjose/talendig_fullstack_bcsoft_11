export const Button = ({children, ...props}) => {
    return (
        <button className="common-button" {...props}>
            {children}
        </button>
    )
}