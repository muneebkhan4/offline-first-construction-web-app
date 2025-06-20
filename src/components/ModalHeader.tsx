// components/ModalHeader.tsx

type ModalHeaderProps = {
  title: string;
  onClose: () => void;
};

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <button
        onClick={onClose}
        className="bg-transparent hover:bg-gray-100 hover:text-red-700 text-red-400 border-none focus:outline-none ring-0 focus:ring-0 cursor-pointer"
      >
        ✖
      </button>
    </div>
  );
}
