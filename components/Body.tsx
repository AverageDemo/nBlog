export default function Body({ children }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <main>
        <div className="divide-y divide-gray-200">{children}</div>
      </main>
    </div>
  );
}

type Props = {
  children: React.ReactNode;
};
