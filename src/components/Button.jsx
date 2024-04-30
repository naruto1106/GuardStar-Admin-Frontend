
const Button = (props) => {
    const { name, size, variant, handleChange } = props;

    const getStyle = (variant) => {
        switch(variant) {
            case 'primary-normal':
                return 'bg-closingCheck'
            case 'primary-small':
                return 'bg-clickFill'
            case 'secondary-normal':
                return 'bg-openingCheck'
            case 'secondary-small':
                return 'bg-green'
            default:
                return `${variant}`
                break;
        }
    }
    const getSize = (size) => {
        switch(size) {
            case 'small':
                return 'w-[150px]';
            case 'normal':
                return 'w-[300px]';
            default: 
                break;
        }
    }

    return (
        <button onClick={handleChange} className={`py-3 ${getSize(size)} ${getStyle(variant)} shadow uppercase`}>
            { name }
        </button>
    )
}

export default Button