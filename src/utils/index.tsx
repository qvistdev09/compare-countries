export function formatValue(value: number | undefined, type: "population" | "area" | "gini") {
  if (typeof value !== "number") {
    return "n/a";
  }
  switch (type) {
    case "population":
      if (value > 1000000) {
        const toMillion = value / 1000000;
        return Math.round(toMillion * 10) / 10 + " mil";
      } else if (value > 10000) {
        const toThousand = value / 1000;
        return Math.round(toThousand * 10) / 10 + " k";
      } else {
        return value;
      }
    case "area":
      return [
        value.toLocaleString() + " km",
        <span key="raised-span" className="raised">
          2
        </span>,
      ];
    case "gini":
      return value + "%";
    default:
      return value;
  }
}
