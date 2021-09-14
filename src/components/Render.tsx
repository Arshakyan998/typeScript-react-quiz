import React, { ReactElement } from "react";

interface Props<T> {
  items: T[];
  renderItmes: (item: T) => React.ReactChild | React.ReactNode;
}

export default function Render<T>({
  items,
  renderItmes,
}: Props<T>): ReactElement {
  return <div>{items.map(renderItmes)}</div>;
}
