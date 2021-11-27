import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { Link } from "react-router-dom";

const DowRow = ({ id, fileName, date }) => {
    return (
        <Link to={`/doc/${id}`} className="flex max-w-3xl mx-auto items-center p-4 rounded-lg hover:bg-gray-300 cursor-pointer text-gray-700 text-sm">
            <Icon name="article" size="3xl" color="blue" />
            <p className="flex-grow pl-5 pr-10 truncate">{fileName}</p>
            <p className="pr-5 text-sm">{`${date?.toDate()?.toDateString('en-US')} at ${date?.toDate()?.toLocaleTimeString('en-US')}`}</p>

            <Button
                color="gray"
                buttonType="outline"
                ripple="dark"
                iconOnly={true}
                rounded={true}
                className="border-0"
            >
                <Icon name="more_vert" size="3xl" />
            </Button>
        </Link>
    );
};

export default DowRow;