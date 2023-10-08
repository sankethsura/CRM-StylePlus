// createToast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createToast = (message, type) => {
  switch (type) {
    case 'success':
      toast.success(
        <div className="Toastify__toast--success">
          <div className="toast-bar bg-green-600"></div> {/* Green bar for success */}
          {message}
        </div>,
        {
          closeButton: false,
          className: 'Toastify__toast--success',
        }
      );
      break;
    case 'error':
      toast.error(
        <div className="Toastify__toast--error">
          <div className="toast-bar bg-red-600"></div> {/* Red bar for error */}
          {message}
        </div>,
        {
          closeButton: false,
          className: 'Toastify__toast--error',
        }
      );
      break;

      case 'warning':
        toast.warning(
          <div className="Toastify__toast--warning">
            <div className="toast-bar bg-[#FF8964]"></div>
            {message}
          </div>,
          {
            closeButton: false,
            className: 'Toastify__toast--warning',
          }
        );
        break;
    default:
      toast(message, {
        closeButton: false,
        className: 'custom-toast',
      });
  }
};

export default createToast;
