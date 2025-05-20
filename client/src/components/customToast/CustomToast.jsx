import './customToast.css';

const CustomToast = ({username, content, avatar}) => {
    return (
        <div className="custom-toast">
            <img src={avatar} alt="avatar" className="toast-avatar" />
            <div className="toast-content">
            <strong>{username}</strong>
            <div>{content}</div>
        </div>
    </div>
    );
};

export default CustomToast;