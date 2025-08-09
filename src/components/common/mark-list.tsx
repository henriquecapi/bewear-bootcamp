import Image from "next/image";

const Mark = () => {
  return (
    <div className="grid grid-cols-4 gap-3 px-5">
      <Image
        src="/logo-nike.png"
        alt="Nike"
        width={0}
        height={0}
        className="h-auto w-full"
        sizes="100vw"
      />
      <Image
        src="/logo-adidas.png"
        alt="Adidas"
        width={0}
        height={0}
        className="h-auto w-full"
        sizes="100vw"
      />
      <Image
        src="/logo-puma.png"
        alt="Puma"
        width={0}
        height={0}
        className="h-auto w-full"
        sizes="100vw"
      />
      <Image
        src="/logo-NB.png"
        alt="New Balco"
        width={0}
        height={0}
        className="h-auto w-full"
        sizes="100vw"
      />
      <p className="text-center text-xs font-medium">Nike</p>
      <p className="text-center text-xs font-medium">Adidas</p>
      <p className="text-center text-xs font-medium">Puma</p>
      <p className="text-center text-xs font-medium">New Balco</p>
    </div>
  );
};
export default Mark;
