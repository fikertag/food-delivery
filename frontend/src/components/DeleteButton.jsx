import { useState } from "react";

const DeleteButton = ({ lable, handleDelete, id }) => {
  const [showComfermition, setShowComfermition] = useState(false);

  if (showComfermition) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center justify-center h-full">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delte?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowComfermition(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => handleDelete(id)}
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all"
      type="button"
      onClick={() => setShowComfermition(true)}
    >
      {lable}
    </button>
  );
};

export default DeleteButton;
