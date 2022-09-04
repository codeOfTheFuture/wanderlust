import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "../../slices/modalSlice";
import Button from "../ui/Button";
import DropZone from "./DropZone";
import useOnDrop from "../../hooks/useOnDrop";
import Image from "next/image";

const Modal: FC = () => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen),
    dispatch = useDispatch();

  const { uploadedFiles, onDrop } = useOnDrop();

  console.log(uploadedFiles);

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
                <div className="flex flex-col justify-center items-center gap-6 w-[600px] h-[600px] p-6">
                  <DropZone onDrop={onDrop} />
                  <div className="flex justify-evenly items-center gap-2 w-full text-gray-800">
                    <div className="w-full h-[2px] bg-gray-800 mt-2"></div>
                    <div className="text-2xl font-medium text-center">or</div>
                    <div className="w-full h-[2px] bg-gray-800 mt-2"></div>
                  </div>
                  <Button type="button" size="btn-xl" color="btn-primary">
                    Browse
                  </Button>

                  <div className="flex justify-start items-center gap-2 w-full p-2 rounded border border-primary-color">
                    {uploadedFiles.map(uploadedFile => (
                      <div
                        key={uploadedFile.asset_id}
                        className="w-28 h-28 relative rounded shadow-md">
                        <Image
                          src={uploadedFile.secure_url}
                          alt={uploadedFile.original_filename}
                          layout="fill"
                          className="object-cover object-center rounded"
                        />
                      </div>
                    ))}
                  </div>
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
