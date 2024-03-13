export default function VideogamesDetailsItems({
  title,
  array,
}: {
  title?: string;
  array: string[];
}) {
  return (
    <div className="flex flex-col justify-start items-start gap-2 my-2">
      {title && <h6 className="text-neutral-700">{title}</h6>}
      <ul className="flex justify-start flex-wrap items-start gap-1">
        {array.map((item) => (
          <li
            key={item}
            className="border-[1px] border-neutral-900 rounded-full px-2"
          >
            {item}
          </li>
        ))}
        {array.length === 0 && (
          <li className="border-[1px] border-neutral-900 rounded-full px-2">
            -
          </li>
        )}
      </ul>
    </div>
  );
}
