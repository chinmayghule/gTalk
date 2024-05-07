function FormErrorMessage({
  message,
  isRoot,
}: {
  message: string;
  isRoot?: boolean;
}) {
  if (isRoot) {
    return (
      <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md font-semibold animate-height-zero-to-full">
        {message}
      </div>
    );
  }

  return (
    <div className="text-sm text-red-500 font-semibold animate-height-zero-to-full">
      {message}
    </div>
  );
}

export default FormErrorMessage;
