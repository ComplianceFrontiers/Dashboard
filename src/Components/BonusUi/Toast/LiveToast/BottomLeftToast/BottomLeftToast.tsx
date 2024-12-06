import { BottomLeftToasts, ImNotSure, ImagePath, RemoveMyAccount, YourAccountWillBePermanentlyDeleted } from '@/Constant';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Toast, ToastBody } from 'reactstrap';

const BottomLeftToast = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
    <>
      <Button color="success" onClick={toggle}>{BottomLeftToasts}</Button>
      <div className="toast-container position-fixed start-0 bottom-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <div className="toast-img toast-header">
            <Image width={40} height={40} className="rounded me-2" src={`${ImagePath}/avatar/9.jpg`} alt="profile" />
            <strong className="me-auto">Edmin theme</strong>
            <Button close onClick={() => setOpen(false)}></Button>
          </div>
          <ToastBody className="toast-dark">
            <h6 className="mb-2">{YourAccountWillBePermanentlyDeleted}</h6>
            <p className="mb-0">Do you intend to continue?</p>
            <div className="mt-2 pt-2 border-top d-flex gap-2">
              <Button color="dark" size="sm">{ImNotSure}</Button>
              <Button color="danger" size="sm" onClick={() => setOpen(false)}>{RemoveMyAccount}</Button>
            </div>
          </ToastBody>
        </Toast>
      </div>
    </>
  )
}

export default BottomLeftToast