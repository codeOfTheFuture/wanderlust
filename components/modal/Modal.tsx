import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "../../slices/modalSlice";
import { CloudUploadIcon } from "@heroicons/react/outline";
import Button from "../ui/Button";

const Modal: FC = () => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen),
    dispatch = useDispatch();

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(closeModal(false))}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col justify-center items-center gap-6 w-[600px] h-[500px] p-6">
                  <div className="flex flex-col gap-2 justify-center items-center border border-dashed border-gray-400 rounded-xl w-full h-1/2 text-gray-400 ">
                    <h2 className="text-lg font-semibold">Drag and Drop</h2>
                    <CloudUploadIcon className="w-12 h-12" />
                  </div>
                  <span className="text-lg font-medium">or</span>
                  <Button type="button" size="btn-xl" color="btn-primary">
                    Browse
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
