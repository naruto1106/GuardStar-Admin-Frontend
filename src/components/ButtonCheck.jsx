
const ButtonCheck = (props) => {
    const { label, variant, color, handleClick, size } = props;
    const getStyle = (variant) => {
        switch(variant) {
            case 'primary':
                return 'bg-[#00C26C]'
            case 'secondary':
                return 'bg-white'
            default:
                break;
        }
    }
    const getColor = (color) => {
        switch(color) {
            case 'primary':
                return 'text-white'
            case 'secondary':
                return 'text-[#00C26C]'
            default:
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


    return(
        <button onClick={handleClick} className={`${getStyle(variant)} ${getSize(size)} ${getColor(color)} font-bold py-2 px-4 mx-2 border-[1px] rounded border-[#00C26C]`}>
            { label }
        </button>
    )
}

export default ButtonCheck