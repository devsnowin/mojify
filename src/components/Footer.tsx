import Link from "next/link";

const Footer = () => {
  return (
    <div className="grid place-items-center py-8">
      <h1>
        Made by{" "}
        <Link href="https://devsnow.in" target="_blank" className="underline">
          devsnow
        </Link>
      </h1>
    </div>
  );
};
export default Footer;
