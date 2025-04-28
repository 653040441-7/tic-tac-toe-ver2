export default function Item({ values, order, n, win }){
  return (
    <li>
      <div className="flex justify-center items-center ">
        <h1>{win}</h1>
        <div
          className="grid gap-1 size-[600px] m-[5px]"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {values.map((value) => ({ value }))}
        </div>
      </div>
      <h2>{order}</h2>
    </li>
  );
};
