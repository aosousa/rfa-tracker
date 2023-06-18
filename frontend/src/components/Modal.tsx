export const Modal = (props: any) => {
  return (
    <div className="flex flex-col fixed top-0 left-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-80 p-4 z-50 items-center">
      <div className="flex flex-col w-full bg-white rounded-lg overflow-auto md:w-6/12 2xl:w-4/12">
        <div className="flex flex-row border-b p-4">
          <div className="flex flex-col font-semibold text-lg">
            {props.title}
          </div>
          <button
            type="button"
            className="hover:bg-gray-100 focus:bg-gray-100 disabled:text-gray-300 rounded-md p-1 ml-auto"
            onClick={() => props.closeModal()}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center bg-white rounded-md p-4">
          {props.children}
        </div>
      </div>
    </div>
  );
};
