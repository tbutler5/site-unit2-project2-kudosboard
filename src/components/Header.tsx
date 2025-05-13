import Image from 'next/image';

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <Image
          src="/image.png"
          alt="Kudoboard Logo"
          width={150}
          height={50}
          priority
        />
      </div>
    </header>
  );
};
