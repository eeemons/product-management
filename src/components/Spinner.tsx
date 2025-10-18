interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner = ({ size = 'medium' }: SpinnerProps) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-16 w-16 border-t-2 border-b-2',
    large: 'h-32 w-32 border-t-4 border-b-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-lion-brown ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default Spinner;