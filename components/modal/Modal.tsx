import React, { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  closeModal,
  openModal,
  selectModalOpen,
} from "../../store/slices/modalSlice";
import Button from "../ui/Button";
import DropZone from "./DropZone";
import PreviewThumbnails from "./PreviewThumbnails";
import { useDropzone } from "react-dropzone";
import { CloudinaryImage } from "../../types/typings";
import { useAppDispatch, useAppSelector } from "../../store";

interface Props {
  uploadedFiles: CloudinaryImage[];
  onDrop: (acceptedFiles: File[]) => void;
  removeImage: (public_id: string, signature: string) => void;
}

const Modal: FC<Props> = ({ uploadedFiles, onDrop, removeImage }) => {
  const modalOpen = useAppSelector(selectModalOpen);
  const dispatch = useAppDispatch();

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

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
              <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-full md:w-auto">
                <div className="flex flex-col justify-start lg:justify-center items-center gap-6 md:w-[450px] lg:w-[600px] h-[500px] md:h-[600px] p-6">
                  <DropZone
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                  />

                  <div className="hidden lg:flex justify-evenly items-center gap-2 w-full text-gray-800">
                    <div className="w-full h-[2px] bg-gray-800 mt-2"></div>
                    <div className="text-2xl font-medium text-center">or</div>
                    <div className="w-full h-[2px] bg-gray-800 mt-2"></div>
                  </div>

                  <Button
                    type="button"
                    size="btn-xl"
                    color="btn-primary"
                    onClick={open}>
                    Browse
                  </Button>

                  <PreviewThumbnails
                    modal={true}
                    uploadedFiles={uploadedFiles}
                    removeImage={removeImage}
                  />
                </div>

                <div className="w-full flex justify-center">
                  <button
                    className="text-primary-color"
                    onClick={() => dispatch(openModal(false))}>
                    Close
                  </button>
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
