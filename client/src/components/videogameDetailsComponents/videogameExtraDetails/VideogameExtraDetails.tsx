interface VideogamesExtraDetailsProps {
  title: string;
  array: string[];
}

export default function VideogamesExtraDetails({
  title,
  array,
}: VideogamesExtraDetailsProps) {
  return (
    <div>
      <p>
        <h5>{title}</h5>
      </p>
    </div>
  );
}
