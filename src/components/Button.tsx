import Link from "next/link";

interface Props {
  onClick?: () => void;
  text: string;
  url: string;
  small?: boolean;
}

export default function Button({ onClick, text, url, small }: Props) {
  return (
    <>
      <Link
        href={url}
        onClick={onClick}
        className={`bg-green-950 px-4 py-1 text-red-100 border-2 border-red-100 border-opacity-90 rounded-xl ease-in duration-200 hover:bg-teal-900 ${
          small ? "text-base" : "text-xl"
        }`}
      >
        {text}
      </Link>
    </>
  );
}
